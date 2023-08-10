import React from 'react'
import Tabs from "../components/tabs"
import { Outlet } from 'react-router-dom'

export default function EcoFeed({group}) {
  return (
    <div className='py-6'>
        <div className='lg:w-full overflow-y-auto h-full '>
            <Tabs />
        </div>

        <div className='py-6'>
            <Outlet />
        </div>

                

    </div>
  )
}
