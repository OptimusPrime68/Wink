const Date= require('../models/date');
const SuperLike = require('../models/superLike')
const Profile = require('../models/profile');
const Match = require('../models/match')


exports.getLike = async (req,res)=>{
   
    const data =await Match.find({matchTo:req.body.email});
    var result = [];
    for(var i = 0;i<data.length;i++)
    {
       const d= await Profile.findOne({email:data[i].matchFrom});
       result.push(d);
    }
    console.log("Result",result);
    if(result == null)
    return res.status(400).json({m:"no user found"});
    return res.status(200).json({m:result});
}

exports.makeSuperLike = async (req,res)=>{
    const superLike = new SuperLike(req.body);
    superLike.save(function(err,result){
      console.log(result);  
      if(err) res.status(400).json({message:"Some Error Occured"});
      else
      res.status(200).json({result});
    });
    
}

exports.getSuperLike = async (req,res)=> {

    const data =await SuperLike.find({to:req.body.email});
    var result = [];

    for(var i = 0;i<data.length;i++)
    {
       const d= await Profile.findOne({email:data[i].from});
       result.push(d);
    }
    if(result == null)
    return res.status(400).json({m:"no user found"});
    return res.status(200).json({m:result});
}