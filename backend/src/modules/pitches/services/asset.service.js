const Asset = require("../models/asset.model");
const AppError = require("../../../utils/AppError");
const { uploadImage, uploadDocument, deleteResource } = require("../../../utils/Cloudinary");

const ASSET_LIMITS = { cover: 1, general: 3, document: 1 };
const VALID_TYPES = new Set(["cover", "general", "document"]);

exports.uploadAsset = async (pitchId, file, data, pitch) => {
  const { type } = data;

  if (!VALID_TYPES.has(type)) {
    throw new AppError("Invalid asset type. Must be cover, general, or document", 400);
  }

  const count = await Asset.count({ where: { pitchId, type } });
  if (count >= ASSET_LIMITS[type]) {
    throw new AppError(
      `Limit reached: only ${ASSET_LIMITS[type]} ${type} asset(s) allowed per pitch`,
      400,
    );
  }

  const uploaded =
    type === "document"
      ? await uploadDocument(file.buffer, "pitches")
      : await uploadImage(file.buffer, "pitches");

  const asset = await Asset.create({
    type,
    pitchId,
    publicId: uploaded.publicID,
    secureUrl: uploaded.secureUrl,
  });

  // Advance pitch tabNumber to 4 (media) on first asset of any type.
  const totalAssets = await Asset.count({ where: { pitchId } });
  if (totalAssets === 1) {
    await pitch.update({
      tabNumber: String(Math.max(Number(pitch.tabNumber), 4)),
    });
  }

  return asset;
};

exports.deleteAsset = async (pitchId, assetId) => {
  const asset = await Asset.findByPk(assetId);
  if (!asset) throw new AppError("Asset not found", 404);
  if (Number(asset.pitchId) !== Number(pitchId)) {
    throw new AppError("Only pitch owner can delete assets", 403);
  }

  // Cover and document can always be deleted (limit of 1, so deletion is fine).
  // General images must keep at least 1 if any general images exist — adjust if needed.
  await deleteResource(asset.publicId);
  await asset.destroy();
};
