const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const teacherSchema = new Schema ({


    firstName : {

        type: String,
        required: true
    },

    lastName: {

        type : String,
        required: true
    },

    email: {

        type : String,
        required: true
    },

    mobile: {

        type : Number,
        required: true
    },

    dateOfBirth: {

        type : Date,
        required: true
    },

    password: {

        type : String,
        required: true
    },

    address: {

        type : String,
        required: true
    },

    idNumber: {

        type : String,
        required: true,
        unique:true
    },
    role: {

        type : String,
        required: true
        
    },
    gender: {

        type : String,
        required: true
        
    },
    className: {

        type : String,
        
        
    },



})

const Teacher = mongoose.model("Teacher",teacherSchema);
module.exports = Teacher;