const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const matchSchema = new mongoose.Schema({
    matchFrom:{
        type:String,
        require:true,
    },

    matchTo:{
        type:String,
        require:true,
    }},
    {timestamps:true}
);


module.exports = mongoose.model('Match',matchSchema);