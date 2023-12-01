const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()

//route path
route.get('/',FrontController.login) //by default chale ga
route.get('/register',FrontController.register)
route.get('/about',FrontController.about)
route.get('/dashboard',FrontController.dashboard)
route.get('/team',FrontController.team)
route.get('/course',FrontController.course)
















module.exports = route
