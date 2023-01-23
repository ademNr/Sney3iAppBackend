const joi = require('@hapi/joi');



const registerValidation= (data)=>{

    const validationSchema = joi.object({
        email : joi.string().required().email() ,
        username : joi.string().min(6).required(), 
        password : joi.string().min(6).required()
     

    });

    return validationSchema.validate(data)
    
}


const loginValidation= (data)=>{

    const validationSchema = joi.object({
        email : joi.string().required().email() ,
        password : joi.string().min(6).required()

    });

    return validationSchema.validate(data);
    
}

module.exports = {registerValidation, loginValidation }