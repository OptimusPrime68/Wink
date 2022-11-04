const User = require('../models/user');
const Profile = require('../models/profile');
const Subscription = require('../models/subscription');
const Match = require("../models/match");

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
            res.status(400).json({Error:"No User Exist"});
        }
    });
}

exports.signup=(req,res)=>{
    
   const {email,password} = req.credential;

   console.log(email + password);


    User.countDocuments({email}, function (err, count){ 
        if(count>0){
                res.status(400).json({Error: "Please Login"}); 
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




function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}


exports.getUserType= async (req,res)=>{




    const email = req.body.email;

    const data = await Subscription.findOne({email});


    console.log(data);

    if(data){    
    const diff = (datediff(data.date_of_joining,new Date()));

    if(diff > data.tenure*30){
    await Subscription.remove({email});
    res.status(200).json({user:"free"});
    await Subscription.remove({email});
    }
    else
    res.status(200).json({user:"premium"});
    }
    else
    res.status(200).json({user:"free"});
}


exports.deleteAccount = async (req,res)=>{
    const email = req.body.email;

    const data =await  User.deleteOne({email});
    const record = await Profile.deleteOne({email});
    const matches = await Match.deleteMany({matchFrom:email});
    const matchesto = await Match.deleteMany({matchTo:email});
    const subs = await Subscription.deleteMany({email});

    console.log(data);
    console.log(record);
    console.log(matches);
    console.log(matchesto);
    console.log(subs);


    if(data.acknowledged && record.acknowledged && matches.acknowledged && matchesto.acknowledged)
    return res.status(200).json({message:"Profile Deleted Successfully"});
    else
    return res.status(400).json({message:"Some Error Occured"});
}


exports.googleLogin= async (req,res)=>{
    
    const {email} = req.credential;


    const data = await User.findOne({email});

    if(data)
    {
         res.status(200).json({data});
         return;
    }


          const user = new User({
              email,password:"AQWScdss#@$0onn$2gf4$@54"
          });

          user.save(function(err,result){
            console.log(result);  
            res.status(200).json({id : result._id});
          });
        
    
}