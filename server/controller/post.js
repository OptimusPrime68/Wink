
const Post= require('../models/post')
const Profile = require('../models/profile');
const Match= require('../models/match')
var mongoose = require('mongoose');


// FUNCTION TO CREATE POST
exports.makePost=(req,res)=>{

    const {content,authorid} = req.body;
    //console.log(content,authorid);

    const post = new Post({content,authorId:authorid});
    post.save((f,r)=>{
        if(f){
       // console.log(f);
        return res.status(400).json(f);
        }
        else{
       // console.log(r);
        return res.status(200).json(r);
        }
    })
}

// FUNCTION TO GET AUTHOR OF POST
exports.getAuthor = async (req,res)=>{


    Post.find({}).populate('authorId').populate('likes').then((e)=>{

      //  console.log(e);
        return res.status(200).json(e);
    }).catch((e)=>{
       // console.log(e);
    })
}

// FUNCTION TO GET ALL POST ALONG WITH PROFILE DETAILS
exports.getAllPost = async (req,res)=>{

   // console.log(req.body);

    const email = req.body.email;
    var localEmail = [];
    var finalEmail = [];

    localEmail = await Match.find({matchFrom:email},{},{sort:"-createdAt"});
  //  console.log(localEmail);
    var ans=[];


    for(var i = 0;i<localEmail.length;i++){
        var count = await  Match.count({matchFrom:localEmail[i].matchTo,matchTo:email})
        if(count){
        const d = await Profile.findOne({email:localEmail[i].matchTo});
        const result =await  Post.find({authorId:d._id},{},{sort:"-createdAt"}).populate("likes").populate("authorId");
        ans = ans.concat(result);
        }
    }


    var idx = mongoose.Types.ObjectId(req.body.authorid);
    const d = await  Post.find({authorId:idx},{},{sort:"-createdAt"}).populate("likes").populate("authorId");
    ans = ans.concat(d);
   // console.log(ans);
    res.status(200).json(ans);
}


exports.deletePost = async (req,res)=>{
    const id = req.body.postId;

   // console.log(id);
    try{
    const a =await Post.deleteOne({_id:mongoose.Types.ObjectId(id)});
    res.status(200).json({message:a});
    }
    catch(err){
    res.status(400).json({message:err});
    }
       
   
}

exports.updateLike = async(req,res)=>{

    const {user,post} = req.body;

    const cnt = await Post.find({_id:mongoose.Types.ObjectId(post),likes:{$in:[user]}}).count();

    if(cnt == 0)
    {
        try{
        await Post.findOneAndUpdate({_id:mongoose.Types.ObjectId(post)},{$push:{likes:user}});
        }catch(err){
           res.status(400).json({message:err.message});
        }
    }
    else{


        try{
            await Post.findOneAndUpdate({_id:mongoose.Types.ObjectId(post)},{$pull:{likes:{$in:[user]}}});
            }catch(err){
                res.status(400).json({message:err.message});
            }

    }

    res.status(200).json({message:"success"});


}

exports.getPostById = async (req,res)=>{

    const ans = await Post.find({_id:mongoose.Types.ObjectId(req.body.newPost)}).populate("authorId").populate("likes");
    res.status(200).json(ans);
}