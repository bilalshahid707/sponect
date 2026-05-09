const User = require("../models/user.model");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

const jwt = require("jsonwebtoken");
const Sponsor = require("../models/sponsor.model");
const Sponsee = require('../models/sponsee.model')

exports.protect = catchAsync(async (req, res, next) => {
  // Accessing token
  let token;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  // Verifying and decoding token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let currentUser = null;
  if (decoded) {
    currentUser = await User.findOne({ where: { id: decoded.userId } });
    if (!currentUser) {
      return next(new AppError("User does not exist", 404));
    }

    if (
      currentUser.passwordChangedAt &&
      currentUser.passwordChangedAt / 1000 > decoded.iat
    ) {
      return next(new AppError("Password Changed", 401));
    }
  }

  if (!currentUser) {
    return next(new AppError("User not authenticated"));
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (allowedRoles) => catchAsync(async (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return next(new AppError(`You don't have access to this feature`, 403));
  }
  next();
});

exports.requireSponsor = catchAsync(async (req, res, next) => {
  const sponsor = await Sponsor.findOne({ where: { userId: req.user.id } });
  if (!sponsor) {
    return next(new AppError("Sponsor account not found", 404));
  }
  req.sponsor = sponsor;
  next();
});

exports.requireSponsee = catchAsync(async (req, res, next) => {
  const sponsee = await Sponsee.findOne({ where: { userId: req.user.id } });
  if (!sponsee) {
    return next(new AppError("Sponsee account not found", 404));
  }
  req.sponsee = sponsee;
  next();
});

