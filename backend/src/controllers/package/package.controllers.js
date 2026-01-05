const Package = require("../../models/package.model");
const Pitch = require("../../models/pitch.model");
const catchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");

exports.createPackage = catchAsync(async (req, res, next) => {
  const { pitchId, title, price, description, deliverables } = req.body;

  if (!pitchId || !title || !price) {
    return next(
      new AppError("pitchId, title, and price are required", 400)
    );
  }

  const pitch = await Pitch.findByPk(pitchId);
  if (!pitch) {
    return next(new AppError("Pitch not found with this id", 404));
  }

  const packageData = await Package.create({
    pitchId,
    title,
    price,
    description,
    deliverables,
  });

  res.status(201).json({
    status: "success",
    data: packageData,
  });
});

exports.getPackagesByPitch = catchAsync(async (req, res, next) => {
  const pitchId = Number(req.params.pitchId);

  if (Number.isNaN(pitchId)) {
    return next(new AppError("Invalid pitch id", 400));
  }

  const pitch = await Pitch.findByPk(pitchId);
  if (!pitch) {
    return next(new AppError("Pitch not found with this id", 404));
  }

  const packages = await Package.findAll({
    where: { pitchId },
  });

  res.status(200).json({
    status: "success",
    data: packages,
  });
});

exports.getPackageById = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid package id", 400));
  }

  const packageData = await Package.findByPk(id, {
    include: {
      model: Pitch,
      attributes: ["id", "title", "sponseeId"],
    },
  });

  if (!packageData) {
    return next(new AppError("Package not found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: packageData,
  });
});

exports.updatePackage = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid package id", 400));
  }

  const packageData = await Package.findByPk(id);
  if (!packageData) {
    return next(new AppError("Package not found with this id", 404));
  }

  const { title, price, description, deliverables } = req.body;

  await packageData.update({
    title: title || packageData.title,
    price: price || packageData.price,
    description: description || packageData.description,
    deliverables: deliverables || packageData.deliverables,
  });

  res.status(200).json({
    status: "success",
    data: packageData,
  });
});

exports.deletePackage = catchAsync(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid package id", 400));
  }

  const packageData = await Package.findByPk(id);
  if (!packageData) {
    return next(new AppError("Package not found with this id", 404));
  }

  await packageData.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
