import React ,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function Tabs() {
    const [active,setActive]=useState("feeds")
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'
           onClick={()=>setActive("feeds")}
        >
            <Link to="">
               <h5 className={`${active==="feeds" ?'text-sm font-semibold  border-blue-600 ':'text-sm font-semibold'}`} >Feed</h5>
            </Link>
           
        </div>
        <div className='w-1/2 flex justify-center'
           onClick={()=>setActive("ecos")}
        >
            <Link to="ecosystems">
              <h5 className={`${active==="ecos" ?'text-sm font-semibold  border-blue-600 ':'text-sm font-semibold'}`}>Ecosystem</h5>
           </Link>
        </div>
      
   </div>
  )
}
