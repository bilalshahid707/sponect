const express = require("express");
const Router = express.Router();
const {
  getMySponsorProfile,
  updateMySponsorProfile,
  getSponsor,
  getAllSponsors,
  updateLogo,
  updateCover,
  addSponsorship,
  getSponsorship,
  deleteSponsorship,
  addSocial,
  deleteSocial,
} = require("../controllers/sponsor/sponsor.controllers");
const {
  protect,
  restrictTo,
  requireSponsor,
} = require("../middlewares/auth.middlewares");
const multer = require("../config/multer");

// Self Routes
Router.get(
  "/me",
  protect,
  restrictTo("sponsor"),
  requireSponsor,
  getMySponsorProfile
);
Router.patch(
  "/me",
  protect,
  restrictTo("sponsor"),
  requireSponsor,
  updateMySponsorProfile
);
Router.patch(
  "/me/logo",
  protect,
  restrictTo("sponsor"),
  requireSponsor,
  multer.single("logo"),
  updateLogo
);
Router.patch(
  "/me/cover",
  protect,
  restrictTo("sponsor"),
  requireSponsor,
  multer.single("cover"),
  updateCover
);

// Adding sponsorships
Router.post(
  "/me/sponsorships",
  protect,
  restrictTo("sponsor"),
  requireSponsor,
  multer.single("thumbnail"),
  addSponsorship
);
Router.delete(
  "/me/sponsorships",
  protect,
  restrictTo("sponsor"),
  requireSponsor,
  deleteSponsorship
);

// Public Routes
Router.get("/", getAllSponsors);
Router.get("/:sponsorId", getSponsor);
Router.get("/:sponsorId/sponsorships/:sponsorshipId", getSponsorship);

module.exports = Router;
