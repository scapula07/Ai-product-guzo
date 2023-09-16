import React,{useState} from 'react'
import {MdEdit} from "react-icons/md"
import { feedApi } from '../../Home/_api/feed'
import BeatLoader from "react-spinners/BeatLoader";

export default function Comment({ group, feed }){
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
               { group?.type?.length>0?
                          <img
                          src={group ?.img}
                          className="rounded-full h-8 w-8"
                        />
                         :
                         <>
                           { group?.img?.length>0?
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