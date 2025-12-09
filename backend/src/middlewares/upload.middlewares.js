const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const cloudinary = require("../config/cloudinary");
const CloudinaryUtil = require("../utils/Cloudinary");
const Sponsor = require("../models/sponsor.model");

exports.uploadProfileImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const { buffer } = req.file;

  if (req.user.profileImage) {
    try {
      const publicID = req.user.profileImage.publicID;
      if (publicID) {
        await cloudinary.uploader.destroy(publicID);
        console.log("Image deleted successfully");
      }
    } catch (err) {
      return next(new AppError(err.message, err.http_code));
    }
  }

  const image = await CloudinaryUtil.uploadImage(buffer, "users");
  console.log(image);
  if (image) {
    req.image = image;
  }

  next();
});

exports.uploadLogo = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const { buffer } = req.file;

  // Deleting previous logo
  const { id, accountType } = req.user;
  let organization;
  if (accountType === "sponsor") {
    organization = await Sponsor.findOne({ where: { userId: id } });
  }

  if (!organization) {
    return next(
      new AppError(`No ${accountType} registered with this user`, 404)
    );
  }

  if (organization.logo) {
    try {
      const publicID = organization.logo.publicID;
      if (publicID) {
        await cloudinary.uploader.destroy(publicID);
        console.log("Logo deleted successfully");
      }
    } catch (err) {
      return next(new AppError(err.message, err.http_code));
    }
  }

  const image = await CloudinaryUtil.uploadImage(buffer, "organizations");

  if (image) {
    req.image = image;
  }

  next();
});
