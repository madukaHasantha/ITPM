const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Databass Schema

const TeacherSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    idNumber: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    className: { type: String, required: true },
    

}, {
    timestamps: true,
});



const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;