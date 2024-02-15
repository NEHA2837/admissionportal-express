const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkuserAuth = require("../middleware/auth")
const CourseController = require('../controllers/coursecontroller')
const AdminController = require('../controllers/AdminController')

//route path
route.get('/', FrontController.login) //by default chale ga
route.get('/register', FrontController.register)
route.get('/about', checkuserAuth, FrontController.about)
route.get('/dashboard', checkuserAuth, FrontController.dashboard)
route.get('/contact', checkuserAuth, FrontController.contact)
route.get('/team', FrontController.team)
route.get('/course', FrontController.course)

//datainser
route.post('/insertreg', FrontController.insertReg);
route.post("/vlogin", FrontController.vlogin);
route.get('/logout', FrontController.logout)
route.get('/profile', checkuserAuth, FrontController.profile)
route.post('/updateprofile', checkuserAuth, FrontController.updateprofile)
route.post('/changePassword', checkuserAuth, FrontController.changePassword)


//coursecontroller
route.post("/course_insert", checkuserAuth, CourseController.CourseInsert)
route.get('/course_display', checkuserAuth, CourseController.courseDisplay);
route.get('/course_view/:id', checkuserAuth, CourseController.courseView);
route.get('/course_edit/:id', checkuserAuth, CourseController.courseEdit);
route.get('/course_delete/:id', checkuserAuth, CourseController.courseDelete);
route.post('/course_update/:id', checkuserAuth, CourseController.courseUpdate);


//admincontroller
route.get("/admin/dashboard", checkuserAuth, AdminController.dashboard);
route.post("/admin/update_status/:id", checkuserAuth, AdminController.update_status);











module.exports = route
