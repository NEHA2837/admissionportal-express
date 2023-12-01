const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()

//route path
route.get('/',FrontController.login)


module.exports = route
