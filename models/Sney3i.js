const mongoose = require("mongoose"); 


const sney3iSchema = new mongoose.Schema({

    like:{
        type : Number ,
        default : 0
    }, 
    unlike:{
        type: Number,
        default : 0
    },
    
    
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
        default : ""
        
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
        
    },
    spec:{
        type : String, 
        required:true 
    }


    

    
},

{ timestamps:true }

);
module.exports = mongoose.model('Sney3i' , sney3iSchema) ;