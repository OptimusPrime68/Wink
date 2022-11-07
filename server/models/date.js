const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
//SCHEMA FOR DATE PLANNER
const dateSchema = new mongoose.Schema({
    from:{
        type:String,
        require:true,
    },
    to:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    start:{
        type:Date,
        require:true,
    },
    end:{
        type:Date,
        require:true,
    }},
    {timestamps:true}
);


module.exports = mongoose.model('Date',dateSchema);