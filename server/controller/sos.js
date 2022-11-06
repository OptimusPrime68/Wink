
const client = require('twilio')(
    "AC2cd28935df29996e10be23a5a1e054c7",
     "9512fb40f3ff4dc4445334145b6c91d6"
  );
exports.makeSos= async(req,res)=>{


    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: +18316536283,
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

exports.makeCall = async (req,res)=>{
    
    client.calls
  .create({
    from:+18316536283,
    to:919305250754,     
    url: "https://handler.twilio.com/twiml/EHf74717c32fc945c093b4b740508e815d"
  })
  .then(call => console.log(call.sid));
}


