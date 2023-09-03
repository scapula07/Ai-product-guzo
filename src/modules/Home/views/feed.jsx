import React,{useEffect,useState} from 'react'
import share from "../../assets/icons/share.png"
import {BsFillShareFill} from "react-icons/bs"
import postImg from "../../assets/conference.png"
import org from "../../assets/feedorg.png"
import feedpost from "../../assets/feed.png"
import {useRecoilValue} from "recoil"
import { feedApi } from '../_api/feed'
import {RiArrowDownSLine} from "react-icons/ri"
import {AiOutlineClose} from "react-icons/ai"
import {MdEdit} from "react-icons/md"
import { Link } from 'react-router-dom'
import Comment from '../components/comment'

import { groupState,userState } from '../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import Join from "../../JoinPost"
export default function Feeds() {
    const group =useRecoilValue(groupState)
    const [feeds,setFeeds]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [arePosts,setPost]=useState("")
    // console.log(group)

    useEffect(()=>{
        const getAllEcoFeed=async()=>{
            const feeds=await feedApi.getEcosystemFeeds(group?.id)
            feeds?.length===0 &&setPost("No Feeds")
            feeds?.length >0 &&setPost("")
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
             group={group}
             />
        )
        })

        }
         {arePosts?.length===0&&feeds?.length ===0&&
            <div className='w-full flex justify-center py-10'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
            </div>
            }

            {arePosts?.length >0&&
               <div className='w-full flex justify-center py-10'>
                  <h5 className="text-lg font-semibold">No posts</h5>
               </div>

            }

  </div>
  )
}


const Feed=({feed,group})=>{
     
     return(
        <div className='w-full py-4 bg-white h-full '>
        <div className='flex items-center border-b py-2  lg:px-4 px-1 justify-between w-full'>
              <div className='flex items-center space-x-3'>
                   <>
                     {feed?.shared_by?.type?.length>0?
                         <img
                         src={feed?.shared_by?.img}
                         className="rounded-full h-8 w-8"
                       />
                        :
                        <>
                          {feed?.shared_by?.img?.length>0?
                               <img
                               src={feed?.shared_by?.img}
                               className="rounded-full h-8 w-8"
                             />
                             :
                             <div className='rounded-full p-2 items-center justify-center flex border'
                                >
                                <h5 className='font-semibold text-sm'> {feed?.shared_by?.firstName?.slice(0,1) +feed?.shared_by?.lastName?.slice(0,1)}</h5>
                            </div>
                             

                          }
                        
                        
                        </>

                     }
                     
                  </>
                  <h5 className='text-lg font-semibold'>{feed?.shared_by?.name}</h5>

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
               <Link  to={`/feed/${feed?.id}`}
                    state={{
                     feed
                  }}
                  >
                
                    <img
                      src={feed?.img_post}
                      className="w-full h-72"
                    />
                   </Link>
                  <div className='flex flex-col space-y-2'>
                        <h5 className='font-semibold text-lg text-slate-600'>Description</h5>
                        <p className='font-light text-xs '>
                            {feed?.post?.body}
                        </p>

                   </div>
                 </div>

                 <div>

                 </div>

               <div className='flex flex-col'>
                   {feed?.requests?.map((req,index)=>{
                    
                      return(
                       <RequestCard 
                        req={req}
                        group={group}
                        feed={feed}
                        index={index}
                       />
                      )

                     })

                   }

              </div>
             
              <Comments 
                 group ={ group }
                 feed={feed}
              />
             

          </div>
       

   </div>
     )
}


const RequestCard=({req,group,feed,index})=>{
  

  const randomNumber = Math.floor(Math.random() * 4) + 1;
  const [trigger,setTrigger]=useState(false)

    const color=[
        "",
        "rgba(197, 193, 251, 1)",
        "rgba(205, 247, 243, 1)",
        "rgba(254, 247, 197, 1)",
        "rgba(255, 198, 201, 1)"
    ]
   return(
        <div className='flex flex-col py-6 px-4 space-y-4 ' style={{background:`${color[randomNumber]}`}} >
            <div className='flex items-center justify-between'>
                  <h5 className='text-xl font-semibold'>{req?.title}</h5>
                  {trigger?
                      <AiOutlineClose
                      className='text-xl font-light'
                      onClick={()=>setTrigger(false)}
                    />
                    :
                    <RiArrowDownSLine 
                    className='text-3xl font-semibold'
                    onClick={()=>setTrigger(true)}
                  />
                    

                  }
                 

            </div>
            {trigger&&
              <div className='flex flex-col space-y-2'>
                   <p>{req?.body}</p>
                   <div className='flex justify-center w-full'>
                       <Join 
                         group={group}
                         feed={feed}
                         index={index}
                       />
                    </div>
                  
              </div>
             }
              

       </div>

   )
}


const Comments=({ group, feed })=>{
   const [change,setChange]=useState(false)
   const [text,setText]=useState("")
   const [isLoading,setLoader]=useState(false)

  const makeComment=async()=>{
    setLoader(true)
     try{
        let payload;
        if(group?.type?.length >0){
           payload={
             name:group?.name,
             img:group?.img,
             comment:text
           }
        }else if(group?.img.length >0){
           payload={
            name:group?.firstName + " " + group?.lastName,
            img:group?.img,
            comment:text
          }

        }else{
            payload={
            name:group?.firstName + " " + group?.lastName,
            img:"",
            comment:text
          }

        }
         console.log(payload,"loaddd")
          const response= await feedApi.makeComments(payload,feed)
          response&&setLoader(false)
          response&&setText("")
       }catch(e){
         console.log(e)
         setLoader(false)
       }

  }

   return(
      <div className='flex flex-col w-full px-4  '>
          <div className='flex items-center w-full space-x-2 px-2'>
              <div>
              { group.type?.length>0?
                         <img
                         src={group ?.img}
                         className="rounded-full h-8 w-8"
                       />
                        :
                        <>
                          { group.img?.length>0?
                               <img
                               src={ group?.img}
                               className="rounded-full h-8 w-8"
                             />
                             :
                             <div className='rounded-full p-2 items-center justify-center flex border'
                                >
                                <h5 className='font-semibold text-sm'> { group?.firstName?.slice(0,1) + group?.lastName?.slice(0,1)}</h5>
                            </div>
                             

                          }
                        
                        
                        </>

                     }
              </div>
             <div className='flex items-center border px-2 border-black justify-between rounded-full w-full'>
                 <input 
                   className='border-0 text-sm  py-1 rounded-full outline-none px-2 w-11/12'
                   placeholder='Add a comment...'
                   value={text}
                   onMouseOut={()=>setChange(false)}
                   onChange={(e)=>setText(e.target.value)||setChange(true)}
                 />
                 {isLoading?
                        <BeatLoader
                          color={"rgba(62, 51, 221, 1)"}
                          loading={true}
                          size="6"
                        
                        />
                         :
                         <>
                         {change?
                             <h5 
                               className='text-xs font-semibold'
                               onClick={makeComment}
                             >send</h5>
                               :
                             <MdEdit 
                               className='text-slate-400 '
                               onMouseOver={()=>setChange(true)}
                             />
       
                           }
                         </>
                    

                      }
                
                   </div>
            
                 </div>
                  {feed?.comments?.length >0 &&
                    <Comment 
                      feed={feed}
                     />

                  }
                  


        

            </div>
  
   )
}