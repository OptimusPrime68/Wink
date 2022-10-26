const admin = require("../firebase");


exports.authCheck = (req,res,next) =>{
   try{
        
    
    const email =  req.headers.email;
    const password =     req.headers.password;
    // AUTH CHECK PASSWORD BCRYPT
    req.credential = {
        email,password
    }
    next();
   }
   catch(err)
   {
       res.status(401).json({err: "Invalid Request"});
   }
};


exports.profileCheck = (req,res,next) =>{
    try{
         
     
     // AUTH CHECK PASSWORD BCRYPT
     
     next();
    }
    catch(err)
    {
        res.status(401).json({err: "Invalid Request"});
    }
 };
 
