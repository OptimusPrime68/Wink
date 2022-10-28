const User = require('../models/user');
const Profile = require('../models/profile');
const { findOne } = require('../models/user');

exports.login=(req,res)=>{
    
    const {email,password} = req.credential;




    User.countDocuments({email,password}, function (err, count){ 
        if(count>0){
                
           User.findOne({email,password}, function(err, userFromDB) {
                if(userFromDB){

                       res.status(200).json({id:userFromDB._id});
                } else {
                    res.status(400).json({id : ""});
                }
            });
           
       
        }
        else{
            res.status(400).json({id : ""});
        }
    });



}

exports.signup=(req,res)=>{
    
   const {email,password} = req.credential;

   console.log(email + password);




    User.countDocuments({email}, function (err, count){ 
        if(count>0){
                res.status(400).json({err: "Please Login"}); 
        }
        else{
          const user = new User({
              email,password
          });
          user.save(function(err,result){
            console.log(result);  
            res.status(200).json({id : result._id});
          });
        }
    });



}

exports.updateProfile=(req,res)=>{
    

    var update = {};
    const headerObject = req.headers;
    const email = req.headers.email;
    
    for(const key in headerObject){
    var field = `${key}`;
    var value =  `${headerObject[key]}`;   
    if(field != "email" && field != 'accept' && field != 'host' && field != 'connection' &&field != 'user-agent' && field != 'postman-token' && field != 'accept-encoding' && field != 'content-type' && field != 'content-length')
    update[field] = value;
    }

    Profile.findOneAndUpdate(
        {email},
        {$set:update},{upsert:true,new:true},
        function (err,success) {

            console.log(err);
            console.log(success);
            if(err) return res.status(400).json({err});
            return res.status(201).json(success);
        }
    )



}