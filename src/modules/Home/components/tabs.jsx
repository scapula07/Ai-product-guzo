import React from 'react'
import { Link } from 'react-router-dom'

export default function Tabs() {
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'>
            <Link to="">
               <h5 className='text-sm font-semibold'>Ecosystem Feed</h5>
            </Link>
           
        </div>
        <div className='w-1/2 flex justify-center'>
            <Link to="ecosystems">
              <h5 className='text-sm font-semibold'>Ecosystem</h5>
           </Link>
        </div>
      
   </div>
  )
}