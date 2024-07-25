import React,{useContext,useEffect} from 'react'
import MessageList from './MessageList';
import ChatContext from '../context/chats/Chatcontext';

function MessageItems() {
  useEffect(() => {
    fetchAvailableChat();
  }, []);   

    //contextApi call for statemanagement
    const context=useContext(ChatContext);
    const {profile,chatids,fetchAvailableChat,ousers}=context;
    const mappedprofiles=[];
     profile.forEach((item,index)=>{
      if(item._id==chatids[index])
      {
        mappedprofiles.push({...item,chatId:chatids[index],status:"Groupchat",isGroup:true});
      }
      else{
        mappedprofiles.push({...item,chatId:chatids[index],status:"Recently",isGroup:false});
      }
     });
     console.log("mapped profiles:",mappedprofiles)
     console.log("onlinnnnn",ousers)
     ousers.forEach((item) => {
      if (mappedprofiles.some((user) =>( (user.isGroup===false) && (user._id === item.userid._id)))) {
        const matchedUser = mappedprofiles.find((user) => (  (user.isGroup===false) && (user._id === item.userid._id)));
        if (matchedUser) {
          matchedUser.status = 'online';
        }
      }
    });
    console.log(mappedprofiles);
  return (
    <div className='sm:flex sm:flex-grow sm:flex-col sm:flex-1'>
      {mappedprofiles.map(item=>{
        return <MessageList value={item} id={item.chatId} status={item.status} username={item.name} key={item.chatId}/>;
      })}
    </div>
  )
}

export default MessageItems
