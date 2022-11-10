const Date= require('../models/date');
const SuperLike = require('../models/superLike')
const Profile = require('../models/profile');


// FUNCTIONS TO CREATE DATE
exports.makeDate= async (req,res)=>{

    console.log(req.body);
    const date = new Date(req.body.newEvent);
    date.save(function(err,result){
      console.log(result);  
      res.status(200).json({result});
    });
  
}
// FUNCTIONS TO GET DATE
exports.getDate= async (req,res)=>{

    const data =await Date.find({$or:[{from:req.body.email},{to:req.body.email}]});
    console.log(data);
    if(data == null)
    return res.status(400).json({m:"no user found"});
    return res.status(200).json({m:data});
  
}
// FUNCTIONS TO REMOVE DATE
exports.removeDate = async (req,res)=>{

    var r = req.body.e
    console.log('R',r);
    Date.findOneAndRemove(r,function(err,result){
        console.log(result);
        res.status(200).json(result);
    });
}

