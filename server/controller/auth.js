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

exports.updateProfile=(req,res)=>{
    
    console.log(req.body);

    var update = {};
    const headerObject = req.body;
    const email = req.body.email;
    var x  = 0;
    
    for(const key in headerObject){
    var field = `${key}`;
    var value =  `${headerObject[key]}`;   
    if(field != "email" && field != 'accept' && field != 'host' && field != 'connection' &&field != 'user-agent' && field != 'postman-token' && field != 'accept-encoding' && field != 'content-type' && field != 'content-length' && field != 'hobbies')
    update[field] = value;
    else if(field == 'hobbies')
    {
        update[field] = [];
        headerObject.hobbies.forEach(function(item) {
           update[field].push(item);
          });
    }
    }

    Profile.findOneAndUpdate(
        {email},
        {$set:update},{upsert:true,new:true},
        function (err,success) {

            if(err) return res.status(400).json({err});

            for(const key in success)
            {
                var local = `${success[key]}`;
                if(local  && ( key == 'email' || key == 'name' || key == 'phone' || key == 'gender' ||  key == 'dob' ||  key == 'address' || key ==  'hobbies' || key ==  'preference' ||  key == 'location'))
                {x += 10;}
            }

            console.log(x);

            Profile.findOneAndUpdate({email},{$set:{profileScore:x}},function(err,suc){

                console.log(suc);
                if(err) return res.status(400).json({err});
                else return res.status(200).json({suc});

            })


            
        }
    )



}


exports.fetchProfile=(req,res)=>{
    
    console.log(req.body);

    const email = req.body.email;

    Profile.findOne(
        {email},
        function (err,success) {

            
            if(err || success == null) return res.status(200).json({id : "Update Your Profile"});
            
            console.log(success);
            return res.status(200).json(success);
        }
    )



}


function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}


exports.getUserType= async (req,res)=>{




    const email = req.body.email;

    const data = await Subscription.findOne({email});

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

    console.log(data);
    console.log(record);
    console.log(matches);
    console.log(matchesto);


    if(data.acknowledged && record.acknowledged && matches.acknowledged && matchesto.acknowledged)
    return res.status(200).json({message:"Profile Deleted Successfully"});
    else
    return res.status(400).json({message:"Some Error Occured"});


}