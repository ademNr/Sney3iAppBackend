const joi = require('@hapi/joi');


const Sney3iRegisterValidation = (data)=>{
    const validationSchema = joi.object({
        email : joi.string().required().email(),
        username : joi.string().min(4).required(), 
        password : joi.string().min(6).required(), 
        number : joi.string().min(8).max(8).required(), 
        spec : joi.string().required(), 
        city: joi.string().required(), 
        service_type : joi.string().required(),
        bio : joi.string()
     

    });

    return validationSchema.validate(data)
}
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
        password : joi.string().required()

    });

    return validationSchema.validate(data);
    
}

module.exports = {registerValidation, loginValidation , Sney3iRegisterValidation}