const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const subscriptionSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        index:true,
        unique:true,
    },
    charge:{
        type:Number,
        require:true,
    },
    date_of_joining:{
        type:Date,
        require:true,
    },
    tenure:{
        type:Number,
        require:true,
    },
    order_id:{
        type:String,
        unique:true,
        require:true,
    }},
    {timestamps:true}
);


module.exports = mongoose.model('Subscription',subscriptionSchema);