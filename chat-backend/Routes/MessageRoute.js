const express=require("express");
const router=express.Router();
const Chat=require('../schema/ChatModel');
const Message=require('../schema/messageModel');
const fetchuser = require("../middlewear/fetchuser");
//acess messages
router.post('/acessmessages/:chatid',fetchuser,async (req,res)=>{
    const senderid=req.id;
    const recieverChatid=req.params.chatid;
    //console.log(recieverChatid);
    let messages=await Message.find({chat: recieverChatid})
                    .populate('chat.users','name email')
                    .populate('sender','name email')
                    .populate('reciever','name email')
                    .populate('chat');
    
    res.json({sucess:messages,Loginuserid:req.id});

});
//send a message
router.post('/sendmessage/:chatid',fetchuser,async (req,res)=>{
    const userid=req.id;
    const chat_id=req.params.chatid;
    console.log("id",chat_id)
    const {content}=req.body;
    let chat=await Chat.findById(chat_id);
    let rid;    
    chat.users.forEach(recieverid=>{
        if(recieverid!=userid)
        {
            rid=recieverid;
        }
    });
    if (!content) {
        return res.status(400).json({ success: false, message: 'Message content cannot be empty' });
      }
      
    const creation={
        sender:userid,
        reciever: chat.isGroupChat?chat_id : rid,
        content:content,
        chat:chat_id
    };
    let message= await Message.create(creation)
    message = await message.populate('sender', 'name email');
    message = await message.populate('reciever', 'name email');
    message = await message.populate('chat');
    let CChat=await Chat.findByIdAndUpdate(chat_id, { latestMessage: message });
    res.json({ message:message });
});

module.exports=router;