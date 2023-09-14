
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import { useState ,useEffect} from "react"
import { groupState,userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
// import { collaborationApi } from '../_api'
import { collaborationApi } from "../../Collaborations/_api"
import { Link } from "react-router-dom"

export default function PostManagement() {
    const group =useRecoilValue(groupState)
    const [collabs,setCollabs]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [arePosts,setPost]=useState("")
  
  
    useEffect(()=>{
      const getAllCollabs=async()=>{
          const collabs=await collaborationApi.getAllCollaborations(group?.id)
          collabs?.length===0 &&setPost("No Feeds")
          collabs?.length >0 &&setPost("")
          setCollabs(collabs)
  
      }
      getAllCollabs()
  
   },[group])

        //  console.log(joined,"joineeee")
        return (
            <div className="flex flex-col w-full space-y-20">
                 
                  
                    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                        
                        {collabs?.map((collab)=>{
                            return(
                                <div className='flex flex-col bg-white py-4 px-4 space-y-4'>
                                    <div className='flex justify-end'>
                                        <h5 className=' py-1 px-4 rounded-lg text-white text-sm bg-black' >Active</h5>
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
                                               {collab?.post?.body + "..."}
                                        </p>                
                                        <div className='flex items-center space-x-3 py-2'> 
                                           <Link to={`/collaboration/${group?.id}`}
                                             state={{
                                                collab
                                               }}
                                        
                                              >
                                             <h5 className='rounded-full px-6 py-2.5 items-center justify-center text-blue-600 text-sm font-semibold' style={{background: "rgba(236, 235, 254, 1)"}}>
                                                View
                                             </h5>
                                            </Link>

                                            <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
                                                     <Link to={`/messages/${group?.id}`}>
                                                            <FiMessageSquare 
                                                                className='text-blue-600 text-2xl '
                                                            />
                                                     </Link>
                                                        
                                              </h5>

                                            

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


                    {/* <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                    
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
            
                </div> */}


            </div>

        )
      }
      
      
