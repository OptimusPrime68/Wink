const Profile = require('../models/profile')


exports.updateProfile=(req,res)=>{
    
    console.log(req.body);

    var update = {};
    const headerObject = req.body;
    const email = req.body.email;
    var x  = 0;
    
    for(const key in headerObject){
    var field = `${key}`;
    var value =  `${headerObject[key]}`;   
    if(field != 'accept' && field != 'host' && field != 'connection' &&field != 'user-agent' && field != 'postman-token' && field != 'accept-encoding' && field != 'content-type' && field != 'content-length' && field != 'hobbies')
    update[field] = value;
    else if(field == 'hobbies')
    {
        update[field] = [];
        headerObject.hobbies.forEach(function(item) {
           update[field].push(item);
          });
    }
    }

    console.log(update);

    Profile.findOneAndUpdate(
        {email},
        {$set:update},{upsert:true,new:true},
        function (err,success) {

            if(err) return res.status(400).json({err});
              
            else return res.status(200).json(success);
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


exports.allProfile=(req,res)=>{

    console.log(req.body);

    var preference = "";
    var age = 100;
    var email = req.body.email;

    console.log(req.body);

    Profile.findOne({email},function(err,result){

        console.log(result);
        
        if(result == null) res.status(400).json({message:"Complete Your Profile and Select Preference"});
        else{
        preference = result.preference;
        age = result.agePreference;
        

        
        Profile.find(
            {gender:preference,agePreference:{$lt:100}},
            function (err,success) {
                if(err) return res.status(400).json({id : "No Profile Found"});
                console.log(success);
                return res.status(201).json(success);
            }
        )
        }

    });

  


    

}