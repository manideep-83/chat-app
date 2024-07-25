const express=require('express');
const router=express.Router();
// const User=require('../schema/userModel');
const Chat=require('../schema/ChatModel' );
// const Message=require('../schema/messageModel')
const fetchuser = require('../middlewear/fetchuser');
//fetchuserAvailableChats
router.get('/fetchChats',fetchuser,async (req,res)=>{
    let profileids=[];
    let chatids=[];
    const id=req.id;
    console.log(id);
    console.log(id);
    const chats=await Chat.find( {users:{$in:[id]}}).sort({updatedAt:-1})
    .populate('users','name email');
    console.log(chats);
    chats.forEach(chat => {
        if(chat.isGroupChat)
        {
            let groupdetails={_id:chat._id,name:chat.chatName};
            profileids.push(groupdetails);
        }
        else{
            chat.users.forEach(user => {
                console.log(user._id);
                if (user._id.toString() !== req.id) {
                    profileids.push(user);
                }
            });
        }
        chatids.push(chat._id);
    });
    res.json({chatid:chatids,profile:profileids});
});

//createChat one to one
router.post('/createChat/:id',fetchuser,async (req,res)=>{
    const id=req.id;
    const otherid=req.params.id;
    let chat=await Chat.findOne({isGroupChat:false, users:{ $all: [id, otherid] }});
    if(!chat)
    {
        chat=await Chat.create({
            chatName: 'Personal Chat',
            isGroupChat: false,
            users: [id, otherid],
        });
    }
    res.json({Chat:chat});
});



//Create Groups
router.post('/createGroup',fetchuser,async (req,res)=>{
    const id=req.id;
    console.log(id);
    const {name}=req.body;
    console.log(name);
    if(!name ){
        return res.status(400).json({error:"Select valid name or number of ids to create a group chat"});
    }
    const usersGroup=[id];
    const group=await Chat.create({
        chatName:name,
        isGroupChat:true,
        users:usersGroup,
        Admin:id
    });
     res.json({Group:group});
});
//Acess Group
router.get('/acessGroup/:id',fetchuser,async (req,res)=>{
    const userid=req.id;
    const groupid=req.params.id;
    let check=await Chat.findById(groupid)
    .populate('users', 'name email')
    .populate('latestMessage')
    .populate('Admin', 'name email');
    console.log(check);
    res.json({group:check});
});
//Exit Group
router.post('/exit/:id',fetchuser,async (req,res)=>{
    const userid=req.id;
    const groupid=req.params.id;
    let check=await Chat.findById(groupid)
    check.users=await check.users.filter(temp=>temp._id.toString()!==userid);
    if (check.users.length === 0) {
        await check.remove();
    } else {
        await check.save();
    }
    res.json({group:check});
});

//Add a member to group
router.post('/Addmember/:groupid',fetchuser,async (req,res)=>{
    const id=req.id;
    const {groupid}=req.params;
    let check=await Chat.findById(groupid);
    if(!check)
    {
        return res.status(400).json({error:"group not exist"});
    }
    if(check.users.includes(id))
        {
            return res.status(400).json({error:"Member already exists"});
        }
    check.users.push(id);
    await check.save();
    res.json({message:check});
});

//fetch Available groups
router.get('/getallGroups',fetchuser,async (req,res)=>{
   const userid=req.id;
   const group=await Chat.find({isGroupChat:true});
   res.json({groups:group}); 
});


module.exports=router;