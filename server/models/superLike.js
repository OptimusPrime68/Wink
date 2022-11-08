const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

// SCHEMA FOR SUPER LIKE
const superLikeSchema = new mongoose.Schema({
    from:{
        type:String,
        require:true,
    },
    to:{
        type:String,
        require:true,
    }},
    {timestamps:true}
);


module.exports = mongoose.model('SuperLike',superLikeSchema);