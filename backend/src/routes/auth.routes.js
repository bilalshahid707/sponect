const express = require("express")
const Router = express.Router()
const controllers = require('../controllers/auth/auth.controllers')
const auth = require('../middlewares/auth.middlewares')

Router.post("/signup",controllers.signup)
Router.post("/signin",controllers.signin)
Router.post("/signout",controllers.signout)

module.exports = Router