import React,{useState} from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import { userState ,groupState} from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import {Link} from "react-router-dom"
import { useOutletContext } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import ecoImg from "../../assets/img3.png"
import org from "../../assets/img2.png"
import indiv from "../../assets/indiv.png"
import { messageApi } from '../api/message'
import { useNavigate } from 'react-router-dom'
import remove from "../../assets/remove.png"
import {MdArrowDropDown} from "react-icons/md"


export default function Active() {
    const currentUser=useRecoilValue(userState)
    const group=useRecoilValue(groupState)
    const [connects]= useOutletContext();
    console.log(connects?.active,"acyivee")

   
  return (
     <>
    <div className='grid grid-flow-row lg:grid-cols-3 grid-cols-2  gap-4 gap-y-8 h-full w-full'>
        {connects?.active?.map((eco)=>{
            return(
        
                <ActiveCard 
                  eco={eco}
                  group={group}
                />
             
           
            )
          })

        }

    </div>
    

         {connects?.active?.length ===undefined || connects?.active?.length ===0 &&
               <div className='w-full flex justify-center py-10'>
                  <h5 className="text-lg font-semibold">No active connections</h5>
               </div>

            } 

          {/* {arePosts?.length===0&&feeds?.length ===0&&
            <div className='w-full flex justify-center py-10'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
            </div>
            } */}



      </>

  )
}






const ActiveCard=({eco,group})=>{
  let navigate = useNavigate();
  const [isLoading,setLoading]=useState(false)

  const [trigger,setTrigger]=useState(false)


   const startConversation=async()=>{
      setLoading(true)
      try{
          const response=await messageApi.startConversation(eco,group)
          console.log(response,"msg res")
          setLoading(false)
          response && navigate(`/messages/${group?.id}`)
          setLoading(false)
          

        }catch(e){
          console.log(e)
        }

      }
   return(
    <div className='flex flex-col bg-white py-4 px-4' >
    {eco?.type?.length >0?
       <div className='flex flex-col items-center space-y-3'>
  

           <img 
              src={eco?.img}
             className="rounded-full w-32 h-32"
            />
        
         <h5 className=' text-center font-semibold '>{eco?.name}</h5>
         {eco?.type=="eco"?
             <div className="flex items-center space-x-1">
             <img 
             src={ecoImg}
             className="w-3 h-3"
             />
             <h5 className='text-xs'>Ecosystem</h5>

         </div>
        :
       <>
        {eco?.type==="org"?
            <div className="flex items-center space-x-1">
                 <img 
                 src={org}
                 className="w-3 h-3"
                 />
               <h5 className='text-xs'>Organization</h5>
              </div>
              :
              <div className="flex items-center space-x-1">
                 <img 
                 src={indiv}
                 className="w-3 h-3"
                 />
               <h5 className='text-xs'>Individual</h5>
              </div>

               }
             
         </>
   

 
       }
        </div>
        :
        <div className='flex flex-col items-center space-y-3'>
  
            {eco?.img?.length>0?
             <img 
                 src={eco?.img}
                 className="rounded-full w-32 h-32"
               />
               :
               <div className='rounded-full  w-32 h-32 items-center justify-center flex border'
                 >
                <h5 className='font-semibold text-5xl'> {eco?.firstName?.slice(0,1) + eco?.lastName?.slice(0,1)}</h5>
              </div>




            }

           {eco?.firstName !=undefined?
               <h5 className=' text-center font-semibold '>{eco?.firstName + " " + eco?.lastName}</h5>
               :
               <h5 className=' text-center font-semibold '>{eco?.display}</h5>

           } 
          
          {eco?.type=="eco"?
             <div className="flex items-center space-x-1">
             <img 
             src={eco}
             className="w-3 h-3"
             />
             <h5 className='text-xs'>Ecosystem</h5>

         </div>
        :
       <>
        {eco?.type==="org"?
            <div className="flex items-center space-x-1">
                 <img 
                 src={org}
                 className="w-3 h-3"
                 />
               <h5 className='text-xs'>Organization</h5>
              </div>
              :
              <div className="flex items-center space-x-1">
                 <img 
                 src={indiv}
                 className="w-3 h-3"
                 />
               <h5 className='text-xs'>Individual</h5>
              </div>

               }
             
         </>
   

 
       }
        </div>

        }

     <div className='flex flex-col items-center space-y-3 py-4'>
     

         <div className='flex items-center space-x-3 py-2'> 
         {isLoading?
             
             <ClipLoader 
                 color={"rgba(62, 51, 221, 1)"}
                 loading={isLoading}
             />
             :
          <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>

         
             <FiMessageSquare 
                 className='text-blue-600 text-2xl '
                 onClick={startConversation}
             />
         
         
             </h5>
          }
            <h5 className='rounded-full p-2 items-center justify-center relative ' style={{background: ` ${trigger?"white" :"rgba(236, 235, 254, 1)"}`}}>
          
                {!trigger&&
                 <BsThreeDots 
                    className='text-blue-600 text-2xl  '
                    onClick={()=>setTrigger(true)}
                 />
                }
                {trigger&&
                    <div className='absolute top-0 -mt-1'>
                       <div className='bg-rose-100 h-12 w-32 rounded-b-2xl rounded-tr-2xl px-4 py-2 flex items-center justify-between'>
                          <h5 className='text-rose-600 font-semibold '>Remove</h5>
                          <MdArrowDropDown 
                            className='text-3xl font-semibold text-slate-700'
                            onClick={()=>setTrigger(false)}
                          />
  
                       </div>

  
                     </div>

                }

            </h5>

           

         </div>
     </div>

 </div>
    
   )
}