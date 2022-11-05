const Date= require('../models/date')



exports.makeDate= async (req,res)=>{

    console.log(req.body);

    const date = new Date(req.body.newEvent);
    date.save(function(err,result){
      console.log(result);  
      res.status(200).json({result});
    });


  
}

exports.getDate= async (req,res)=>{

    

    const data =await Date.find({from:req.body.email});

    console.log(data);

    if(data == null)
    return res.status(400).json({m:"no user found"});

    return res.status(200).json({m:data});

  
}