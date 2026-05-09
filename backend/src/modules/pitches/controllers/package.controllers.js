const catchAsync = require("../../../utils/CatchAsync");
const AppError = require("../../../utils/AppError");
const PackageService = require("../services/package.services");

exports.addPackage = catchAsync(async (req, res) => {
  const { pitchId } = req.params;
  const packageData = await PackageService.addPackage(pitchId, req.body, req.pitch);
  res.status(201).json({ status: "success", data: packageData });
});

exports.updatePackage = catchAsync(async (req, res, next) => {
  const { pitchId, packageId } = req.params;

  if (Number.isNaN(Number(packageId))) {
    return next(new AppError("Invalid package id", 400));
  }

  const packageData = await PackageService.updatePackage(pitchId, packageId, req.body);
  res.status(200).json({ status: "success", data: packageData });
});

exports.deletePackage = catchAsync(async (req, res, next) => {
  const { pitchId, packageId } = req.params;

  if (Number.isNaN(Number(packageId))) {
    return next(new AppError("Invalid package id", 400));
  }

  await PackageService.deletePackage(pitchId, packageId);
  res.status(204).json({ status: "success", data: null });
});
