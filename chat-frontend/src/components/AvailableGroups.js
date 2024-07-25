import React,{useContext,useEffect} from 'react'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatContext from '../context/chats/Chatcontext';
import { AnimatePresence, easeIn, motion } from "framer-motion"
import AvailUsersList from './AvailUsersList';
import AvailableGroupList from './AvailableGroupList';
const AvailableGroups = () => {
    useEffect(() => {
        fetchAvailableGroups();
    }, []);
    const context=useContext(ChatContext);
    const {lighttheme,fetchAvailableGroups,AvailGroups}=context;
   // console.log("here",AvailGroups);
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
                    <h1 className='text-xl font-bold'>Available Groups</h1>
                </div>
            </div>
            <div className={`online flex flex-col  m-4 p-1 rounded-lg flex-1 overflow-auto ${lighttheme?'bg-white': 'bg-555454  '} shadow-custom `}>
                    {
                     AvailGroups.map((item,ind)=>{return <AvailableGroupList key={ind} value={item}/>})
                    
                    }
            </div>
        </motion.div>
        </AnimatePresence>
    )
}



export default AvailableGroups
