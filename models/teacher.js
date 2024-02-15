const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Require: true,
    },
    email: {
      type: String,
      Require: true,
    },
  },
  { timestamps: true }
);
const TeacherModel = mongoose.model("teacher", TeacherSchema);
module.exports = TeacherModel;