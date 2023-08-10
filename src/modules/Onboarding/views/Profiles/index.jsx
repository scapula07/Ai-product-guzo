
import React from 'react'
import guzo from "../../../assets/guzoLogo.png"
import {Outlet } from "react-router-dom"
import { Link } from 'react-router-dom'
export default function CreateProfiles() {
  return (
   

      <div className='w-full h-full' style={{background: "rgba(242, 242, 242, 0.6)"}}>
          <div className='flex  h-full w-full justify-center  items-center space-x-20'>
             
             <img 
               src={guzo}
               className="w-1/7"
             />

             <div className='w-3/5 h-full py-20'>
                <Outlet />

             </div>

       </div>
       </div>
  )
}
