const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();


app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());


fs.readdirSync('./routes').map((r)=> app.use("/api",require('./routes/' + r)));

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));







const port = process.env.PORT || 8000;
const server = app.listen(port,()=> console.log(`server is running ${port}`));

const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000",
  },
});

io.on("connection",(socket)=>{
  console.log('connected to socket.io');
  
  socket.on('setup', (id)=>{
    console.log("in setup")
    socket.join(id);
    socket.emit('connected');
  })
  socket.on('join chat', (room)=>{
    console.log("in room",room)
    socket.join(room);
    socket.emit('user joined room');
  })

  socket.on("new message",(newMessage)=>{
    var chat = newMessage.chat;
    console.log(chat)

    if(!chat.users) return console.log('chat.users not defined')

    chat.users.forEach(user => {
      console.log(user)
      if(user == newMessage.sender._id) return;

      socket.in(user).emit("message recieved",newMessage);
    });

  })


  socket.on('match',(data)=>{
    console.log("DATA",data);
    socket.emit('match-to',data);
  })
 
})


