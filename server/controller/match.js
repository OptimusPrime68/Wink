const Match= require('../models/match')



exports.makeMatch=(req,res)=>{


    const from_email = req.body.fromemail;
    const to_email = req.body.toemail;


    var update = {};
    update["matchFrom"] = from_email;
    update["matchTo"] = to_email;
    Match.findOneAndUpdate(
        {matchFrom:from_email,matchTo:to_email},
        {$set:update},{upsert:true,new:true},
        function (err,success) {
            console.log(err);
            console.log(success);
            if(err) return res.status(400).json({err});
            return res.status(201).json(success);
        }
    )
}

exports.getMatch= async (req,res)=>{

    const email = req.body.email;
    var localEmail = [];
    var finalEmail = [];


    localEmail = await Match.find({matchFrom:email});

    console.log(localEmail);

    for(var i = 0;i<localEmail.length;i++){
        var count = await  Match.count({matchFrom:localEmail[i].matchTo,matchTo:email})
        if(count){
        console.log(localEmail[i].matchTo);
        finalEmail.push(localEmail[i].matchTo);
        }
   }
    res.status(201).json(finalEmail);

}