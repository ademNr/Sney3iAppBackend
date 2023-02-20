const mongoose = require("mongoose"); 


const imageSchema = new mongoose.Schema({
    sney3iId: {
        type: String 

    },
    name: {
        type:String , 
        required: true 
    }, 
    image : {
        data : Buffer , 
        contentType : String 
    },
    path : { // "./uploads/[xxxxxxxxxxxxxxxxxxxxxxx].png"
        type : String,
        required:  true
    }

    
},

{ timestamps:true }

);
module.exports = mongoose.model('image' , imageSchema) ;

