import React from 'react'
import dm1 from "../../assets/feedorg.png"
import dm2 from "../../assets/orgcover.png"
import {BsThreeDots} from "react-icons/bs"
import { useEffect } from 'react'

export default function GroupContacts({conversations,setCurrentChat,currentChat, currentUser,receiverInfo,setReceiver}) {
   useEffect(( )=>{
      conversations?.length >0 && setReceiver(conversations[0])
      conversations?.length >0 && setCurrentChat(conversations[0])
    },[conversations?.length])
     console.log(conversations,"convers")
   
  return (
    <div className='w-full flex flex-col space-y-6 overflow-y-scroll no-scrollbar'>
        {conversations?.map((conv)=>{
            
           
            // const contact =conv?.info?.find(info => info?.id != currentUser?.id);
            // console.log(contact,"contact dmmm")
             return(
              <Contact 
                  conv={conv}
                  // contact={contact}
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
        <div className='flex hover:bg-slate-100  space-x-4 px-4 py-2 border-b rounded-md ' 
             onClick={()=>setCurrentChat(conv) || setReceiver(contact) }
          >

          <div className='flex justify-between items-center w-full'>
         
              <div className='flex flex-col'>
                <h5 className='font-semibold '>{conv?.name}</h5>
              </div>
       
           
            <BsThreeDots />
        </div>
    
    </div>
  )
}