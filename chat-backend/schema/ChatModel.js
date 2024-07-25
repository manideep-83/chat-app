const mongoose=require("mongoose");

const ChatSchema=mongoose.Schema({

    chatName:{type:String},
    isGroupChat:{type:Boolean},
    users:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
        }
    ],
    latestMessage:{
        type:mongoose.Types.ObjectId,
        ref:"Message"
    },
    Admin:{type:mongoose.Types.ObjectId,
        ref:"User"}
},{timestamps :true, timeZone: 'Asia/Kolkata'});

module.exports=mongoose.model('ChatModel',ChatSchema)