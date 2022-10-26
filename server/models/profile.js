const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const profileSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        index:true,
        unique:true,
    },
    first_name:{
        type:String,
        require:true,
    }
    ,last_name:{
        type:String,
        require:true,
    }
    ,image_url:{
        type:[String],
    },
    dob:{
        type:Date,
        require:true,
    }
    ,hobbies:{
        type:[String],
    },
    address:{
        type:String,
    },
    location: {
        type: { type: String },
        coordinates: []
    }
   },
    {timestamps:true}
);


module.exports = mongoose.model('Profile',profileSchema);