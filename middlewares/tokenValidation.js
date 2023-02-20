const jwt = require('jsonwebtoken'); 

const dotenv = require("dotenv");
dotenv.config() ;


//
const verifyToken = (req,res, next)=>{
    
    let token ; 
    if(req.headers.authtoken ){
        token = req.headers.authtoken;
    }
    if(!token) return res.status(401).json({message: "access denied"});

    try{

        const verified = jwt.verify(token, process.env.token_secret);
        req.user = verified ; 
        next();


    }catch(err){
        res.status(400).json('invalid token');
    }
}


//
const verifyTokenAndAuth = (req,res, next)=>{
    verifyToken(req,res,()=>{
        if( req.params.id == req.user.id ){
            next(); 
        }else{
            return res.status(403).json("you're not authorized ");
        }

    });

}

const verifyUser = ( req, res, next)=>{
    if(req.params.id == req.user.id){
        next(); 
    }else{
        return res.status(403).json("you re not authorized") ;
    }
}

module.exports = {verifyToken,verifyTokenAndAuth, verifyUser }