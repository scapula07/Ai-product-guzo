import React from 'react'
import dm1 from "../../assets/feedorg.png"
import dm2 from "../../assets/orgcover.png"
import {BsThreeDots} from "react-icons/bs"
import { useEffect } from 'react'

export default function GroupContacts({conversations,setCurrentChat,currentChat, currentUser,receiverInfo,setReceiver}) {
   useEffect(( )=>{
      conversations?.length >0 && setReceiver(conversations[0]?.info?.find(info => info?.id != currentUser?.id))
      conversations?.length >0 && setCurrentChat(conversations[0])
    },[conversations?.length])
    
   
  return (
    <div className='w-full flex flex-col space-y-6'>
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


    </div>
  )
}


const Contact=({contact,setCurrentChat,currentChat,receiverInfo,setReceiver,conv})=>{
  console.log(contact,"ccc")
  return(
        <div className='flex hover:bg-slate-100  space-x-4 px-2 py-2 rounded-md ' 
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
                <h5 className='text-sm'>{contact?.type}</h5>
              </div>
              :
              <div className='flex flex-col'>
                <h5 className='font-semibold text-sm'>{contact?.firstName + " " +contact?.lastName}</h5>
                <h5 className='text-sm'>{contact?.type}</h5>
            </div>

        

          }
       
           
            <BsThreeDots />
        </div>
    
    </div>
  )
}