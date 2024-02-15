const jwt = require("jsonwebtoken")
const usermodel = require("../models/user")

const checkuserAuth = async (req,res,next) =>{
    //console.log("middleware auth")
    const {token} = req.cookies; //token get
    //console.log(token)
    if (!token){
        req.flash("error","unauthorized login")
        req.redirect("/login")
    } else {
        const data = jwt.verify(token, "nehasdfghjkertyuifghj")
        // data get
        const userdata = await usermodel.findOne({_id: data.ID})
        //console.log(userdata)
        req.userdata = userdata;
        next()
    }
}

module.exports = checkuserAuth


