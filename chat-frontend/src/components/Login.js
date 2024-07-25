import React,{useContext,useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import ChatContext from '../context/chats/Chatcontext'
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
const Login = () => {
    const context=useContext(ChatContext);
    const {lighttheme,login,setCredentials,credentials,Loading}=context;
    const temporarysave=(e)=>{
        e.preventDefault();
        setCredentials({...credentials,[e.target.name]:e.target.value});
    };
    //login api auth
    const HandleSubmit=async (e)=>{
      e.preventDefault();
      login();
     };
    return (
        <>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Loading}
    >
        <CircularProgress color="inherit" />
      </Backdrop>
        <div className={`main  ${lighttheme?'bg-slate-100' : 'bg-3F3D3D '} rounded-lg shadow-custom  h-[100vh] w-[100vw] sm:h-[90vh] sm:w-[90vw]  flex sm:flex flex-col sm:flex-row`}>
            <div className='logo  bg-slate-100 rounded-l-lg items-center justify-center flex flex-[0.6] '>
                <img src='https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/esp8fz265mj2mdltfvea'></img>
            </div>
            <div className='login flex-col flex-[0.4]   bg-slate-100 rounded-r-lg items-center justify-center'>

                <h1 className='text-2xl font-extrabold font-mono text-green-500'>Login to Continue</h1>
                <div className='flex flex-col mt-5 '>
                    <form className='flex flex-col mt-5 items-center' onSubmit={HandleSubmit}>
                        <input type='text' name='username' value={credentials.username} onChange={temporarysave} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Username' />
                        <input type='password' name='password' value={credentials.password} onChange={temporarysave} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Password' />
                        <span>Dont have a account? <NavLink to="/signup">signup</NavLink></span>
                        <button type='submit' className=' mt-3   border-2 font-semibold w-28 rounded-lg bg-green-500 p-3 text-white'>Login</button>
                    </form>
                </div>

            </div>
        </div>
        </>
    )
}

export default Login
