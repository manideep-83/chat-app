import React,{useContext,useEffect} from 'react'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatContext from '../context/chats/Chatcontext';
import { AnimatePresence, easeIn, motion } from "framer-motion"
import MessageList from './MessageList';
const Friends = () => {

    const context=useContext(ChatContext);
    useEffect(() => {
        fetchAvailableChat();
      }, []);

      const {profile,chatids,fetchAvailableChat,ousers,lighttheme}=context;
      const mappedprofiles=[];
    profile.map((item,index)=>(
      mappedprofiles.push({...item,chatId:chatids[index],status:"Recently"})
     ));  
     console.log("onlinnnnn",ousers)
     ousers.forEach((item) => {
      if (mappedprofiles.some((user) => user._id === item.userid._id)) {
        const matchedUser = mappedprofiles.find((user) => user._id === item.userid._id);
        if (matchedUser) {
          matchedUser.status = 'online';
        }
      }
    });
    console.log(mappedprofiles);
      return (
    <AnimatePresence>
        <motion.div initial={{opacity: 0,scale: 0.8}} animate={{ opacity: 1,scale: 1}} exit={{ opacity: 0,scale: 0.8,}} transition={{ease:"easeInOut", duration:"0.7",}}  className={` rounded-r-lg online-container border-none flex-col ${lighttheme?'bg-slate-100 text-black':'bg-3F3D3D text-white'} flex-1 sm:flex-[0.7]`}>
            <div className={`header flex  m-4 p-1 rounded-lg ${lighttheme?'bg-white shadow': 'bg-555454' } shadow-custom`}>
                <div className='ml-4'>
                    <IconButton className='text-3xl'>
                        <AccountCircleIcon fontSize='large' />
                    </IconButton>
                </div>
                <div className='flex flex-col ml-4 justify-center'>
                    <h1 className='text-xl font-bold'>Available Friends </h1>
                </div>
            </div>
            <div className={`online flex flex-col  m-4 p-1 rounded-lg flex-1 overflow-auto ${lighttheme?'bg-white': 'bg-555454  '} shadow-custom `}>
                    {mappedprofiles.map(item=>{
                           return <MessageList value={item} id={item.chatId} status={item.status} username={item.name} key={item.chatId}/>;
                     })}
            </div>
        </motion.div>
        </AnimatePresence>
  )
}

export default Friends
