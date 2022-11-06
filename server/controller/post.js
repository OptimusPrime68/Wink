
const Post= require('../models/post')
const Profile = require('../models/profile');
const Match= require('../models/match')
var mongoose = require('mongoose');
// profile 6363cfa66b9c72a61f76c99d 6363d0b06b9c72a61f77ebd2 6363d1546b9c72a61f789b67 
// name   Katrina Kirti Sirin Kajal
exports.makePost=(req,res)=>{

    const {content,authorid} = req.body;
    console.log(content,authorid);

    const post = new Post({content,authorId:authorid});
    post.save((f,r)=>{
        if(f){
        console.log(f);
        return res.status(400).json(f);
        }
        else{
        console.log(r);
        return res.status(200).json(r);
        }
    })
}

exports.getAuthor = async (req,res)=>{


    Post.find({}).populate('authorId').populate('likes').then((e)=>{

        console.log(e);
        return res.status(200).json(e);
    }).catch((e)=>{
        console.log(e);
    })
}

exports.getAllPost = async (req,res)=>{

    console.log(req.body);

    const email = req.body.email;
    var localEmail = [];
    var finalEmail = [];

    localEmail = await Match.find({matchFrom:email});
    console.log(localEmail);
    var ans=[];


    for(var i = 0;i<localEmail.length;i++){
        var count = await  Match.count({matchFrom:localEmail[i].matchTo,matchTo:email})
        if(count){
        const d = await Profile.findOne({email:localEmail[i].matchTo});
        const result =await  Post.find({authorId:d._id},{},{sort:"-createdAt"}).populate("authorId");
        ans = ans.concat(result);
        }
    }


    var idx = mongoose.Types.ObjectId(req.body.authorid);
    const d = await  Post.find({authorId:idx},{},{sort:"-createdAt"}).populate("authorId");
    ans = ans.concat(d);
    console.log(ans);
    res.status(200).json(ans);
}

