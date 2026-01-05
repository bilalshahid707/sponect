const express = require("express")
const Router = express.Router()
const {addContact,deleteContact} = require('../controllers/contact/contact.controllers')
const {protect,restrictTo} = require("../middlewares/auth.middlewares")

Router.use(protect,restrictTo(['sponsee','sponsor']))
Router.post("/",addContact)
Router.delete("/:contactId",deleteContact)
module.exports = Router