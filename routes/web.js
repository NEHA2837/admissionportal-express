const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkuserAuth = require("../middleware/auth")
const CourseController = require('../controllers/coursecontroller')

//route path
route.get('/',FrontController.login) //by default chale ga
route.get('/register',FrontController.register)
route.get('/about',checkuserAuth,FrontController.about)
route.get('/dashboard',checkuserAuth ,FrontController.dashboard)
route.get('/contact',checkuserAuth ,FrontController.contact)
route.get('/team',FrontController.team)
route.get('/course',FrontController.course)

//datainser
route.post('/insertreg',FrontController.insertReg);
route.post("/vlogin",FrontController.vlogin);
route.get('/logout',FrontController.logout)

//coursecontroller
route.post("/course_insert",checkuserAuth,CourseController.CourseInsert)
route.get('/course_display',checkuserAuth,CourseController.courseDisplay);







module.exports = route
