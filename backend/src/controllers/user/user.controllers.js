const User = require("../../models/user.model");
const Sponsee = require("../../models/sponsee.model");
const Sponsor = require("../../models/sponsor.model");
const catchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");
const { uploadImage, deleteImage } = require("../../utils/Cloudinary");

exports.getMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findByPk(id, {
    include: [
      { model: Sponsee },
      { model: Sponsor, as: "postedBy" },
    ],
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const allowedFields = new Set(["email", "fullName", "phone", "designation"]);
  const keys = Object.keys(req.body).filter((key) => allowedFields.has(key));
  const filteredBody = {};
  keys.forEach((key) => {
    filteredBody[key] = req.body[key];
  });

  const user = await User.findOne({ where: { id: id } });
  if (!user) {
    return next(new AppError("No user with this id exists", 404));
  }
  await user.update(filteredBody);

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateAvatar = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }

  const user = await User.findByPk(id);

  if (user.avatar?.publicId) {
    await deleteImage(user.avatar.publicId);
  }

  const { buffer } = req.file;
  const image = await uploadImage(buffer, "avatars");

  await user.update({
    avatar: {
      url: image.secureUrl,
      publicId: image.publicID,
    },
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

