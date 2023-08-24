import React from 'react'
import orgPic from "../../assets/orgcover.png"
import share from "../../assets/icons/share.png"
import {BsFillShareFill} from "react-icons/bs"
import postImg from "../../assets/conference.png"
import CreatePost from './createPost'

export default function ViewPosts() {
  return (
    <div className='flex flex-col space-y-4'>
      {[1,2,3,4].map(()=>{
         return(
          <Post />
         )
      })

      }

    </div>
  )
}


const Post =({group})=>{
   return(
    <>
    <div className='w-full py-4 bg-white h-full '>
         <div className='flex items-center border-b py-2  px-4 justify-between w-full'>
              <div className='flex items-center space-x-3'>
                  <img
                    src={orgPic}
                    className="rounded-full h-8 w-8"
                  />
                  <h5 className='text-lg font-semibold'>Common Desk </h5>

              </div>

              <div className='flex items-center space-x-4'>
                  <img 
                   src={share}
                   className="h-4 w-4"
                  />
                  <h5 className='text-sm font-semibold text-slate-600'>Share </h5>

              </div>

         </div>

         <div className='flex flex-col w-full px-4 py-6 space-y-8'>
              <div className='flex flex-col'>
                 <h5 className='font-light text-lg'>Wellness Wednesdays</h5>
                 <h5 className='text-xs font-semibold text-slate-500'>1d ago</h5>

              </div>

              <div className='flex flex-col space-y-5'>
                 <img
                   src={postImg}
                   className="w-full h-56"
                 />
                  <div className='flex flex-col space-y-2'>
                       <h5 className='font-semibold text-sm text-slate-600'>Description</h5>
                       <p className='font-light text-xs '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum

                       </p>

                  </div>
              </div>
              

         </div>
        

    </div>

    </>
   )
}