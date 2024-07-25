const mongoose=require("mongoose")
const messageModel=mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    reciever:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    chat:{
        type:mongoose.Types.ObjectId,
        ref:"ChatModel"
    },
    content: {
        type: String,
        required: true
      }
},{timestamps :true, timeZone: 'Asia/Kolkata'});
module.exports=mongoose.model("Message",messageModel);