import React from 'react'
import Comment from './comment'
import share from "../../assets/icons/share.png"

export default function Post({feed}) {
  return (
     <div className='w-full  bg-white h-full '>
        <div className='flex items-center border-b py-2  lg:px-4 px-1 justify-between w-full'>
            <div className='flex items-center space-x-3'>
                <img
                    src={""}
                    className="rounded-full h-8 w-8"
                />
                <h5 className='text-lg font-semibold'>Ion Houston</h5>

            </div>

            <div className='flex items-center space-x-4'>
                <img 
                    src={share}
                    className="h-4 w-4"
                />
                <h5 className='text-sm font-semibold text-slate-600'>Share </h5>

            </div>

        </div>

        <div className='flex flex-col w-full py-6 space-y-8'>
            <div className='flex flex-col px-4 '>
                <h5 className='font-light text-lg'>{feed?.post?.title}</h5>
                <h5 className='text-xs font-semibold text-slate-500'>1d ago</h5>

            </div>

            <div className='flex flex-col space-y-5 px-4 '>
                   <img
                    src={feed?.img_post}
                    className="w-full h-72"
                    />
             
                <div className='flex flex-col space-y-2'>
                        <h5 className='font-semibold text-lg text-slate-600'>Description</h5>
                        <p className='font-light text-xs '>
                            {feed?.post?.body}
                        </p>

                </div>
            </div>

            
            
            <Comment />
            

        </div>
      </div>
  )
}
