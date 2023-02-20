const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); 
const bodyParser = require("body-parser"); 

dotenv.config() ;

//parsing data 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 // cors 
 app.use(cors());



// importing routes
const sney3iRoute = require("./routes/sney3iRoute");
const userRoute = require("./routes/userRoute")
//routes
app.use("/api/sney3i", sney3iRoute);
app.use("/api/user", userRoute);

// DB connection 
mongoose.connect(process.env.DB, 
    
    {  useNewUrlParser : true } , 
    ()=>{
      console.log("connected to DB ");
    }
  
  );
  
// server connection 
app.listen(process.env.PORT,()=>{
    console.log("lintening on port ", process.env.PORT);
    
} );