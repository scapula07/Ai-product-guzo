import React from 'react'
import orgPic from "../../assets/orgcover.png"

export default function CreatePost({group}) {
  return (
    <div className='bg-white w-full rounded-lg flex px-4 flex-col py-4  space-y-4'>
        <div className='flex items-center space-x-4'>
             {group?.img?.length>0?
                  <img 
                  src={group?.img}
                  className="rounded-full h-8 w-8 "
                  />
                  :
                  <div className='rounded-full h-8 w-8 p-2 items-center justify-center flex border'
                    >
                   <h5 className='font-semibold text-sm'> {group?.firstName?.slice(0,1) +group?.lastName?.slice(0,1)}</h5>
                 </div>
              }

               <input 
                 placeholder='Create a post...'
                 className='w-full  rounded-full border outline-hidden py-1 px-4 text-sm'
               />

        </div>
        <button className='bg-blue-600 py-2 rounded-full w-full text-white font-semibold text-sm'>Post</button>

    </div>
  )
}
