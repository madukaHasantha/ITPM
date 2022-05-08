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
    type: Number,
    required: true,
  },

  dateOfBirth: {
    type: Date,
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
});

const Stusent = mongoose.model("Student", studentSchema);
module.exports = Stusent;
