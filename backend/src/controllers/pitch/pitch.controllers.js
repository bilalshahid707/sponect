const Pitch = require("../../models/pitch.model");
const Package = require("../../models/package.model");
const catchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");
const { Op } = require("sequelize");
const {
  AllowedPitchFields,
  pitchFilterFields,
} = require("../../utils/Constants");
const {
  uploadDocument,
  deleteResource,
  uploadImage,
} = require("../../utils/Cloudinary");

const validatePitchOwnership = async (pitchId, sponseeId) => {
  if (isNaN(pitchId)) {
    throw new AppError("Invalid id", 400);
  }
  const pitch = await Pitch.findOne({ where: { id: pitchId } });

  if (!pitch) {
    throw new AppError("Pitch not found", 404);
  }

  if (pitch.sponseeId !== sponseeId) {
    throw new AppError("Pitch can only be edited by the pitch owner", 403);
  }

  return pitch;
};

exports.createPitch = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const { title } = req.body;

  const pitch = await Pitch.create({ sponseeId: sponseeId, title: title });

  res.status(201).json({
    status: "success",
    data: pitch,
  });
});

exports.getPitch = catchAsync(async (req, res, next) => {
  const { id: pitchId } = req.params;

  if (isNaN(pitchId)) {
    return next(new AppError("Invalid id", 400));
  }

  const pitch = await Pitch.findByPk(pitchId, {
    include: [
      {
        model: Package,
        attributes: ["id", "title", "price", "description", "deliverables"],
        as: "packages",
      },
    ],
  });

  if (!pitch) {
    return next(new AppError("Pitch not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: pitch,
  });
});

exports.getAllPitches = catchAsync(async (req, res, next) => {
  const { query } = req;

  if (query.page < 1 || isNaN(query.page)) {
    return next(new AppError("Invalid page number", 400));
  }

  const queryObject = {};
  Object.keys(query).forEach((key) => {
    if (pitchFilterFields.has(key)) {
      if (key === "expectedAudience") {
        queryObject[key] = { [Op.lte]: Number(query[key]) };
      } else if (
        key === "venue" ||
        key === "category" ||
        key === "preferences"
      ) {
        const values = query[key].split(",");
        queryObject[key] = { [Op.in]: values };
      } else if (key === "occupation") {
        const values = query[key].split(",");
        queryObject[key] = { [Op.contains]: values };
      } else {
        queryObject[key] = query[key];
      }
    }
  });

  const pitches = await Pitch.findAll({
    order: [["createdAt", "DESC"]],
    offset: (query.page ? query.page - 1 : 0) * 12,
    limit: 12,
    where: queryObject,
  });

  res.status(200).json({
    status: "success",
    results: pitches.length,
    data: pitches,
  });
});

exports.updatePitch = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const pitch = await validatePitchOwnership(req.params.pitchId, sponseeId);

  const allowedFields = AllowedPitchFields;
  const keys = Object.keys(req.body).filter((key) => allowedFields.has(key));

  const filteredBody = {};
  keys.forEach((key) => {
    filteredBody[key] = req.body[key];
  });

  await pitch.update(filteredBody);

  res.status(200).json({
    status: "success",
    data: pitch,
  });
});

exports.deletePitch = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const pitch = await validatePitchOwnership(req.params.pitchId, sponseeId);

  await pitch.destroy();

  res.status(200).json({
    status: "success",
  });
});

exports.updateCover = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const pitch = await validatePitchOwnership(req.params.pitchId, sponseeId);

  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }
  if (pitch.coverPhoto?.publicId) {
    await deleteResource(pitch.coverPhoto.publicId);
  }
  const { buffer } = req.file;
  const image = await uploadImage(buffer, "pitches");
  await pitch.update({
    coverPhoto: {
      url: image.secureUrl,
      publicId: image.publicID,
    },
  });
  res.status(200).json({
    status: "success",
    data: pitch,
  });
});

exports.updateProposal = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const pitch = await validatePitchOwnership(req.params.pitchId, sponseeId);

  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }

  if (pitch.proposalDoc?.publicId) {
    await deleteResource(pitch.proposalDoc.publicId);
  }

  const { buffer } = req.file;
  const document = await uploadDocument(buffer, "pitches");
  await pitch.update({
    proposalDoc: {
      url: document.secureUrl,
      publicId: document.publicID,
    },
  });
  res.status(200).json({
    status: "success",
    data: pitch,
  });
});

exports.updateMedia = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const pitch = await validatePitchOwnership(req.params.pitchId, sponseeId);

  if (!req.files) {
    return next(new AppError("No file uploaded", 400));
  }

  const mediaArray = await Promise.all(
    req.files.map(async (file) => {
      const image = await uploadImage(file.buffer, "pitches");
      return image.secureUrl;
    })
  );

  await pitch.update({
    media: mediaArray,
  });

  res.status(200).json({
    status: "success",
    data: pitch,
  });
});

exports.addPackage = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const { pitchId } = req.params;
  await validatePitchOwnership(pitchId, sponseeId);

  const { title, price, description, deliverables } = req.body;

  const countPackages = await Package.count({ where: { pitchId: pitchId } });

  if (countPackages >= 3) {
    return next(new AppError("Only 3 packages are allowed", 400));
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

exports.updatePackage = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const { pitchId, packageId } = req.params;
  await validatePitchOwnership(pitchId, sponseeId);

  if (Number.isNaN(packageId)) {
    return next(new AppError("Invalid package id", 400));
  }

  const packageData = await Package.findByPk(packageId);
  if (!packageData) {
    return next(new AppError("Package not found with this id", 404));
  }

  if (packageData.pitchId !== pitchId) {
    return next(new AppError("Only pitch owner can edit packages", 403));
  }

  const allowedFields = new Set([
    "title",
    "price",
    "description",
    "deliverables",
  ]);
  const keys = Object.keys(req.body).filter((key) => allowedFields.has(key));

  const filteredBody = {};
  keys.forEach((key) => {
    filteredBody[key] = req.body[key];
  });

  await packageData.update(filteredBody);

  res.status(200).json({
    status: "success",
    data: packageData,
  });
});

exports.deletePackage = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const { pitchId, packageId } = req.params;
  await validatePitchOwnership(pitchId, sponseeId);

  if (Number.isNaN(packageId)) {
    return next(new AppError("Invalid package id", 400));
  }

  const packageData = await Package.findByPk(packageId);
  if (!packageData) {
    return next(new AppError("Package not found with this id", 404));
  }

  if (packageData.pitchId !== pitchId) {
    return next(new AppError("Only pitch owner can edit packages", 403));
  }

  await packageData.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
