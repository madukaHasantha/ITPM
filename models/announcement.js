const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const announceSchema = new Schema({

    announcementID: {
        type: String,
        required: true,
        unique:true
      },
    
      catagory: {
        type: String,
        required: true,
      },
    
      toWhome: {
        type: String,
        required: true,
        
      },
      from: {
        type: String,
        required: true,
      },
    
      message: {
        type: String,
        required: true,
        
      },

      date: {
        type: String,
        required: true,
      },
    
      time: {
        type: String,
        required: true,
        
      },
    
      

})

const announce = mongoose.model("Announcement", announceSchema);
module.exports = announce;