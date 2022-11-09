const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/user");


const sendMessage = asyncHandler( async (req,res)=>{

    console.log(req.body);
    const { content,chatId,email } = req.body;
    // we need the logged in user (from middleware)
    var currUser= await User.findOne({email});
    if(!content || !chatId){

        return res.sendStatus(400);
    }
    var newMessage = {
        sender: currUser,
        content: content,
        chat: chatId,
    }
    try{
        var message =  await Message.create(newMessage);
        message = await message.populate("sender","-password")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path:'chat.user',
            select:"-password"
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        }) //find chat and update its latestMessage to this current message

        res.json(message);
    }catch(err){   
        res.status(400)
        throw new Error(err.message);
     }
})

const allMessages = asyncHandler(async (req,res)=>{

    console.log(req.body);
    try{
        const messages = await Message.find({
            chat: req.params.chatId
        }).populate("sender","-password")

        res.json(messages);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

module.exports={sendMessage,allMessages}