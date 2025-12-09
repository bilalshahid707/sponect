const express = require("express")
const Router = express.Router()
const controllers = require('../controllers/sponsor/sponsor.controllers')
const auth = require('../middlewares/auth.middlewares')
const uploadMiddleware = require('../middlewares/upload.middlewares');
const multerUpload = require("../config/multer");

Router.get("/me",auth.protect,controllers.getSponsor)
Router.patch("/me",auth.protect,multerUpload.single("profileImage"),uploadMiddleware.uploadLogo,controllers.updateSponsor)

module.exports = Router