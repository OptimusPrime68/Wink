const admin = require("../firebase");


exports.authCheck = async (req,res,next) =>{

<<<<<<< HEAD

=======
   try{
        
    
>>>>>>> 492d334108abd7ddbcc61d50a3400ada3ca709ca
    const email =  req.body.email;
    const password =     req.body.password;
    req.credential = {
     email,password
    }
   try{
   

    next();
   }
   catch(err)
   {
       res.status(401).json({err: "Invalid Request"});
   }
};


exports.profileCheck = (req,res,next) =>{

    console.log(req.body);
    try{
         
      
        next();
    }
    catch(err)
    {
        res.status(401).json({err: "Invalid Request"});
    }
 };
 
