const usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary").v2
const CourseModel = require("../models/course")


cloudinary.config({
  cloud_name: 'dpqevfjgb',
  api_key: '129627847619268',
  api_secret: 'Yomyl1Ym2ZOe30Zo53dkvdj8XGw',
});

class FrontController {

  static login = async (req, res) => {
    try {
      res.render("login", { msg: req.flash('success'), error: req.flash('error') });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.userdata
      //cosole.log(name)
      res.render("about", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, image } = req.userdata
      //cosole.log(name)
      res.redirect("contact", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = async (req, res) => {
    try {
      const { name, image, email, id } = req.userdata
      const btech = await CourseModel.findOne({ user_id: id, course: "btech" })
      console.log(btech)
      //cosole.log(name)
      res.render("dashboard", { n: name, i: image, e: email, b: btech });
    } catch (error) {
      console.log(error);
    }
  };

  static team = async (req, res) => {
    try {
      res.render("team");
    } catch (error) {
      console.log(error);
    }
  };

  static course = async (req, res) => {
    try {
      res.render("course");
    } catch (error) {
      console.log(error);
    }
  };

  //data insert reg
  static insertReg = async (req, res) => {
    try {
      //console.log(req.files.image);

      const file = req.files.image
      //image upload
      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profile",
      });
      //console.log(uploadimage)
      // console.log("insert data");
      // console.log(req.body);
      const { n, e, p, cp } = req.body;
      const user = await usermodel.findOne({ email: e });
      //console.log(user)
      if (user) {
        req.flash("error", "Email already exist");
        res.redirect("/register");
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashpassword = await bcrypt.hash(p, 10)       // to secure password
            const result = new usermodel({
              name: n,
              email: e,
              password: hashpassword,
              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            await result.save();
            req.flash("success", "Register success plz login");
            res.redirect("/"); //route url
          } else {
            req.flash("error", "password and confiorm password are not same");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All field req");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static vlogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { e, p } = req.body;
      if (e && p) {
        const user = await usermodel.findOne({ email: e })
        if (user != null) {
          const isMatched = await bcrypt.compare(p, user.password)
          if (isMatched) {
            if (user.role =="admin"){
              let token = jwt.sign({ ID: user.id }, "nehasdfghjkertyuifghj")
            // console.log(token)
            res.cookie('token', token)

            res.redirect('/admin/dashboard')

            }else{
              let token = jwt.sign({ ID: user.id }, "nehasdfghjkertyuifghj")
            // console.log(token)
            res.cookie('token', token)

            res.redirect('/dashboard')
            }

            
          } else {
            req.flash('erorr', 'Email or Password is not valid')
            res.redirect('/')
          }
        } else {
          req.flash('error', 'You are not a registred user')
          res.redirect('/')
        }
      } else {
        req.flash('error', 'All Fields Required')
        res.redirect('/')
      }

    } catch (error) {
      console.log(error)
    }
  }
  static logout = async (req, res) => {
    try {
      res.clearCookie("token")
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.userdata;
      res.render("profile", { n: name, i: image, e: email })
    } catch (error) {
      console.log(error);
    }
  };
  static updateprofile = async (req, res) => {
    try {
      const { id } = req.userdata

      const { name, email, image } = req.body
      //  console.log(req.body)
      // console.log(req.files.image)
      if (req.files) {
        const user = await usermodel.findById(id)
        const imageID = user.image.public_id
        // console.log(imageID)

        // deleting image from cloudinary
        await cloudinary.uploader.destroy(imageID)
        //new image update
        const imagefile = req.files.image
        const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
          folder: 'profileImage'
        })
        var data = {
          name: name,
          email: email,

          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url
          }
        }

      } else {
        var data = {
          name: name,
          email: email,

        }
      }
      await usermodel.findByIdAndUpdate(id, data)
      req.flash('success', "update profile successfully")
      res.redirect('/profile')
    } catch (error) {
      console.log(error)
    }
  };

  
  static changePassword = async (req,res) =>{
    try{
      //console.log(req.body)
      const {op,np,cp} = req.body
      const {id} = req.userdata
      if (op && np && cp) {
        const user = await usermodel.findById(id)
        const isMatched = await bcrypt.compare(op,user.password)
        console.log(isMatched)
        if (!isMatched){
          req.flash('error','current password is incoreect')
          res.redirect('/profile')
        } else{
          if (np != cp){
            req.flash('error','password does not match')
            res.redirect('/profile')
          } else {
            const newHashpassword = await bcrypt.hash(np,10)
            await usermodel.findByIdAndUpdate(id,{
              password: newHashpassword
            })
            req.flash('success','password updated successfully')
            res.redirect('/')
          }
        }
      } else {
        req.flash ('error','ALL fields are required')
        res.redirect('/profile')
      }
    } catch (error){
      console.log (error)
    }
  }
  





}
module.exports = FrontController;
