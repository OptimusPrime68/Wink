const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    authorId:{
        type:'ObjectId',
        ref:"Profile",
    },
    likes:[{
        type:'ObjectId',
        ref:"Profile",
    }],
},
    {timestamps:true}
);


module.exports = mongoose.model('Post',postSchema);