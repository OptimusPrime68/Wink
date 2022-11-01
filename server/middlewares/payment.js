const admin = require("../firebase");


exports.paymentCheck = (req,res,next) =>{

  
    

   try{
        
    
   
    next();
   }
   catch(err)
   {
       res.status(401).json({err: "Invalid Request"});
   }
};
