import React from 'react'
import {BiSearch} from "react-icons/bi"

export default function SearchBar({title}) {
    console.log(title,"search")
  return (
    <div className='flex items-center space-x-4 px-4 py-1 border rounded-full  w-full bg-white'>
         <BiSearch
           className='text-slate-800 text-xl font-semibold'
         />
         <input 
            placeholder={title}
            className=' outline-none w-full border-0 text-sm py-1 text-black'
          />
     </div>
  )
}