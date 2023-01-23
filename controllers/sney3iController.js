
const sney3i = require("../models/Sney3i"); 
const jwt = require("jsonwebtoken"); 
const {registerValidation,loginValidation  } = require("../middlewares/validation");
const bcrypt = require('bcryptjs');
const Sney3i = require("../models/Sney3i");


// register sney3i 
const registerSney3i = async(req, res)=>{

    // checking valid data 
    
     //checking for email existence 
     const emailExist = await Sney3i.findOne({email : req.body.email});
     if(emailExist){
        return res.status(400).json({
           
            message: 'this email already email exists'
        });
     }
     // creating hashed password 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword= await bcrypt.hash(req.body.password,salt);

      //creating new user 
       const sney3i  = new Sney3i({
        email : req.body.email , 
        password : hashedPassword ,
        username : req.body.username,
        city : req.body.city  , 
        number : req.body.number, 
        photo : req.body.photo , 
        service_type : req.body.service_type, 
        bio : req.body.bio
       });


       try{
        const savedSney3i = await sney3i.save(); 
        const token = await jwt.sign({id:sney3i._id}, process.env.token_secret)
        res.header('authtoken', token).json(
            {
                token : token
              
                
            }
            ); 
        
       }catch(err){
        res.status(200).json({message : err});
       }



}


// login sney3i 
const loginSney3i = async(req,res)=>{

    
  //checking email existence 

    const sney3ii = await Sney3i.findOne({email : req.body.email });
    if(!sney3ii){
        return res.status(400).json({message : 'invalid email '}); 
     }

 
 

 //checkign for correct pass 
  
    const validPass = await bcrypt.compare(req.body.password , sney3ii.password); 
  if(!validPass){
    return res.status(400).json({message:'wrong password'});
  }
  

  //
  const token  = await jwt.sign({id:sney3ii._id}, process.env.token_secret);
       res.header('authtoken', token).json({message:token}); 
       


}


// get all sney3ia info // query by city and service type
const getSney3ia = async(req,res)=> {
    const cityquery = req.query.city; 
    const servicequery = req.query.service_type; 
    let sney3ia;
    if(servicequery && cityquery ){
        sney3ia = await Sney3i.find({
            service_type : {$in:[servicequery]},
            city : {$in:[cityquery]}
            
           
           
        }); 
        res.status(200).json(sney3ia); 
    }
   
    
}

// update sney3i data 
const updateSney3i = async(req,res)=>{
    try{
        const updatedSney3i = await Sney3i.findByIdAndUpdate(req.params.id, {$set : req.body}, {new: true});
        res.status(200).json(updatedSney3i); 

    }catch(err){
        res.status(400).json(err); 

    }

}




module.exports = {loginSney3i , registerSney3i, getSney3ia, updateSney3i }