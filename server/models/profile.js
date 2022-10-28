const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const profileSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        index:true,
        unique:true,
    },
    name:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
    },
    gender:{
        type:String,
    },
    dob:{
        type:Date,
    },
    address:{
        type:String,
    },
    hobbies:{
        type:[String],
    },
    location: {
        type: { type: String },
        coordinates: []
    }
   },
    {timestamps:true}
);


module.exports = mongoose.model('Profile',profileSchema);