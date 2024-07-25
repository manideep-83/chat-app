import React,{useContext} from 'react'
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatContext from '../context/chats/Chatcontext'
import {motion} from 'framer-motion'
const Onusers = () => {
    const context=useContext(ChatContext);
    const {ousers,lighttheme}=context;
  return (
    <>
    <motion.div initial={{opacity: 0,scale: 0.8}} animate={{ opacity: 1,scale: 1}} exit={{ opacity: 0,scale: 0.8,}} transition={{ease:"easeInOut", duration:"0.7",}}  className={` rounded-r-lg online-container border-none flex-col ${lighttheme?'bg-slate-100':'bg-3F3D3D text-white'} flex-1 sm:flex-[0.7]`}>
            <div className={`header flex  m-4 p-1 rounded-lg ${lighttheme?'bg-white shadow': 'bg-555454' } shadow-custom`}>
                <div className='ml-4'>
                    <IconButton className='text-3xl'>
                        <AccountCircleIcon fontSize='large' />
                    </IconButton>
                </div>
                <div className='flex flex-col ml-4 justify-center'>
                    <h1 className='text-xl font-bold'>Online Users</h1>
                </div>
            </div>
            <div className={`online flex flex-col  m-4 p-1 rounded-lg flex-1 overflow-auto ${lighttheme?'bg-white': 'bg-555454  '} shadow-custom `}>
               
            {ousers.map(item=>{
        return (<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`flex items-center m-5 mr-7 ml-7 p-3  rounded-lg ${lighttheme ? 'shadow-custom' : 'shadow-custom'} `} >
            <div className={`m-2 flex justify-center items-center rounded-full border-2 bg-878787 border-black p-3 h-12 w-12 ${lighttheme?'':'bg-white text-black'} `}>
                <p className='m-0 text-lg font-extrabold text-white'>{item.userid.name[0].toUpperCase()}</p>
            </div>
            <div className='flex-grow flex flex-col ml-2'>
                <h1 className='text-lg font-semibold'>{item.userid.name}</h1>
                <p className=''>{"Click here to start texting"}</p>
            </div>
            <div className='ml-auto'>
                <p className='text-sm text-green-400'>{"Online"}</p>
            </div>
        </motion.div>);
      })}
            </div>
        </motion.div>
    </>
  )
}

export default Onusers
