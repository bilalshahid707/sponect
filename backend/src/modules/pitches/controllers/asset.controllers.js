const catchAsync = require("../../../utils/CatchAsync");
const AppError = require("../../../utils/AppError");
const AssetService = require("../services/asset.service");

exports.uploadAsset = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }

  const { pitchId } = req.params;
  const asset = await AssetService.uploadAsset(pitchId, req.file, req.body, req.pitch);
  res.status(201).json({ status: "success", data: asset });
});

exports.deleteAsset = catchAsync(async (req, res) => {
  const { pitchId, assetId } = req.params;
  await AssetService.deleteAsset(pitchId, assetId);
  res.status(204).json({ status: "success", data: null });
});
