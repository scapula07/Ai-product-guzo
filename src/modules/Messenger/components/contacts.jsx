import React ,{useState} from 'react'
import SearchBar from './saarch'
import Dmcontacts from './dmcontacts'
import GroupContacts from './groupContacts'

export default function Contacts({conversations,setCurrentChat,currentChat, currentUser, receiverInfo, setReceiver,groups,active,setActive}) {
    // const [active,setActive]=useState("dm")
  return (
    <div className='h-full flex flex-col w-full bg-white rounded-lg py-8 px-6 space-y-6' style={{height:"60%"}}>
        <SearchBar />
        {/* <div className='flex items-center w-full border  rounded-lg py-3'>
            <div className='flex w-1/2 justify-center border-r-2 border-slate-700' >
                <h5 className='text-sm font-semibold text-slate-700' onClick={()=>setActive("dm")}>Direct Messages</h5>
            </div>
            <div className='flex w-1/2 justify-center'>
                <h5 className='text-sm font-semibold text-slate-700' onClick={()=>setActive("group")}>Opportunities</h5>
            </div>

        </div> */}
            <div>
            
               <Dmcontacts 
                  conversations={conversations}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                  currentUser={ currentUser}
                  receiverInfo={receiverInfo}
                  setReceiver={setReceiver}
               
               />  

            </div>

    </div>
  )
}
