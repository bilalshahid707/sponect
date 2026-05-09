const express = require("express");
const Router = express.Router();
const { createPitch, updatePitch, publishPitch, deletePitch, getPitchById, getAllPitches,getPitchesBySponseeId } = require("../controllers/pitch.controllers");
const { addPackage, updatePackage, deletePackage } = require("../controllers/package.controllers");
const { uploadAsset, deleteAsset } = require("../controllers/asset.controllers");
const { protect, restrictTo, requireSponsee } = require("../../../middlewares/auth.middlewares");
const { authorizeUserToModify, validateTab, checkTabSequence } = require("../middlewares/pitch.middlewares");
const multer = require("../../../config/multer");

Router.get("/", getAllPitches);
Router.get("/my-pitches", protect, restrictTo(["sponsee"]), requireSponsee, getPitchesBySponseeId);
Router.get("/:pitchId", getPitchById);

Router.use(protect, restrictTo(["sponsee"]), requireSponsee);
// Tab 0: create — no pitchId yet, so no authorizeUserToModify or checkTabSequence
Router.post("/create", validateTab([0]), createPitch);

// Tabs 0–2: pitch model fields
Router.patch("/:pitchId/edit", authorizeUserToModify, validateTab([0, 1, 2]), checkTabSequence, updatePitch);

// Publish — no tab param needed
Router.patch("/:pitchId/publish", authorizeUserToModify, publishPitch);
Router.delete("/:pitchId", authorizeUserToModify, deletePitch);

// Tab 3: packages
Router.post("/:pitchId/packages", authorizeUserToModify, validateTab([3]), checkTabSequence, addPackage);
Router.patch("/:pitchId/packages/:packageId", authorizeUserToModify, validateTab([3]), checkTabSequence, updatePackage);
Router.delete("/:pitchId/packages/:packageId", authorizeUserToModify, validateTab([3]), checkTabSequence, deletePackage);

// Tab 4: media
Router.post("/:pitchId/assets", authorizeUserToModify, validateTab([4]), checkTabSequence, multer.single("asset"), uploadAsset);
Router.delete("/:pitchId/assets/:assetId", authorizeUserToModify, validateTab([4]), checkTabSequence, deleteAsset);

module.exports = Router;
