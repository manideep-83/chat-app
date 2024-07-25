import React,{useContext} from 'react'
import {motion} from 'framer-motion'
import { NavLink } from 'react-router-dom';
import ChatContext from '../context/chats/Chatcontext';
export default function MessageList(props) {
    const context=useContext(ChatContext);
    const {lighttheme}=context;
    const { name} = props.value;
   
    const HandleClick=()=>{
        console.log("opening message")

        //chatcreation

    }
    return (
        <NavLink to={`/main/chat/${props.username}/${props.id}`}>
        <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.98}} className={`flex  rounded-2xl items-center m-3 p-3 border-b border-gray-400 hover:bg-white hover:text-black cursor-pointer flex-grow ` } onClick={HandleClick} >
            <div className={`m-2 flex justify-center items-center rounded-full border-2 bg-878787 border-black p-3 h-12 w-12  `}>
                <p className='m-0 text-lg font-extrabold text-white'>{name[0].toUpperCase()}</p>
            </div>
            <div className='flex-grow flex flex-col ml-2'>
                <h1 className='text-lg font-semibold'>{name}</h1>
                <p className=''>{"Click here to start texting"}</p>
            </div>
            <div className='ml-auto'>
                {props.status==="online"?(<p className='text-sm text-green-400 font-semibold' >{props.status}</p>):(<p className='text-sm text-gray-400'>{props.status}</p>)}
                
            </div>
        </motion.div>
        </NavLink>
    )
}
