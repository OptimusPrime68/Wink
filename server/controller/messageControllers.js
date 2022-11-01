const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const sendMessage = asyncHandler( async (req,res)=>{

    const { content,chatId } = req.body;

    if(!content || !chatId){

        return res.sendStatus(400);
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }
    try{
        var message =  await Message.create(newMessage);
        message = await message.populate("sender","name picture")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path:'chat.user',
            select:"name picture email"
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        })

        res.json(message);
    }catch(err){   
        res.status(400)
        throw new Error(err.message);
     }
})

const allMessages = asyncHandler(async (req,res)=>{
    try{
        const messages = await Message.find({
            chat: req.params.chatId
        }).populate("sender","name picture email")

        res.json(messages);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

module.exports={sendMessage,allMessages}