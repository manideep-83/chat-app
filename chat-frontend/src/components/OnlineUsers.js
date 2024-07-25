import React,{useContext,useEffect} from 'react'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatContext from '../context/chats/Chatcontext';
import { AnimatePresence, easeIn, motion } from "framer-motion"
import AvailUsersList from './AvailUsersList';
const OnlineUsers = () => {
    
    useEffect(() => {
        fetchAvailableUsers();
    }, []);

    const context=useContext(ChatContext);
    const {lighttheme,fetchAvailableUsers,AvailableUsers,ousers}=context;
    console.log("Availabale:::",AvailableUsers);
    console.log("onusers",ousers);
    ousers.forEach((item)=>{
        if(AvailableUsers.some((user)=>user._id===item.userid._id))
        {
            const matchedUser=AvailableUsers.find((user)=>user._id===item.userid._id);
            if(matchedUser)
            {
                
                matchedUser.status="online";
            }
        }
    })
    return (
        <AnimatePresence>
        <motion.div initial={{opacity: 0,scale: 0.8}} animate={{ opacity: 1,scale: 1}} exit={{ opacity: 0,scale: 0.8,}} transition={{ease:"easeInOut", duration:"0.7",}}  className={` rounded-r-lg online-container border-none flex-col ${lighttheme?'bg-slate-100':'bg-3F3D3D text-white'} flex-1 sm:flex-[0.7]`}>
            <div className={`header flex  m-4 p-1 rounded-lg ${lighttheme?'bg-white shadow': 'bg-555454' } shadow-custom`}>
                <div className='ml-4'>
                    <IconButton className='text-3xl'>
                        <AccountCircleIcon fontSize='large' />
                    </IconButton>
                </div>
                <div className='flex flex-col ml-4 justify-center'>
                    <h1 className='text-xl font-bold'>Available Users</h1>
                </div>
            </div>
            <div className={`online flex flex-col  m-4 p-1 rounded-lg flex-1 overflow-auto ${lighttheme?'bg-white': 'bg-555454  '} shadow-custom `}>
               
                {AvailableUsers.map((val) => {
                    return <AvailUsersList key={val._id} id={val._id} status={val.status} value={val} theme={lighttheme} />
                })}
            </div>
        </motion.div>
        </AnimatePresence>
    )
}

export default OnlineUsers
