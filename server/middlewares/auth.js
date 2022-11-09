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
