import React from 'react'
import { Link } from 'react-router-dom'

export default function Tabs({setActive,active}) {
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'
          onClick={()=>setActive("feed")}
        >
          
               <h5 className='text-sm font-semibold'>Ecosystem Feed</h5>
           
           
        </div>
        <div className='w-1/2 flex justify-center'
             onClick={()=>setActive("members")}
           >
        
              <h5 className='text-sm font-semibold'>Members</h5>
      
        </div>
      
   </div>
  )
}
