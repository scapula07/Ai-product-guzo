import React from 'react'
import share from "../../assets/icons/share.png"
import {BsFillShareFill} from "react-icons/bs"
import postImg from "../../assets/conference.png"
import org from "../../assets/feedorg.png"
import feedpost from "../../assets/feed.png"

export default function Feeds() {
  return (
    <div className='flex flex-col space-y-4'>
        {[1,2,3,4].map(()=>{
        return(
            <Feed />
        )
        })

        }

  </div>
  )
}


const Feed=()=>{
     return(
        <div className='w-full py-4 bg-white h-full '>
        <div className='flex items-center border-b py-2  lg:px-4 px-1 justify-between w-full'>
             <div className='flex items-center space-x-3'>
                 <img
                   src={org}
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

        <div className='flex flex-col w-full px-4 py-6 space-y-8'>
             <div className='flex flex-col'>
                <h5 className='font-light text-lg'>Activation Festival</h5>
                <h5 className='text-xs font-semibold text-slate-500'>1d ago</h5>

             </div>

             <div className='flex flex-col space-y-5'>
                <img
                  src={feedpost}
                  className="w-full h-72"
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
     )
}