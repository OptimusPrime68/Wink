const User = require('../models/user');
const Profile = require('../models/profile');

exports.login=(req,res)=>{
    
    const {email,password} = req.credential;




    User.countDocuments({email,password}, function (err, count){ 
        if(count>0){
                res.status(200).json({err: "Login Successfully"});
       
        }
        else{
            res.status(401).json({err: "Wrong Credentials"});
        }
    });



}

exports.signup=(req,res)=>{
    
    const {email,password} = req.credential;




    User.countDocuments({email}, function (err, count){ 
        if(count>0){
                res.status(200).json({err: "Please Login"}); 
        }
        else{
          const user = new User({
              email,password
          });
          user.save(function(err,result){
            res.status(200).json({result});
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