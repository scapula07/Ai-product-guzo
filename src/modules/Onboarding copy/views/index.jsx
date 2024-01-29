import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Onboarding() {
  return (
    <div className='h-screen w-full' style={{background: "rgba(242, 242, 242, 0.6)"}}>
      <Outlet />
    </div>
  )
}
