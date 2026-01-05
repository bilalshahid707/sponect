const express = require("express");
const Router = express.Router();
const { getMe,updateMe,updateAvatar } = require("../controllers/user/user.controllers");
const { protect } = require("../middlewares/auth.middlewares");
const multer = require("../config/multer");

Router.use(protect)
Router.get("/me", getMe);

Router.patch(
  "/me",
  updateMe
);
Router.patch('/me/avatar',multer.single("avatar"),updateAvatar)
module.exports = Router;
