import React from 'react'
import logo from "../../../assets/logo.png"
import { Outlet } from 'react-router-dom'
import guzo from "../../../assets/guzoLogo.png"
export default function Register() {
  return (
    <div className='h-screen'>
        <div className='flex  h-full w-full justify-center  items-center space-x-10'>
             
             <img 
               src={guzo}
               className="w-1/7"
             />

        
        <div className='py-2 w-3/5'>
           <Outlet />
        </div>

      </div>
      


    </div>
  )
}
