const mongoose = require("mongoose"); 


const userSchema = new mongoose.Schema({
    
    
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

  

   

    

    
},

{ timestamps:true }

);
module.exports = mongoose.model('user' , userSchema) ;

