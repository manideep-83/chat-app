import React,{useContext} from 'react'
import ChatContext from '../context/chats/Chatcontext'
import { NavLink } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
const Signup = () => {
    //const [Loading, setLoading] = useState(false);
    //let navigate=useNavigate();
    const context=useContext(ChatContext);
    const {lighttheme,credentials,setCredentials,signup,Loading}=context;
    //state to change the updating fields
   
    const temporarysave=(e)=>{
        e.preventDefault();
        setCredentials({...credentials,[e.target.name]:e.target.value});
    };
    //Handling submission
    const HandleSubmit=(e)=>{
        e.preventDefault();
        signup();
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

                <h1 className='text-2xl font-extrabold font-mono text-green-500'>Signup to LiveChat</h1>
                <div className='flex flex-col mt-5 '>
                    <form className='flex flex-col mt-5 items-center' onSubmit={HandleSubmit}>
                        <input type='text' name='username' onChange={temporarysave} value={credentials.username} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Username' />
                        <input type='email' name='email' onChange={temporarysave} value={credentials.email} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Email' />
                        <input type='password' name='password' onChange={temporarysave} value={credentials.password} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='Password' />
                        <input type='password' name='cpassword' onChange={temporarysave} value={credentials.cpassword} className='mb-3 w-96 h-12 border-b-2 border-b-slate-500 focus:outline-none pl-4' placeholder='confirm Password' />
                        <span>Already a user? <NavLink to="/">Login</NavLink></span>
                        <button type='submit' className=' mt-3   border-2 font-semibold w-28 rounded-lg bg-green-500 p-3 text-white'>Signup</button>
                    </form>
                </div>
            </div>
        </div>
        </>
  )
}

export default Signup
