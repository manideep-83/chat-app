import React, {useContext} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MessageItems from './MessageItems';
import { NavLink } from 'react-router-dom';
import ChatContext from '../context/chats/Chatcontext';
import LightModeIcon from '@mui/icons-material/LightMode';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
function Sidebar() {
    const context=useContext(ChatContext);
    let {lighttheme,setTheme}=context;
    //console.log(lighttheme);
    const ChangeTheme=()=>{ 
        setTheme(!lighttheme);
    }
    const colorchange={
        color: lighttheme?'':'white'
    };
    const handlelogout=()=>{
        localStorage.clear();
    };
    //console.log("color:",colorchange)
    return (
        <div className={`side-container flex flex-col rounded-l-lg ${lighttheme ? 'bg-slate-100' : 'bg-3F3D3D '} flex-0 md:flex-[0.3] w-min md:w-0 `}>
            <div className={`flex justify-between  rounded-lg  p-1   ${lighttheme? 'bg-white shadow-custom': 'bg-5D5B5B shadow-customWhite'} flex-col flex-grow md:flex-row   m-3 md:m-4   md:flex-grow-0  `}>
                <div className='ml-2'>
                    <IconButton >
                        <AccountCircleIcon style={colorchange} fontSize='large' />
                    </IconButton>
                </div>
                <div className='p-1 sm:pr-3 flex-col sm:flex-row'>
                <NavLink to="/main/friends" className={' flex sm:hidden'}>
                   <IconButton >
                        <ChatIcon style={colorchange} fontSize='large' />
                    </IconButton>
                    </NavLink>
                    <NavLink to="/main/onlineUsers">
                    <IconButton  >
                        <PersonIcon style={colorchange} fontSize='large' />
                    </IconButton>
                    </NavLink>
                    <NavLink to="/main/availableGroups">
                   <IconButton >
                        <PeopleAltIcon style={colorchange} fontSize='large' />
                    </IconButton>
                    </NavLink>
                    <NavLink to="/main/CreateGroup">
                    <IconButton>
                        <AddCircleIcon style={colorchange} fontSize='large' />
                    </IconButton>
                    </NavLink>
                    <IconButton onClick={ChangeTheme}>
                        {lighttheme? <DarkModeIcon style={colorchange} fontSize='large' /> : <LightModeIcon style={colorchange} fontSize='large'/>}
                    </IconButton>
                    <NavLink to="/" >
                    <IconButton  onClick={handlelogout}>
                        <LogoutIcon style={colorchange} fontSize='large'/>
                    </IconButton>
                    </NavLink>
                </div>
            </div>
            <div className={`s-mid m-4 mt-2 rounded-lg pl-3 flex items-center ${lighttheme? 'bg-white': 'bg-555454'} shadow-custom hidden md:flex `}>
                <IconButton>
                    <SearchIcon style={colorchange} fontSize='large'/>
                </IconButton>
                <input className={`h-10 flex-grow px-3 border-none focus:outline-none text-lg ${lighttheme? 'bg-white': 'bg-555454'}`}  placeholder='search'/>
            </div>

            <div className={`m-4 overflow-auto rounded-3xl ${lighttheme? 'bg-white': 'bg-555454 text-white'} shadow-custom hidden md:flex md:flex-grow`}>
                <MessageItems />
            </div>
        </div>
    )
}

export default Sidebar
