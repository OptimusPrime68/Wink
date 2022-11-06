const Post= require('../models/post')
const Profie = require('../models/profile');
// profile 6363cfa66b9c72a61f76c99d 6363d0b06b9c72a61f77ebd2 6363d1546b9c72a61f789b67 
// name   Katrina Kirti Sirin Kajal
exports.makePost=(req,res)=>{

    const {content,authorid} = req.headers;
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

