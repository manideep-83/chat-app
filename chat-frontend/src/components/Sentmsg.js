import React from 'react'

const Sentmsg = (props) => {
    const name="T"
  return (
    
      <div className='flex flex-row-reverse m-5 items-start'>
        <div className='border-2 border-black flex flex-col bg-slate-300 p-4 rounded-xl'>
            {/* <h1 className='text-lg font-semibold'>username</h1> */}
            <p className='font-semibold'>{props.message} </p>
            <p className='ml-auto'> 12:00 am</p>
        </div>
        
    </div>
    
  )
}

export default Sentmsg
