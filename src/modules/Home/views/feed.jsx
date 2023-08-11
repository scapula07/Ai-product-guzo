import React,{useEffect,useState} from 'react'
import share from "../../assets/icons/share.png"
import {BsFillShareFill} from "react-icons/bs"
import postImg from "../../assets/conference.png"
import org from "../../assets/feedorg.png"
import feedpost from "../../assets/feed.png"
import {useRecoilValue} from "recoil"
import { feedApi } from '../_api/feed'

import { groupState,userState } from '../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";

export default function Feeds() {
    const group =useRecoilValue(groupState)
    const [feeds,setFeeds]=useState([])
    const [isLoading,setLoading]=useState(false)
    // console.log(group)

    useEffect(()=>{
        const getAllEcoFeed=async()=>{
            const feeds=await feedApi.getEcosystemFeeds(group?.id)
            setFeeds(feeds)

        }
        getAllEcoFeed()

    })
  
  return (
    <div className='flex flex-col space-y-4'>
        {feeds?.length>0&&feeds.map((feed)=>{
        return(
            <Feed
             feed={feed}
             />
        )
        })

        }
         {feeds?.length ===0&&
            <div className='w-full flex justify-center py-10'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
            </div>
            }

  </div>
  )
}


const Feed=({feed})=>{
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
                <h5 className='font-light text-lg'>{feed?.post?.title}</h5>
                <h5 className='text-xs font-semibold text-slate-500'>1d ago</h5>

             </div>

             <div className='flex flex-col space-y-5'>
                <img
                   src={feed?.img_post}
                  className="w-full h-72"
                />
                 <div className='flex flex-col space-y-2'>
                      <h5 className='font-semibold text-sm text-slate-600'>Description</h5>
                      <p className='font-light text-xs '>
                           {feed?.post?.body}
                      </p>

                 </div>
             </div>
             

        </div>
       

   </div>
     )
}