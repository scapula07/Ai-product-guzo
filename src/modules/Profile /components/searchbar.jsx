import React from 'react'
import {BiSearch} from "react-icons/bi"

export default function SearchBar({setQuery, searchQuery}) {
  return (
    <div className='flex items-center space-x-4 px-4 py-1.5 border rounded-full  w-full bg-white'>
         <BiSearch
           className='text-slate-800 text-xl font-semibold'
         />
         <input 
            placeholder='Search'
            className=' outline-none w-full border-0 lg:text-lg text-sm text-black'
            onChange={(e)=>setQuery(e.target.value)}
          />
     </div>
  )
}