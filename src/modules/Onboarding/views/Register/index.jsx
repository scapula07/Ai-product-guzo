import React from 'react'
import logo from "../../../assets/logo.png"
import { Outlet } from 'react-router-dom'

export default function Register() {
  return (
    <div className='h-screen'>
        <div className='py-8 px-10'>
            <img 
              src={logo}
            />

        </div>
        <div className='py-2'>
           <Outlet />
        </div>
      


    </div>
  )
}
