const express = require("express");
const Router = express.Router();
const {
  getMySponseeProfile,
  getSponsee,
  updateCover,
  updateLogo,
  updateMySponseeProfile,
  addSocial,
  deleteSocial,
} = require("../controllers/sponsee/sponsee.controllers");
const {
  protect,
  restrictTo,
  requireSponsee,
} = require("../middlewares/auth.middlewares");
const multer = require("../config/multer");

// Self Routes
Router.get(
  "/me",
  protect,
  restrictTo("sponsee"),
  requireSponsee,
  getMySponseeProfile
);
Router.patch(
  "/me",
  protect,
  restrictTo("sponsee"),
  requireSponsee,
  updateMySponseeProfile
);
Router.patch(
  "/me/logo",
  protect,
  restrictTo("sponsee"),
  requireSponsee,
  multer.single("logo"),
  updateLogo
);
Router.patch(
  "/me/cover",
  protect,
  restrictTo("sponsee"),
  requireSponsee,
  multer.single("cover"),
  updateCover
);

// Public Routes
Router.get("/:sponseeId", getSponsee);


module.exports = Router;
