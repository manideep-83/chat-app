import React,{useContext} from 'react'
import ChatContext from '../context/chats/Chatcontext'
const FirstWelcome = () => {
  const context=useContext(ChatContext);
  const {lighttheme}=context;
  return (
    <div className={`welcome flex items-center justify-center flex-col flex-wrap rounded-r-lg ${lighttheme?'bg-slate-100':'bg-3F3D3D'}`} >
        <img src='https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/esp8fz265mj2mdltfvea' className='rounded-lg' style={{ filter: 'drop-shadow(5px 7px 5px white )' }}></img>
    </div>
  )
}

export default FirstWelcome
