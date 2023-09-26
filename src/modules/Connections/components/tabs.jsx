import React,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function Tabs() {
  const [active,setActive]=useState("activee")
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'
           onClick={()=>setActive("activee")}
        >
           <Link to="">
            <h5 className={`${active==="activee" ?'text-sm font-semibold  border-blue-600':'text-sm font-semibold'}`}>Active</h5>
            </Link>
        </div>
          <div className='w-1/2 flex justify-center'
              onClick={()=>setActive("pending")}
          >
          <Link to="pending">
            <h5  className={`${active==="pending" ?'text-sm font-semibold  border-blue-600':'text-sm font-semibold'}`}>Pending</h5>
            </Link>
          </div>
      
   </div>
  )
}
