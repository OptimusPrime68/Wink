const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/user")
const Profile = require("../models/profile")



//TODO
//* Change User to profile for id




// create new chat or open existing
// start on its a match
const accessChat = asyncHandler(async (req, res) => {

  console.log(req.headers);


 // create chat with the userID provided
  const {fromemail,toemail} = req.body;
  // console.log(fromemail,toemail)
  var curruser= await User.findOne({email:fromemail});
  var userid  = await User.findOne({email:toemail});
  curruser=curruser._id.toString();
  userid=userid._id.toString();
  console.log("accessing chats-->")
  console.log(fromemail,curruser);
  console.log(toemail,userid);

  // console.log(req.headers.userid,req.headers.curruser)
  if (!userid) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: curruser } } }, // current user from bearer token
      { users: { $elemMatch: { $eq: userid } } },
    ],
  })
    .populate("users","-password")
    .populate("latestMessage");
    // console.log(isChat);

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "-password",
  });
  // console.log(isChat)
  if (isChat.length > 0) {
    console.log("chat exits")
    res.send(isChat[0]);
  } else {
    var ChatData = {
      chatName: "sender",
      users: [curruser, userid],
    };
    try {
      
      const createdChat = await Chat.create(ChatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate(
        "users",
        "-password"
      );
      // console.log(fullChat)
      res.status(200).send(fullChat);
    } catch (err) {
      res.send(400);
      throw new Error(err.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  console.log(req.headers);
    console.log("in fetchChats")
    const {email} = req.body;
    console.log(email)
    var userId= await User.findOne({email});
    userId=userId._id.toString();
    console.log(userId)
  try {
    // console.log("in fetch Chats---->")
    Chat.find({ users: { $elemMatch: { $eq: userId } } }) //check if user is signed in or not
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "-password",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    // console.log(req.user._id,"    ------>inFetchAll")
    throw new Error(err.message);
  }
});



module.exports = {
  accessChat,
  fetchChats
};
