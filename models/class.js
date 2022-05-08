const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const classSchema = new Schema({

    classGreade: {
        type: String,
        required: true,
      },
    
      className: {
        type: String,
        required: true,
      },
    
      classTeacher: {
        type: String,
        required: true,
        
      },

      students:[String]
    
})

const Class = mongoose.model("Class", classSchema);
module.exports = Class;