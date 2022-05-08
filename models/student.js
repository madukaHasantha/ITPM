const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const studentSchema = new Schema({
  nameInFull: {
    type: String,
    required: true,
  },

  nameWithInitials: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  parentMobile: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  expectGrade: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "student",
  },
  gender: {
    type: String,
    required: true,
  },
  currentGrade: {
    type: String,
    
  },
  className: {
    type: String,
   
  },
  classTeacherName: {
    type: String,
    
  },
  approved:{
    type:Boolean,
    default:false
  }
});

const Stusent = mongoose.model("Student", studentSchema);
module.exports = Stusent;
