import React,{useContext, useState} from 'react'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatContext from '../context/chats/Chatcontext';
import SendIcon from '@mui/icons-material/Send';
const GroupCreate = () => {
  const [msg,setMsg]=useState("")
  const context=useContext(ChatContext);
  const {lighttheme,fetchAvailableGroups,AvailGroups}=context;
  const temporarysave=(e)=>{
    e.preventDefault();
    let updatedmsg=e.target.value;
    setMsg(updatedmsg);
  };
  const HandleCreation=()=>{
    console.log("clicked");
  };
  return (
    <div className={` rounded-r-lg online-container border-none flex-col ${lighttheme?'bg-slate-100':'bg-3F3D3D text-white'} flex-1 sm:flex-[0.7]`}>
      <div className={`header flex  m-4 p-1 rounded-lg ${lighttheme?'bg-white shadow': 'bg-555454' } shadow-custom`}>
                <div className='ml-4'>
                    <IconButton className='text-3xl'>
                        <AccountCircleIcon fontSize='large' />
                    </IconButton>
                </div>
                <div className='flex flex-col ml-4 justify-center'>
                    <h1 className='text-xl font-bold'>Create a Group</h1>
                </div>
            </div>
            <div className={`online flex flex-col justify-center  m-4 p-1 rounded-lg flex-1 overflow-auto ${lighttheme?'bg-white': 'bg-555454  '} shadow-custom `}>
              <div className='chat-input flex bg-white  p-1 rounded-lg mt-auto shadow-custom ml-2 m-3 sm:m-4'>
                <input type='text' className='flex-grow focus:outline-none ml-5' placeholder='Enter the name of the group' value={msg} onChange={temporarysave}/>
                <IconButton>
                  <SendIcon fontSize='large' onClick={()=>HandleCreation()}/>
                </IconButton>
              </div>
            </div>
    </div>
  )
}

export default GroupCreate
