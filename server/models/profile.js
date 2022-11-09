const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
// SCHEMA FOR USER PROFILE
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
    age:{
        type:Number,
    },
    address:{
        type:String,
    },
    hobbies:{
        type:[String],
    },
    preference:{
        type:String,
        default:"male"
    },
    location: {
        type: { type: String},
        coordinates: [Number]
    },
    profileScore:{
        type:Number,
        default:0
    },
    agePreference:{
        type:[Number],
        default:[18,80],
    },
    distance:{
        type:Number,
        default:1000000
    },image:{
        type:String,
    }
   },
    {timestamps:true}
);



module.exports = mongoose.model('Profile',profileSchema);