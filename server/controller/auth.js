const User = require('../models/user');
const Profile = require('../models/profile');
const Subscription = require('../models/subscription');
const Match = require("../models/match");
const bcrypt = require("bcrypt");
const SuperLike = require("../models/superLike");
const Post = require("../models/post");
const Date = require("../models/date");
// FUNCTION TO LOGIN USER
exports.login=(req,res)=>{
    
    const {email,password} = req.credential;

    console.log(password);


    User.countDocuments({email}, function (err, count){ 
        if(count>0){
                
           User.findOne({email}, function(err, userFromDB) {

            console.log(userFromDB);
            if(userFromDB && userFromDB.login != "email")  
            res.status(400).json({Error:"Sign In With the Medium You Use For Signup"});
             

            bcrypt.compare(password, userFromDB.password, function(err, result) {

                console.log("RESULT",result);
                if (err){
                    res.status(400).json({Error:"Wrong Password"});
                }
                if (result) {
                    res.status(200).json({id:userFromDB._id});
                } else {
                  // response is OutgoingMessage object that server response http request
                  return res.status(400).json({Error: 'passwords do not match'});
                }})

               

         })}else {
             res.status(400).json({Error:"Wrong Password"});
         }
    });
}

// FUNCTION TO SIGN UP USER
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



// FUNCTION TO GET DIFFERENCE IN DATE TO GET DAYS
function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

// FUNCTION TO GET IF USER IS FREE OR PREMIUM
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

// FUNCTION TO DELETE ACCOUNT
exports.deleteAccount = async (req,res)=>{
    const email = req.body.email;

    const data =await  User.deleteOne({email});
    const record = await Profile.deleteOne({email});
    const matches = await Match.deleteMany({matchFrom:email});
    const matchesto = await Match.deleteMany({matchTo:email});
    const subs = await Subscription.deleteMany({email});
    await SuperLike.deleteMany({from:email});
    await SuperLike.deleteMany({to:email});
    await Date.deleteMany({from:email});
    await Date.deleteMany({to:email});

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

// FUNCTION TO AUTHENTICATE USER USING GOOGLE
exports.googleLogin= async (req,res)=>{
    const {email} = req.credential;
    const data = await User.findOne({email});
    if(data)
    {
         res.status(200).json({data});
         return;
    }
    const user = new User({
              email,password:"AQWScdss#@$0onn$2gf4$@54",login:"google"
    });
          user.save(function(err,result){
            console.log(result);  
            res.status(200).json({id : result._id});
          });
        
    
}


exports.forgotPassword = async (req,res)=>{

    const {email,password} = req.credential;

    console.log(email + password);

 
    User.findOne({email},function(err,result){

        if(result == null) res.status(400).json({message:"User Not Exists"});
        else if(err) res.status(400).json({message:err.message});
        else if(result.login != "email") res.status(400).json({message:"User Not Logged in by email"});
        else{
        User.findOneAndUpdate({email},{$set:{password:password}},function (err, results){
         
            if(err) res.status(400).json({message:err.message});
            else res.status(200).json({message:"Password Change Successfully"});
          
         });
        }

    })
 
  

}