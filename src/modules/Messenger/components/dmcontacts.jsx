import React from 'react'
import dm1 from "../../assets/feedorg.png"
import dm2 from "../../assets/orgcover.png"
import {BsThreeDots} from "react-icons/bs"
import { useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import ecoImg from "../../assets/img3.png"
import org from "../../assets/img2.png"
import indiv from "../../assets/indiv.png"

export default function Dmcontacts({conversations,setCurrentChat,currentChat, currentUser,receiverInfo,setReceiver}) {
   useEffect(( )=>{
      conversations?.length >0 && setReceiver(conversations[0]?.info?.find(info => info?.id != currentUser?.id))
      conversations?.length >0 && setCurrentChat(conversations[0])
    },[conversations?.length])
    
   console.log(conversations,currentChat,"dmmmm")
   return (
    <div className='w-full flex flex-col space-y-6 overflow-y-scroll no-scrollbar h-full'>
        {conversations?.map((conv)=>{
            
           
            const contact =conv?.info?.find(info => info?.id != currentUser?.id);
            console.log(contact,"contact dmmm")
             return(
              <Contact 
                  conv={conv}
                  contact={contact}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                  receiverInfo={receiverInfo}
                  setReceiver={setReceiver}

              />
              
             )
        })

        }

          {conversations?.length ===0&&
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


const Contact=({contact,setCurrentChat,currentChat,receiverInfo,setReceiver,conv})=>{
  console.log(contact,"ccc")
  return(
        <div className='flex hover:bg-slate-100  space-x-4 px-4 border-b py-2 rounded-md ' 
             onClick={()=>setCurrentChat(conv) || setReceiver(contact) }
          >
           <img 
             className="rounded-full h-10 w-10"
              src={contact?.img}
           />

        <div className='flex justify-between items-center w-full'>
          {contact?.type?.length>0?
              <div className='flex flex-col'>
                <h5 className='font-semibold text-sm'>{contact?.name}</h5>
                {contact?.type=="eco"?
             <div className="flex items-center space-x-1">
             <img 
             src={ecoImg}
             className="w-3 h-3"
             />
             <h5 className='text-xs'>Ecosystem</h5>

            </div>
                  :
                <>
                  {contact?.type==="org"?
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
              <div className='flex flex-col'>
                {contact?.firstName !==undefined? 
                   <h5 className='font-semibold text-sm'>{contact?.firstName + " " +contact?.lastName}</h5>
                     :
                   <h5 className='font-semibold text-sm'>{contact?.display}</h5>


                }
                
                {contact?.type=="eco"?
             <div className="flex items-center space-x-1">
             <img 
             src={ecoImg}
             className="w-3 h-3"
             />
             <h5 className='text-xs'>Ecosystem</h5>

         </div>
        :
       <>
        {contact?.type==="org"?
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
       
           
            <BsThreeDots />
        </div>
    
    </div>
  )
}