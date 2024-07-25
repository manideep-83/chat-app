const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});
let onlineusers = []
io.on("connection", (socket) => {
    console.log("new Socket connection with id:", socket.id);
    socket.on("AddUserOnline", (userId) => {
        console.log("Received userId:", userId);
        // Check if the user with userId is already in onlineusers
        const userExists = onlineusers.some((user) => user.userid._id === userId._id);
        if (!userExists) {
            onlineusers.push({
                userid: userId,
                socketId: socket.id,
            });
            console.log("User added:", userId);
            console.log("Online users after addition:", onlineusers);
            onlineusers=onlineusers.filter((user)=> user.userid!="");
            io.emit("getonlineusers", onlineusers);
        }

    });
    //message trigger
    socket.on('sendMsg', (data) => {
        console.log("Received message:", data.content);
        console.log("ID:", data.receiverChatId);  
        console.log("reciever id:",data.recieverId);
        if(data.isGC)
        {
            io.emit("getmessage",data.receiverChatId);
        }
        else{
            const user=onlineusers.find((user=>user.userid._id===data.recieverId));
            if(user)
                {
                    console.log("user exists");
                    io.to(user.socketId).emit("getmessage",data.receiverChatId);
                }  
        }
    });
    socket.on("disconnect", () => {
        // Remove the disconnected user from onlineusers
        onlineusers = onlineusers.filter((user) => user.socketId !== socket.id);
        io.emit("getonlineusers",onlineusers);
        console.log("User disconnected:", socket.id);
        console.log("Online users after removal:", onlineusers);
    });
    console.log("onlinusers:", onlineusers);
});

httpServer.listen(4000);