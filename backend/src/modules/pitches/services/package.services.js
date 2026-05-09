const Package = require("../models/package.model");
const AppError = require("../../../utils/AppError");

exports.addPackage = async (pitchId, data, pitch) => {
  const countPackages = await Package.count({ where: { pitchId } });

  if (countPackages >= 3) {
    throw new AppError("Only 3 packages are allowed", 400);
  }

  const { title, price, description, deliverables } = data;

  const packageData = await Package.create({ pitchId, title, price, description, deliverables });

  // Advance pitch tabNumber to 4 only when the first package is added.
  if (countPackages === 0) {
    await pitch.update({
      tabNumber: String(Math.max(Number(pitch.tabNumber), 3)),
    });
  }

  return packageData;
};

exports.updatePackage = async (pitchId, packageId, data) => {
  const packageData = await Package.findByPk(packageId);
  if (!packageData) throw new AppError("Package not found", 404);
  if (Number(packageData.pitchId) !== Number(pitchId)) {
    throw new AppError("Only pitch owner can edit packages", 403);
  }

  const allowed = new Set(["title", "price", "description", "deliverables"]);
  const filtered = {};
  for (const key of Object.keys(data)) {
    if (allowed.has(key)) filtered[key] = data[key];
  }

  await packageData.update(filtered);
  return packageData;
};

exports.deletePackage = async (pitchId, packageId) => {
  const packageData = await Package.findByPk(packageId);
  if (!packageData) throw new AppError("Package not found", 404);
  if (Number(packageData.pitchId) !== Number(pitchId)) {
    throw new AppError("Only pitch owner can edit packages", 403);
  }

  const countPackages = await Package.count({ where: { pitchId } });
  if (countPackages === 1) {
    throw new AppError("One package is mandatory", 400);
  }

  await packageData.destroy();
};
