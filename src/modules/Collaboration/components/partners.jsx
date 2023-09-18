import React ,{useState} from 'react'
import {BsThreeDots} from "react-icons/bs"
import ClipLoader from "react-spinners/ClipLoader";

export default function Partner({partner}) {
    const [accepted,setAccept]=useState()
    return(
     <div className='flex flex-col bg-white rounded-lg w-full space-y-2 '>
         <div className='flex items-center py-6 px-2 rounded-lg w-full justify-between'>
                 <div className='flex items-center space-x-4'>
                     <>
     
                         {partner?.img?.length>0?
                             <img 
                                 src={partner?.img}
                                 className="h-10 w-10 rounded-full"
                               />
                                 :
                                 <div className='rounded-full p-2 items-center justify-center flex border'
                                 >
                                 <h5 className='font-semibold text-sm'> {partner?.firstName?.slice(0,1) +partner?.lastName?.slice(0,1)}</h5>
                             </div>
                                 
 
                             }
                       
                     </>
                   
                     {partner?.type?.length >0?
                         <div className='flex flex-col'>
                             <h5 className='text-xl font-semibold'>{partner?.name}</h5>
                             <h5 className='text-sm '>{"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "}</h5>
                         </div>
                             :
                             <div className='flex flex-col'>
                                {partner?.firstName != undefined?
                                    <h5 className='text-xl font-semibold'>{partner?.firstName + " " + partner?.lastName }</h5>
                                    :
                                    <h5 className='text-xl font-semibold'>{partner?.display }</h5>

                                }
                                
                                 <h5 className='text-sm '>{"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "}</h5>
                           </div>
 
 
 
                     }
                   
             </div>
 
             <div className='flex items-center space-x-4 justify-end w-1/4'>
                
                 {accepted?
             
                     <ClipLoader 
                         color={"rgba(62, 51, 221, 1)"}
                     
 
                     />
               
                   :
                     <button 
                         style={{background: "rgba(236, 235, 254, 1)"}}
                         className='text-blue-700 rounded-full text-xs px-4 py-1'
                         // onClick={()=>accept(group?.id,member)}
                     
                         > 
                        Message
                       
                     </button>
                 }

                  <BsThreeDots className='text-xl'/>
 
             </div>
         <div>
         </div>
     </div>
       <div className='px-8'>
               <div className='bg-slate-200 py-3 px-4 h-20 rounded-lg'>
                   <h5 className='text-xs'>{partner?.note}... see more. </h5>
 
 
               </div>
       </div>
 
 
 
     </div>
    )
}
