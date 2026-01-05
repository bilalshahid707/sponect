const express = require("express")
const Router = express.Router()
const {addSocial,deleteSocial} = require('../controllers/social/social.controllers')
const {protect,restrictTo} = require("../middlewares/auth.middlewares")

Router.use(protect,restrictTo(['sponsee','sponsor']))
Router.post("/",addSocial)
Router.delete("/:socialId",deleteSocial)
module.exports = Router