import React,{useContext, useEffect,useState,useRef} from 'react'
import ChatContext from '../context/chats/Chatcontext';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Recievedmsg from './Recievedmsg';
import Sentmsg from './Sentmsg';
import { CircularProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
function Workarea() {
  const context=useContext(ChatContext);
  const {rendermessage,lighttheme,message,loginid,sendmsg}=context;
  const [Loading,setLoading]=useState(false);
  const parameter=useParams();
  const chatAreaRef = useRef(null);
  useEffect(()=>{
    const fetchMessages = async () => {
      setLoading(true);
      await rendermessage(parameter.id);
      console.log("rendered messages");
      setLoading(false);
    };
    fetchMessages();
  },[parameter.id]);
  let uname=parameter.username;
  useEffect(() => {
    // Scroll to the bottom of the chat area whenever message updates
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [message]);

  console.log("messages",message)



  const [msg,setMsg]=useState("");
  const temporarysave=(e)=>{
    e.preventDefault();
    let updatedmsg=e.target.value;
    setMsg(updatedmsg);
  };
  const Handlemessage=()=>{
   // console.log("sending message");
    const pid=parameter.id;
   // console.log(msg);
    sendmsg(msg,pid);
    setMsg("");
  };
  return (
    <AnimatePresence>
    <motion.div initial={{opacity: 0,scale: 0.8}} animate={{ opacity: 1,scale: 1}} exit={{ opacity: 0,scale: 0.8,}} transition={{ease:"easeInOut", duration:"0.7",}} className={`work-container flex flex-col rounded-e-lg ${lighttheme?'bg-slate-100':'bg-3F3D3D'}   flex-1  sm:flex-[0.7]`} >
      <div className={`chat-header flex   p-1 rounded-lg shadow-custom  ${lighttheme?'bg-white':'bg-5D5B5B text-white'}   ml-2 m-3 sm:m-4'`}>
        <div className='ml-4'>
          <IconButton className='text-3xl'>
            <AccountCircleIcon fontSize='large' />
          </IconButton>
        </div>
        <div className='flex flex-col  ml-1 sm:ml-4'>
          <h1 className='text-lg font-semibold'>{uname}</h1>
          <p>Last seen a long ago</p>
        </div>
        <div className='ml-auto mr-4 '>
          <IconButton>
            <DeleteIcon fontSize='large'/>
          </IconButton>
        </div>
      </div>
      
        <div ref={chatAreaRef} className={`chat-message flex flex-col   p-1 rounded-lg flex-1 overflow-auto  shadow-custom ${lighttheme?'bg-white':'bg-5D5B5B'}  ml-2 m-3 sm:m-4'`}>
          
        {Loading && (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          
            {message.map(item=>{
              //console.log("first msg:",item);
              if(loginid==item.sender._id)
              {
               // console.log("Sending messagee");
                return <Sentmsg  message={item.content}/>
              }
              else{
               // console.log("Recieving message");
                return <Recievedmsg name={item.sender.name[0]} fname={item.sender.name} message={item.content} />
              }
            })
            
          }

      </div>
      <div className='chat-input flex bg-white  p-1 rounded-lg mt-auto shadow-custom ml-2 m-3 sm:m-4'>
        <input type='text' className='flex-grow focus:outline-none ml-5' placeholder='Enter a new message' value={msg} onChange={temporarysave}/>
        <IconButton>
          <SendIcon fontSize='large' onClick={()=>Handlemessage()}/>
        </IconButton>
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default Workarea
