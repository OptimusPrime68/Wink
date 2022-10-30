const Profile = require('../models/profile')



exports.allProfile=(req,res)=>{

    console.log(req.body);

    var preference = "";
    var email = req.body.email;

    Profile.findOne({email},function(err,result){

        console.log(result);
        
        if(result == null) res.status(400).json({message:"Complete Your Profile and Select Preference"});
        else{
        preference = result.preference;


        
        Profile.find(
            {gender:preference},
            function (err,success) {
                if(err) return res.status(400).json({id : "No Profile Found"});
                console.log(success);
                return res.status(201).json(success);
            }
        )
        }

    });

  


    

}