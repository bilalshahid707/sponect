const express = require("express")
const Router = express.Router()
const controller = require("../controllers/user/user.controllers")
const auth = require('../middlewares/auth.middlewares')
const uploadMiddleware = require('../middlewares/upload.middlewares');
const multerUpload = require("../config/multer");

Router.get("/me",auth.protect,controller.getUser)
Router.patch("/me",auth.protect,multerUpload.single("profileImage"),uploadMiddleware.uploadProfileImage,controller.updateUser)

module.exports = Router