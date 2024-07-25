import React,{useContext} from 'react'
import Sidebar from './Sidebar'
import Workarea from './Workarea'
import FirstWelcome from './FirstWelcome'
import OnlineUsers from './OnlineUsers'
import {Route,Routes } from 'react-router-dom'
import GroupCreate from './GroupCreate'
import AvailableGroups from './AvailableGroups'
import ChatContext from '../context/chats/Chatcontext'
import Onusers from './Onusers'
import Friends from './Friends'
function MainArea() {
  //<Workarea />
  //<FirstWelcome />
  const context=useContext(ChatContext);
  const {lighttheme}=context;
  return (
    <div className={`main flex ${lighttheme?'bg-slate-100' : 'bg-3F3D3D '} rounded-lg shadow-custom  h-[100vh] w-[100vw] sm:h-[90vh] sm:w-[90vw] `}>
      <Sidebar />
      <Routes>
        <Route path='/' element={<FirstWelcome />} />
          <Route path='/friends' element={< Friends />} />
         <Route path='/chat/:username/:id' element={<Workarea />}/>
         <Route path='/onlineUsers' element={<OnlineUsers />}/>
         <Route path='/CreateGroup' element={<GroupCreate />}/>
         <Route path='/availableGroups' element={<AvailableGroups />}/>
      </Routes>
  
    </div>
  )
}

export default MainArea
