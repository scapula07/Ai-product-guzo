import React from 'react'
import SearchBar from './searchBar'
import {IoMdNotificationsOutline} from "react-icons/io"

export default function Header() {
  return (
    <div className='w-full flex justify-end '>

        <div className='flex items-center space-x-10'>
            <SearchBar />

            <div className='flex items-center space-x-4'>
                <h5 className='flex '>
                   <IoMdNotificationsOutline 
                       className='text-3xl '
                   />
                   <span className='bg-red-500 h-1.5 w-1.5 rounded-full -ml-3 mt-1'></span>
                </h5>

                <img 
                  src=""
                  className='w-8 h-8 rounded-full'
                />
               

            </div>
        </div>

    </div>
  )
}
