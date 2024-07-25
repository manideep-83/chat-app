import React,{useContext} from 'react'
import {  motion } from "framer-motion"
import { Scale } from '@mui/icons-material';
import ChatContext from '../context/chats/Chatcontext';
const AvailUsersList = (props) => {
    const context=useContext(ChatContext);
    const {createchat}=context;
    const user = props.value;
    const lighttheme=props.theme;
    const HandleRender=(key)=>{
        createchat(key);
    };
    return (
        <>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`flex items-center m-5 mr-7 ml-7 p-3  rounded-lg ${lighttheme ? 'shadow-custom' : 'shadow-custom'} `} onClick={()=>HandleRender(props.id)}>
            <div className=' ml-3 m-1 flex bg-878787 justify-center items-center rounded-full border-2 border- p-3 h-12 w-12'>
                <p className='m-0 text-lg font-extrabold text-white'>{user.name[0].toUpperCase()}</p>
            </div>
            <div className='flex-grow flex flex-col ml-3'>
                <h1 className='text-lg font-semibold'>{user.name}</h1>
                <p className='text-gray-500 hidden sm:flex'>{"click to add as Friend for texting"}</p>
                <p className='text-gray-500 flex sm:hidden'>{"Add Friend"}</p>
            </div>
            <div>
                {user.status==="online"?(<p className='text-sm text-green-400 font-semibold'>{user.status}</p>):(<p className='text-sm text-gray-400'>{user.status}</p>)}
                
            </div>
        </motion.div>
        </>
    )
}

export default AvailUsersList
