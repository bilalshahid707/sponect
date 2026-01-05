const express = require("express");
const Router = express.Router();
const {createPitch,updatePitch,updateCover,updateProposal,updateMedia,addPackage, updatePackage, deletePackage, getPitch, getAllPitches} = require('../controllers/pitch/pitch.controllers')
const {protect,restrictTo,requireSponsee} = require('../middlewares/auth.middlewares');
const multer = require("../config/multer")

Router.get("/",getAllPitches)
Router.get("/:pitchId",getPitch)

Router.use(protect,restrictTo(['sponsee']),requireSponsee)
Router.post("/",createPitch)
Router.patch("/:pitchId",updatePitch)
Router.patch("/:pitchId/cover",multer.single("cover"),updateCover)
Router.patch("/:pitchId/proposal",multer.single("proposal"),updateProposal)
Router.patch("/:pitchId/media",multer.array("media",5),updateMedia)
Router.post("/:pitchId/packages",addPackage)
Router.patch("/:pitchId/packages/:packageId",updatePackage)
Router.delete("/:pitchId/packages/:packageId",deletePackage)

module.exports=Router