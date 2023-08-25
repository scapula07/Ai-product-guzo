import React from 'react'
import {MdEdit} from "react-icons/md"

export default function Comment() {
  return (
    <div className='flex flex-col w-full px-4  '>
    <div className='flex items-center w-full space-x-8 px-2'>
       <h5>Y</h5>
       <div className='flex items-center border px-2 border-black justify-between rounded-full w-full'>
           <input 
             className='border-0  py-1 rounded-full outline-none px-2'
             placeholder='Add a comment...'
           />
           <MdEdit 
            className='text-slate-400 '
           />
           

       </div>
      
    </div>



</div>
  )
}
