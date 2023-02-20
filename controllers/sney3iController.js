
const sney3i = require("../models/Sney3i"); 
const jwt = require("jsonwebtoken"); 
const {registerValidation,loginValidation, Sney3iRegisterValidation , } = require("../middlewares/validation");
const bcrypt = require('bcryptjs');
const Sney3i = require("../models/Sney3i");
const multer = require("multer"); 
const Image = require("../models/Image"); 


const  Storage = multer.diskStorage({
    destination: "uploads", 
    filename : (req, file, cb)=>{
        cb(null ,file.originalname);
    }
});
const upload = multer({
    storage : Storage 
}).single('image');

//upload photo 
const   postImage = async (req, res)=>{
   upload(req, res,(err)=>{
    if(err){
        console.log(err)
    }else{
        const newImage = new Image({
            name : req.body.name ,
            sney3iId : req.body.sney3iId , 
            image :{
                data: req.file.filename, 
                contentType : 'image/png'
            },
            path: req.file.path
        })
       newImage.save().then(()=>res.send('succes uploading image')).catch(err=>console.log(err));
    }
   })
}
// get image using sney3i id
const getSney3iImage = async(req,res)=>{
    const IdQuery = req.query.sney3iId 
    if(IdQuery){
        const { path } = await Image.find({
            sney3iId : {$in:[IdQuery]},
        }); 
        res.status(200).sendfile(path); 
    }

    
}


// register sney3i 
const registerSney3i = async(req, res)=>{

    const {error} = Sney3iRegisterValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message); 
    
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
        city : req.body.city, 
        number : req.body.number, 
        photo : req.body.photo , 
        service_type : req.body.service_type, 
        bio : req.body.bio,
        spec : req.body.spec
       });
       try{
        const savedSney3i = await sney3i.save(); 
        const token = await jwt.sign({id:sney3i._id}, process.env.token_secret)
        res.header('authtoken', token).json(
            
              {
                token : token , 
                id : sney3i._id
              }
            ); 
       }catch(err){
        res.status(200).json(err);
       }
}


// login sney3i 
const loginSney3i = async(req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message); 

    
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
  const token  = await jwt.sign({id:sney3ii._id}, process.env.token_secret);
       res.header('authtoken', token).json({
        token : token , 
        id : sney3ii._id
       }); 
}


// get all sney3ia info // query by city and service type
const getSney3iaByServiceAndCity = async(req,res)=> {
    const cityquery = req.query.city; 
    const servicequery = req.query.service_type; 
    let sney3ia;
    if(servicequery && cityquery ){
        sney3ia = await Sney3i.find({
            service_type : {$in:[servicequery]},
            city : {$in:[cityquery]}  
        }); 
        res.status(200).json({data : sney3ia}); 
    }  
}
//get the most liked 20 sney3i by service
const getSney3iaByServiceAndLike = async(req,res)=> {
    const servicequery = req.query.service_type; 
    let sney3ia;
    if(servicequery  ){
        sney3ia = await Sney3i.find({
            service_type : {$in:[servicequery]}, 
        }).limit(20).sort({like: -1}); 
        res.status(200).json({ data : sney3ia}); 
    }
}
//get the most liked 20 sney3i in a state
const getSney3iaByCityLike = async(req,res)=> {
    
    const servicequery = req.query.city; 
    let sney3ia;
    if(servicequery  ){
        sney3ia = await Sney3i.find({
            city : {$in:[servicequery]},
        }).limit(20).sort({unlike: -1}); 
        res.status(200).json({ data : sney3ia}); 
    }
}
//get sney3i by name 
const getSney3iByName = async(req,res)=> {
    
    const namequery = req.query.username; 
    let sney3ia;
    if(namequery ){
        sney3ia = await Sney3i.find({
            'username': { $regex: '^' + namequery, $options: 'i' }
        }).exec(); 
        res.status(200).json({ data : sney3ia}); 
    }
}
const getSneyiByServiceCityLike = async(req,res)=>{
    const cityquery = req.query.city ; 
    const servicequery = req.query.service_type ; 
    let sney3ia ; 
    if(servicequery && cityquery ){
        sney3ia = await Sney3i.find(
            {
                city: {$in:[cityquery]} , 
                service_type :{$in:[servicequery]}
            }
        ).sort({like:-1}) ; 
        res.status(200).json({data : sney3ia}) ;

    }
    
}
//get all sney3ia 
const getAllSney3ia = async(req,res)=> {
   
        let sney3ia;
   try{
    sney3ia = await Sney3i.find(); 
     return res.status(200).json(
        { data : sney3ia}
        ); 
   }catch(error){
    res.status(400).json(error)
   } 
}

// get Sney3i by id 
const getSney3iById = async(req,res)=>{
    let sney3i ; 
    try{
        sney3i = await Sney3i.findById(req.params.id) ; 
       return  res.status(200).json(
           sney3i 
        )
    }catch(error){
        return res.status(400).json(error)
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







module.exports = {getSney3iByName,getSneyiByServiceCityLike,postImage , loginSney3i , registerSney3i, getSney3iaByServiceAndCity, updateSney3i , getAllSney3ia, getSney3iaByServiceAndLike, getSney3iById, getSney3iImage,getSney3iaByCityLike}