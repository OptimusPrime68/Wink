const Date= require('../models/date');
const SuperLike = require('../models/superLike')



exports.makeDate= async (req,res)=>{

    console.log(req.body);
    const date = new Date(req.body.newEvent);
    date.save(function(err,result){
      console.log(result);  
      res.status(200).json({result});
    });
  
}

exports.getDate= async (req,res)=>{

    const data =await Date.find({$or:[{from:req.body.email},{to:req.body.email}]});
    console.log(data);
    if(data == null)
    return res.status(400).json({m:"no user found"});
    return res.status(200).json({m:data});
  
}

exports.removeDate = async (req,res)=>{

    var r = req.body
    console.log('R',r);
    const data = await Date.findOneAndRemove(r);
    console.log("Data",data);
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
    console.log(data);
    if(data == null)
    return res.status(400).json({m:"no user found"});
    return res.status(200).json({m:data});
}