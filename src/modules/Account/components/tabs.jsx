import React from 'react'
import { Link } from 'react-router-dom'

export default function Tabs({setActive,active}) {
  const currentURL = window.location.href;
  console.log(currentURL,"urlll")

  const parts = currentURL?.split('/');
  const lastPart = parts[parts.length - 1];
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'
          onClick={()=>setActive("feed")}
        >
          
               <h5 className={`${active ==="feed" ?'text-sm font-semibold  border-blue-600 border-b-2':'text-sm font-semibold'}`} > Resources</h5>
           
           
        </div>
        <div className='w-1/2 flex justify-center'
             onClick={()=>setActive("members")}
           >
        
              <h5 className={`${active ==="members" ?'text-sm font-semibold  border-blue-600 border-b-2':'text-sm font-semibold'}`} >History</h5>
      
        </div>
      
   </div>
  )
}

