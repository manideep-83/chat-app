import { io } from "socket.io-client";
import ChatContext from "./Chatcontext";
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const ChatState=(props)=>{
    //states
    const [Loading, setLoading] = useState(false);
    const [lighttheme,setTheme]=useState(true);
    const [AvailableUsers,setAvailableUsers]=useState([]);
    const [user,SetUser]=useState("");
    const [ousers,setOusers]=useState([])
     //render messages of specific chat
     const [message,setMessage]=useState([])
     const [loginid,setid]=useState("");
    const host="http://localhost:5000";
    //console.log(ousers);
    //console.log("reloading:",user)
   // getting loggedin user even after reload
    useEffect(() => {
      const storedUser = localStorage.getItem('userdetails');
      if (storedUser) {
        SetUser(JSON.parse(storedUser));
      }
    }, []);
    
    
    
    //intial socket connection
    const [socket,setSocket]=useState(null);
    useEffect(()=>{
      const newSocket=io("http://localhost:4000/")
      setSocket(newSocket);
      return (()=>newSocket.disconnect())
    },[user]);
    //socket to add onlineusers connected to socket
    useEffect(()=>{
      if(socket===null) return;
      socket.emit("AddUserOnline",user);
      socket.on("getonlineusers",(res)=>{
        setOusers(res);
      });
      return ()=>{
        socket.off("getonlineusers");
      }
    },[socket]);

  //recieve msg
  useEffect(()=>{
    if(socket==null)  return;
    socket.on("getmessage",(res)=>{
      console.log("response chatid:",res);
      rendermessage(res)
    });
    return () => socket.off("getmessage");
  },[socket])


    //login
    const initial={username:"",email:"",password:"",cpassword:""}
    const [credentials,setCredentials]=useState(initial);
    let navigate=useNavigate();
    const login=async()=>{
      setLoading(true);
      const response = await fetch(`http://localhost:5000/auth/validateUser/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: credentials.username,password: credentials.password}),
      });
      const json=await response.json();
      if(json.sucess)
        {
          localStorage.setItem('token',json.authToken);
          setLoading(false);
          setCredentials(initial);
          navigate("/main/");
          let userd=await fetchuserid();
          //console.log(userd[0]);
          localStorage.setItem('userdetails',JSON.stringify(userd));
          SetUser(userd);
        }
        else{
            setLoading(false);
            setCredentials({...credentials,password:""});
        }
    };
    //fetch userid for socket connections
    const fetchuserid=async ()=>{
      const response1 = await fetch(`http://localhost:5000/auth/validateUser/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-token":localStorage.getItem('token')
        },
        //body: JSON.stringify({username: credentials.username,password: credentials.password}),
      });
      let userdetails=await response1.json();
      // let userd=[userdetails.sucess._id,userdetails.sucess.name]
      return userdetails.sucess;
    };

    //Signup api
    const signup=async ()=>{
      setLoading(true);
        if(credentials.password===credentials.cpassword)
            {
              const response = await fetch(`http://localhost:5000/auth/Validateuser/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({username:credentials.username,email: credentials.email ,password:credentials.password}),
              });
              const json=await response.json();
              console.log(json);
              if(json.sucess)
                {
                    setLoading(false);
                    setCredentials(initial);
                    navigate("/");
                }
            }
            else{
            //  setError(true);
            setLoading(false);
            setCredentials({ ...credentials, password: "", cpassword: "" });
            }
    };
    //fetch Available users
    const fetchAvailableUsers=async ()=>{
        const response = await fetch(`${host}/auth/validateUser/getallusers`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const usersAvailable=await response.json();
          let userarr=usersAvailable.user;
          userarr.forEach((item)=>{
            item.status = "offline";
          })
          setAvailableUsers(userarr);
    }
    
    //state for available chat
    const [profile,setProfile]=useState([]);
    const [chatids,setChatids]=useState([]);
    //fetchAvailableChat
    const fetchAvailableChat=async ()=>{
        const response = await fetch(`${host}/auth/Chat/fetchChats`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });   
        const people=await response.json();
        setChatids(people.chatid);
        setProfile(people.profile);
    }

    //Create a chat using id clicked

    const createchat=async (id)=>{
      console.log("id getting",id)
      const response=await fetch(`${host}/auth/Chat/createChat/${id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Auth-token":localStorage.getItem('token')
        },
      });
      const creation=await response.json();
      fetchAvailableChat();
    };


    //Fetch available Groups
    const [AvailGroups,setGroups]=useState([])
    const fetchAvailableGroups=async()=>{
      const response=await fetch(`${host}/auth/Chat/getallGroups`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Auth-token":localStorage.getItem('token')
        },
      });
      const gc=await response.json();
      //console.log("Groups",gc.groups);
      setGroups(gc.groups);
      //console.log("Groups:",AvailGroups);
    }

   
    const rendermessage=async (recieverchatid)=>{
      const response=await fetch(`${host}/auth/message/acessmessages/${recieverchatid}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Auth-token":localStorage.getItem('token')
        },
      });
      const messages=await response.json();
      const usermsg=messages.sucess;
      setid(messages.Loginuserid);
      setMessage(usermsg);
    };

    //sending a msg
    const sendmsg=async (msg,recieverchatid)=>{
      const response=await fetch(`${host}/auth/message/sendmessage/${recieverchatid}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ content:msg }),
      });
      const messages=await response.json();
      const isGC=messages.message.chat.isGroupChat;
      let recieverid;
      if(!isGC)
      {
         recieverid=messages.message.reciever._id;
         console.log(recieverid);
      }
      
      const chatArea = document.getElementById('chat-area');
      if (chatArea) {
          chatArea.scrollTop = chatArea.scrollHeight;
      }
      rendermessage(recieverchatid);
      //emiting socket send msg
      socket.emit('sendMsg', { content: msg, receiverChatId:recieverchatid, recieverId: isGC?recieverchatid:recieverid, messagearea:message, isGC:isGC });
    };

    //Get Added to group
    const AddToGroup= async (userid,groupid)=>{
      const response=await fetch(`${host}/auth/Chat/Addmember/${groupid}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Auth-token":localStorage.getItem('token')
        }
      });
      const Add=await response.json();
      if (response.ok) {
        //console.log("user added");
        return "User added successfully.";
      } else {
       // console.log(Add.error);
        return Add.error || "An error occurred.";
      }
      
    };



    // create  a group
    const CreateGroup=(name)=>{
        console.log("creating a group with name"+name)
    };

    return(
        <ChatContext.Provider value={{CreateGroup,AddToGroup,credentials,login,signup,setCredentials,Loading,lighttheme,setTheme,fetchAvailableUsers,AvailableUsers,fetchAvailableChat,profile,chatids,createchat,fetchAvailableGroups,AvailGroups,rendermessage,message,loginid,sendmsg,ousers}}>
            {props.children}
        </ChatContext.Provider>
    )
};


export default ChatState;