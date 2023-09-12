import React,{useState,useEffect} from 'react'
import org from "../../assets/orgcover.png"
import feedorg from "../../assets/feedorg.png"
import {doc,setDoc,
    addDoc,collection,
    getDoc,getDocs,
    query, where,onSnapshot,orderBy} from "firebase/firestore"
import { db } from '../../Firebase'
import Chat from '../components/chat'
import { userState,groupState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'


export default function Chatbox({currentChat,messages,send,setNewMessage,receiverInfo, conversations}) {
    const group=useRecoilValue(groupState)
     const [msgs,setMsg]=useState([])
       useEffect(()=>{
              if(conversations?.length>0){
                console.log(currentChat?.id,"chat id")
                 const q = query(collection(db, "messages"), where("conversationid", "==", currentChat?.id),orderBy("date", "asc"));
                // const q = query(collection(db, "messages"), where("conversationid", "==", currentChat?.id));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const msgs= [];
                    querySnapshot.forEach((doc) => {
                        msgs.push({...doc?.data(),id:doc?.id});
                    });
                  
                    setMsg(msgs)
                  });
                return () => {
                    unsubscribe()
       
                };
            }
            
         
        }

        ,[currentChat])  

        console.log(msgs,"checking order")
  return (
    <div className='flex flex-col py-8 px-4 h-full'>
        {receiverInfo?.type?.length >0?
            <div className='flex items-center justify-center space-x-4 '>
                    <h5 className='text-lg font-semibold'>{receiverInfo?.name}</h5>
                    <img 
                        src={receiverInfo?.img}
                        className="rounded-full h-10 w-10"
                    />
    
            </div>
                :

             <>
         {receiverInfo?.firstName?.length>0 &&
                    <div className='flex items-center justify-center space-x-4 '>

                        <h5 className='text-lg font-semibold'>
                            {receiverInfo?.firstName + " " + receiverInfo?.lastName }
                        </h5>
                        <img 
                        src={receiverInfo?.img}
                        className="rounded-full h-10 w-10"
                        />
                   </div>


                }
             </>

        }

       <div className='flex flex-col w-full space-y-6 overflow-y-scroll h-full'>
          {msgs?.length>0&&msgs?.map((msg)=>{
             return(
                <Chat
                 msg={msg}
                 group={group}
                 />
             )
           })

          }

          {msgs?.length===0&&
            <div className='flex justify-center py-6'>
                <h5 className='text-sm font-light '>No messages</h5>
            </div>

          }

       </div>

       <div className='flex items-center space-x-4 pt-6'>
          <textarea
            placeholder='Type a message'
            className='py-1 px-4 rounded-md w-full text-sm font-semibold border outline-none'
            onChange={(e)=>setNewMessage(e.target.value)}
          />
          <button 
            className='text-white bg-blue-600 rounded-lg py-2 px-6 text-sm '
            onClick={send}
           >Send</button>

          

       </div>

    </div>
  )
}







