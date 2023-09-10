import React,{useState,useEffect} from 'react'
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import { collaborationApi } from '../_api'
import { groupState,userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom';


export default function MyOpportunities() {
      const group =useRecoilValue(groupState)
      const [collabs,arePosts]= useOutletContext();
   
  return (

    <div className='w-full'>
        {arePosts?.length===0&&collabs?.length ===0&&
            <div className='w-full flex justify-center py-10'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
            </div>
            }
            {arePosts?.length >0&&
               <div className='w-full flex justify-center py-10'>
                  <h5 className="text-lg font-semibold">No Posts</h5>
               </div>

             }
  
    <div className='grid grid-flow-row lg:grid-cols-3 grid-cols-1 gap-4 gap-y-8 h-full w-full'>
        {collabs?.length >0&&collabs?.map((collab)=>{
            return(
                <div className='flex flex-col bg-white py-4 px-4 space-y-4'>
                    <div className='flex justify-end'>
                        <h5 className='bg-black py-1 px-4 rounded-lg text-white text-sm'>Active</h5>
                    </div>
                    <div className='flex flex-col items-center space-y-3'>
                        <img 
                          src={collab?.img_post}
                          className="rounded-md w-full h-36"
                        />
                        <h5 className=' text-center font-semibold '>{collab?.eventPost?.title}</h5>
                        <h5 className='text-sm font-semibold text-slate-600 flex items-center space-x-2'>
                           <span>Hosted by </span> 
                            <img 
                              src=  {collab?.shared_by?.img}
                              className="w-8 h-8 rounded-full"
                            />
                          
                        </h5>
                    </div>

                    <div className='flex flex-col items-center space-y-3 py-4'>
                        <p className=' text-center font-light text-sm'>
                        {collab?.eventPost?.body + "..."}
                        </p>

                        <div className='flex items-center space-x-3 py-2'> 
                          <Link to={`/collaboration/${collab?.id}`}
                                    state={{
                                    collab
                                }}
                              
                          >
                                <h5 className='rounded-full px-6 py-2.5 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(236, 235, 254, 1)"}}>
                                    Manage
                                </h5>
                          </Link>
                          
                           <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
                              <BsThreeDots 
                                   className='text-blue-600 text-2xl'
                              />
                           </h5>
                        </div>
                    </div>

                </div>
            )
        })

        }

      </div>

      </div>
  )
}


