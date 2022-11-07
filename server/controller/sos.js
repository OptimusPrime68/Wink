
const client = require('twilio')(
    process.env.TWILIO_SID
    ,process.env.TWILIO_UID
     
  );

// FUNCTION TO MAKE SOS SMS  
exports.makeSos= async(req,res)=>{


    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_NUM,
        to: req.body.to,
        body: "Hi " + "I am " + req.body.message + " I am in Danger!" + "My Location Cordinates are " + req.body.latitude + " " + req.body.longitude,
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
}


// FUNCTION TO MAKE SOS CALL
exports.makeCall = async (req,res)=>{
    
    client.calls
  .create({
    from:process.env.TWILIO_NUM,
    to:919305250754,     
    url: process.env.TWILIO_XML
  })
  .then(call => console.log(call.sid));
}


