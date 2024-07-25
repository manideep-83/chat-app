import React from 'react'

const Recievedmsg = (props) => {
   // console.log(props.message)
  return (
    <div className='flex flex-row m-5 items-start'>
        <div className=' m-2 flex justify-center items-center rounded-full border-2 border-gray-300 p-3 h-12 w-12'>
                <p className='m-0 text-lg'>{props.name.toUpperCase()}</p>
        </div> 
          <div className='  border-2 border-black flex flex-col bg-slate-300 pl-5 pr-4 rounded-xl'>
          <h1 className='text-lg font-semibold pt-2 '>{props.fname}</h1>
            <p className='font-semibold pl-3 pt-2 pb-2'>{props.message} </p>
          </div>
       
        
    </div>
  )
}

export default Recievedmsg
