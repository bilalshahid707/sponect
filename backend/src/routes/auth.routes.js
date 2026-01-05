const express = require("express")
const Router = express.Router()
const {signin,signout,signup} = require('../controllers/auth/auth.controllers')

Router.post("/signup",signup)
Router.post("/signin",signin)
Router.post("/signout",signout)
module.exports = Router