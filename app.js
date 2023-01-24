const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config() ;

//parsing data 
app.use(express.json());
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