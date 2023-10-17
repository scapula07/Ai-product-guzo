import React,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function Tabs() {
   const [active,setActive]=useState("activee")
     const currentURL = window.location.href;
    console.log(currentURL,"urlll")

    const parts = currentURL?.split('/');
    const lastPart = parts[parts.length - 1];
    console.log(lastPart,"lastp"); // "ecosystems"
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'
           onClick={()=>setActive("activee")}
        >
           <Link to="">
            <h5 className={`${lastPart !="pending" ?'text-sm font-semibold  border-blue-600 border-b-2':'text-sm font-semibold'}`}>Active</h5>
            </Link>
        </div>
          <div className='w-1/2 flex justify-center'
              onClick={()=>setActive("pending")}
          >
          <Link to="pending">
            <h5  className={`${lastPart =="pending" ?'text-sm font-semibold  border-blue-600 border-b-2 ':'text-sm font-semibold'}`}>Pending</h5>
            </Link>
          </div>
      
   </div>
  )
}