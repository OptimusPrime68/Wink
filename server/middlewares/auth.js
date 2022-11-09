const admin = require("../firebase");
const bcrypt = require("bcrypt");

exports.authCheck = async (req, res, next) => {


 

  try {
    bcrypt.hash(req.body.password,12,function(err,has){
      if(!err) {
      const email = req.body.email;
      const password = has;
      req.credential = {
        email,
        password,
      };
      next();
    }
    })
  } catch (err) {
    res.status(401).json({ err: "Invalid Request" });
  }
};


exports.loginCheck = async (req, res, next) => {


 

  try {

    const token = req.body.token;
  
  
      const d = await admin.auth().verifyIdToken(token);

      console.log(d);
  
  
    
      const email = req.body.email;
      const password = req.body.password;
      req.credential = {
        email,
        password,
      };
      next();
    }
  
   catch (err) {
    res.status(401).json({ err: "Invalid Request" });
  }
};

exports.profileCheck = (req, res, next) => {
  console.log(req.body);
 
    next();
  
};


exports.tokenVerifier = async  (req,res,next) =>{

  const token = req.body.token;
  console.log(token);
  try{

    await admin.auth().verifyIdToken(token);
    next();

  }catch(err){
    res.status(400).json({message:"Token Expired"});
  }

}
