const jwt = require("jsonwebtoken"); 
const {registerValidation,loginValidation  } = require("../middlewares/validation");
const bcrypt = require('bcryptjs');
const User = require("../models/User")

const userRegister = async(req,res)=>{
 const {error} = registerValidation(req.body); 
 if(error){
    return res.status(400).json(error.details[0].message);
 }

 const emailExist = await User.findOne({email : req.body.email});
     if(emailExist){
        return res.status(400).json({message : 'this email already email exists'});
     }
     //
      // creating hashed password 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword= await bcrypt.hash(req.body.password,salt);

      //creating new user 
       const user  = new User({
        email : req.body.email , 
        password : hashedPassword ,
        username : req.body.username,
        
       });

       try{
        const saveduser = await user.save(); 
        const token =  jwt.sign({id:user._id}, process.env.token_secret)
        res.header('authtoken', token).json(token); 
        
       }catch(err){
        res.status(200).json({message : err});
       }

}


const userLogin = async(req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message); 
  //checking email existence 

    const user = await User.findOne({email : req.body.email });
    if(!user){
        return res.status(400).json( ' invalid email '); 
     }
     //
     const validPass = await bcrypt.compare(req.body.password , user.password); 
  if(!validPass){
    return res.status(400).json('wrong password');
  }
  

  //
  const token  =  jwt.sign({id:user._id}, process.env.token_secret);
       res.header('authtoken', token).json(token); 
}


module.exports = { userLogin , userRegister}