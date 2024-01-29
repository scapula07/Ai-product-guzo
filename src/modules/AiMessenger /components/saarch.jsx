import React from 'react'
import {BiSearch} from "react-icons/bi"

export default function SearchBar({setQuery}) {
  return (
    <div className='flex items-center space-x-4 px-4 py-1 border rounded-full  w-full bg-white'>
         <BiSearch
           className='text-slate-800 text-xl font-semibold'
         />
         <input 
              placeholder='Search'
              className=' outline-none w-full border-0 text-lg text-black'
              onChange={(e)=>setQuery(e.target.value)}

          />
     </div>
  )
}