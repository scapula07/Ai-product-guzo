import React from 'react'
import orgPic from "../../assets/orgcover.png"

export default function CreatePost({group}) {
  return (
    <div className='bg-white w-full rounded-lg flex px-4 flex-col py-4  space-y-4'>
        <div className='flex items-center space-x-4'>
            <img 
              src={group?.profile}
              className="rounded-full h-8 w-8 "
               />

               <input 
                 placeholder='Create a post...'
                 className='w-full  rounded-full border outline-hidden py-1 px-4 text-sm'
               />

        </div>
        <button className='bg-blue-600 py-2 rounded-full w-full text-white font-semibold text-sm'>Post</button>

    </div>
  )
}
