const Sponsee = require("../../models/sponsee.model");
const Social = require("../../models/social.model");
const Contact = require("../../models/contact.model");
const catchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");
const { uploadImage, deleteImage } = require("../../utils/Cloudinary");
const { AllowedSponseeFields } = require("../../utils/Constants");

exports.getSponsee = catchAsync(async (req, res, next) => {
  const id = Number(req.params.sponseeId);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid sponsee id", 400));
  }

  const sponsee = await Sponsee.findByPk(id, {
    include: [
      {
        model: Social,
        as: "socials",
        attributes: ["id", "name", "URL", "followerCount"],
      },
      {
        model: Contact,
        as: "contacts",
        attributes: ["id", "name", "email", "phone"],
      },
    ],
  });
  if (!sponsee) {
    return next(new AppError("no sponsee found with this sponsee id", 404));
  }
  res.status(200).json({
    status: "success",
    data: sponsee,
  });
});

// Self
exports.getMySponseeProfile = catchAsync(async (req, res, next) => {
  const { id } = req.sponsee;
  const sponsee = await Sponsee.findByPk(id, {
    include: [
      {
        model: Social,
        as: "socials",
        attributes: ["id", "name", "URL", "followerCount"],
      },
      {
        model: Contact,
        as: "contacts",
        attributes: ["id", "name", "email", "phone"],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: sponsee,
  });
});

exports.updateMySponseeProfile = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const sponsee = await Sponsee.findByPk(sponseeId);

  const allowedFields = AllowedSponseeFields;
  const keys = Object.keys(req.body).filter((key) => allowedFields.has(key));

  const filteredBody = {};
  keys.forEach((key) => {
    filteredBody[key] = req.body[key];
  });

  await sponsee.update(filteredBody);

  res.status(200).json({
    status: "success",
    data: sponsee,
  });
});

exports.updateLogo = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const sponsee = await Sponsee.findByPk(sponseeId);
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }
  const { buffer } = req.file;

  if (sponsee.logo?.publicId) {
    await deleteImage(sponsee.logo.publicId);
  }

  const image = await uploadImage(buffer, "sponsees");

  await sponsee.update({
    logo: {
      url: image.secureUrl,
      publicId: image.publicID,
    },
  });

  res.status(200).json({
    status: "success",
    data: sponsee,
  });
});

exports.updateCover = catchAsync(async (req, res, next) => {
  const { id: sponseeId } = req.sponsee;
  const sponsee = await Sponsee.findByPk(sponseeId);
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }
  const { buffer } = req.file;

  if (sponsee.cover?.publicId) {
    await deleteImage(sponsee.cover.publicId);
  }

  const image = await uploadImage(buffer, "sponsees");

  await sponsee.update({
    cover: {
      url: image.secureUrl,
      publicId: image.publicID,
    },
  });

  res.status(200).json({
    status: "success",
    data: sponsee,
  });
});
