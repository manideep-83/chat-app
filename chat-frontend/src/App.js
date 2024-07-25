import { useContext } from 'react';
import Login from './components/Login';
import './App.css';
import ChatContext from './context/chats/Chatcontext';
import MainArea from './components/MainArea';

import { Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
function App() {
  // <Login />
  //<MainArea />
  const context=useContext(ChatContext);
  const {lighttheme}=context;
  //console.log("lighttheme in app",lighttheme)

  return (
    <div className={`App ${lighttheme?'bg-dddedd':'bg-383636'}`}>
    
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/main/*' element={(!localStorage.getItem('token'))?<Login />:<MainArea />}/>
          </Routes>     
      
    </div>
  );
}

export default App;
