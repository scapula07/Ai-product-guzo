import React ,{useState} from 'react'
import SearchBar from './saarch'
import Dmcontacts from './dmcontacts'
import GroupContacts from './groupContacts'
import Fuse from "fuse.js"

export default function Contacts({conversations,setCurrentChat,currentChat, currentUser, receiverInfo, setReceiver,groups,active,setActive,areContacts}) {
    // const [active,setActive]=useState("dm")
    const [searchQuery,setQuery]=useState("")

    const fuse =new Fuse([...conversations],{
        keys:["name"]
      })

      const result=fuse.search(searchQuery)

  return (
    <div className='h-full flex flex-col w-full bg-white rounded-lg py-8 px-6 space-y-6 relative' style={{height:"100%"}}>
        <div className=''>
                <SearchBar 
                    setQuery={setQuery} 
                    searchQuery={searchQuery} 
                />
        </div>
  
        {/* <div className='flex items-center w-full border  rounded-lg py-3'>
            <div className='flex w-1/2 justify-center border-r-2 border-slate-700' >
                <h5 className='text-sm font-semibold text-slate-700' onClick={()=>setActive("dm")}>Direct Messages</h5>
            </div>
            <div className='flex w-1/2 justify-center'>
                <h5 className='text-sm font-semibold text-slate-700' onClick={()=>setActive("group")}>Opportunities</h5>
            </div>

        </div> */}
            <div className='overflow-y-scrol no-scrollbar bg-white h-full '>
            {result?.length ===0?
            
               <Dmcontacts 
                  conversations={conversations}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                  currentUser={ currentUser}
                  receiverInfo={receiverInfo}
                  setReceiver={setReceiver}
                  areContacts={areContacts}
               
               />  
               :
               <Dmcontacts 
               conversations={conversations}
               setCurrentChat={setCurrentChat}
               currentChat={currentChat}
               currentUser={ currentUser}
               receiverInfo={receiverInfo}
               setReceiver={setReceiver}
               areContacts={areContacts}
            
            />  

            }

            </div>

    </div>
  )
}
