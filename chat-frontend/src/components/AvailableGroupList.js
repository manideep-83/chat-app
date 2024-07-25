import React,{useContext,useState} from 'react'
import {  motion } from "framer-motion"
import ChatContext from '../context/chats/Chatcontext';
import Alert from '@mui/material/Alert';

const AvailableGroupList = (props) => {
    const [alert,setAlert]=useState(false);
    const [alertType,setType]=useState(null);
    const [alertmsg,setmsg1]=useState("");
    const context=useContext(ChatContext);
    const {lighttheme,AddToGroup,fetchAvailableChat}=context;
    const group=props.value;
    const Handleclick=async ()=>{
        const user=localStorage.getItem('userdetails');
        const parseduser=JSON.parse(user);
        console.log("user",parseduser._id)
        console.log("clicked group",group._id)
        let msg=await AddToGroup(parseduser._id,group._id);
        if(msg=="User added successfully.")
        {
            fetchAvailableChat()
            setAlert(true);
            setType("success");
            setmsg1(msg);
        }
        else{
            
            setAlert(true);
            setType("error");
            setmsg1("you are already a part of the group");
        }
        setTimeout(() => {
            setAlert(false);
            setType(null);
            setmsg1('');
          }, 5000);
        
    };
    //console.log("group",group);
    return (
        <>
        {alert && <Alert severity={alertType} className=''>{alertmsg}</Alert>}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`flex items-center m-5 mr-7 ml-7 p-3  rounded-lg ${lighttheme ? 'shadow-custom' : 'shadow-custom'} `}   onClick={Handleclick} >
            <div className=' ml-3 m-1 flex bg-878787 justify-center items-center rounded-full border-2 border- p-3 h-12 w-12'>
                <p className='m-0 text-lg font-extrabold text-white'>{group.chatName[0].toUpperCase()}</p>
            </div>
            <div className='flex-grow flex flex-col ml-3'>
                <h1 className='text-lg font-semibold'>{group.chatName}</h1>
                <p className='text-gray-500'>{"click to get Added to the group"}</p>
            </div>
            <div className={` hidden sm:flex ml-auto `}>
                <p className='text-sm text-gray-400'>{group.Admin}</p>
            </div>
        </motion.div>
        </>
  )
}

export default AvailableGroupList
