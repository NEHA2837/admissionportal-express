const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      Require: true,
    },
    email: {
      type: String,
      Require: true,
    },
    password: {
      type: String,
      Require: true,
    },
    role: {
      type: String,
      default: "user",
    },
    image:{
      public_id:{
        type:String,
        Required:true,
      },
      url:{
        type:String,
        Required: true,
      },
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", Userschema);
module.exports = UserModel;