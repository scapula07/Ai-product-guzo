import op1 from  "../../assets/new2.png"
import op2 from  "../../assets/conference.png"
import op3 from  "../../assets/new3.png"
import op4 from  "../../assets/new1.png"
import op5 from  "../../assets/new5.png"
import op6 from  "../../assets/new4.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import { useState ,useEffect} from "react"
import { groupState,userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import { collaborationApi } from '../_api'

export default function JoinedOpportunities() {
    const group =useRecoilValue(groupState)
     const [joined,setJoin]=useState([])
     useEffect(()=>{
         const getJoinedPost=async()=>{
            const response=await collaborationApi.getJoinedCollaborations(group)
            setJoin(response)
              

            }
         getJoinedPost()

         },[group])

         console.log(joined,"joineeee")
        return (
            <div className="flex flex-col w-full space-y-20">
                 
                  
                    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                        
                        {joined?.pending?.map((collab)=>{
                            return(
                                <div className='flex flex-col bg-white py-4 px-4 space-y-4'>
                                    <div className='flex justify-end'>
                                        <h5 className=' py-1 px-4 rounded-lg text-white text-sm' style={{background: "rgba(142, 142, 142, 1)"}}>Pending Approval</h5>
                                    </div>
                                    <div className='flex flex-col items-center space-y-3'>
                                        <img 
                                        src={collab?.img_post}
                                        className="rounded-md w-full h-36"
                                        />
                                        <h5 className=' text-center font-semibold '>{collab?.post?.title}</h5>
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


                    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                    
                            {joined?.active?.length>0&&joined?.active?.map((collab)=>{
                                
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
                                             <h5 className=' text-center font-semibold '>{collab?.post?.title}</h5>
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
      
      
