import React ,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function Tabs() {
  const [active,setActive]=useState("my")
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'
          onClick={()=>setActive("my")}
        >
        <Link to="">
            <h5 className={`${active==="my" ?'text-sm font-semibold border-b-2 border-blue-600':'text-sm font-semibold'}`}>My Opportunities</h5>
          </Link>
        </div>
          <div className='w-1/2 flex justify-center'
            onClick={()=>setActive("joined")}
          >
          <Link to="joined">
            <h5 className={`${active==="joined" ?'text-sm font-semibold border-b-2 border-blue-600':'text-sm font-semibold'}`}>Joined Opportunities</h5>
            </Link>
          </div>
          <div className='w-1/2 flex justify-center'
              onClick={()=>setActive("contact")}
          >
          <Link to="contacts">
            <h5 className={`${active==="contacts" ?'text-sm font-semibold border-b-2 border-blue-600':'text-sm font-semibold'}`}>Contacts</h5>
            </Link>
          </div>
      
   </div>
  )
}
