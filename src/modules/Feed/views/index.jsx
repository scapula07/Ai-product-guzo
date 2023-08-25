import React from 'react'
import { useLocation,useParams} from "react-router-dom";
import Profile from '../components/profile';
import Post from '../components/post';
import Request from '../components/request';
import {AiOutlineClose} from "react-icons/ai"


export default function Feed() {
    const location =useLocation()
    const feed=location?.state?.feed
    console.log(feed?.share_by,"share")


  return (
    <div className='flex flex-col w-full h-screen px-8 py-6 '>
        <div className='flex w-full justify-end'>
             <AiOutlineClose 
               className="text-2xl"
               onClick={() =>window.history.go(-1)}
             />

        </div>
      <div className='flex w-full h-full  space-x-8 py-4'>
            <div className='w-2/5  h-full overflow-y-hidden lg:flex  hidden'>
                <Profile 
                  shareBy={feed?.shared_by}
                />

            </div>
            <div className=' overflow-y-auto h-full w-full' >
                <Post 
                feed={feed}
                />

            </div>
            <div className='w-3/5'>
                <Request 
                  reqs={feed?.requests}
                />

            </div>

      </div>

    </div>

  )
}
