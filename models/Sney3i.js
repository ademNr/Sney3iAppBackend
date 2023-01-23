const mongoose = require("mongoose"); 


const sney3iSchema = new mongoose.Schema({
    
    
    email:{
        type : String , 
        required : true , 
        unique : true,

    },
    
    
    
    username: {
        type : String , 
        required : true,
       
        
    },

    

    password: {
        type : String , 
        required : true , 

    },

  

    number:{
        type: String, 
        required: true, 
    },
    photo:{
        type: String, 
        required: true, 
    },
    
    city:{
        type: String, 
        required: true, 
    },
    service_type:{
        type: String, 
        required: true, 
    }, 
    
    bio:{
        type: String, 
        
    }


    

    
},

{ timestamps:true }

);
module.exports = mongoose.model('Sney3i' , sney3iSchema) ;