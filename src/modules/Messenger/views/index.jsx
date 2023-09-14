import React,{useEffect,useRef,useState} from 'react'
import Layout from '../../Layout'
import Contacts from '../components/contacts'
import Chatbox from './chatbox'
import { userState,groupState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import { io } from "socket.io-client";
import {doc,setDoc,
       addDoc,collection,
       getDoc,getDocs,
       query, where} from "firebase/firestore"
import { db } from '../../Firebase'
import { useLocation} from "react-router-dom";
import GroupChat from './groupchat'

export default function Messenger() {
   const socket = useRef();

   const location =useLocation()
   const currentUser=useRecoilValue(groupState)
   const [currentChat,setCurrentChat] =useState()
   const [receiverInfo,setReceiver] =useState({})
   const [messages,setMessages]=useState([])
   const [active,setActive]=useState("dm")
   const [conversations,setConversations]=useState([])
   const [groups,setGroups]=useState([])
   const [textsubmit,setTextsubmit]=useState(false)


   const [newMessage, setNewMessage] = useState("");

    useEffect(()=>{
      const getConversations = async () => {
          try{
            console.log(currentUser?.id,"cur conv")
            const q = query(collection(db, "conversations"), where("members", "array-contains",currentUser?.id));
       
            const convSnapshot =await getDocs(q)
            const conversations= convSnapshot?.docs?.map((doc)=> ({...doc?.data(),id:doc?.id}) )
            console.log(conversations,"conversation")
            const qG = query(collection(db, "group"), where("members", "array-contains",currentUser?.id));
       
            const groupSnapshot =await getDocs(qG)
            const groups= groupSnapshot?.docs?.map((doc)=> ({...doc?.data(),id:doc?.id}) )
            console.log(groups,"grrgrggrg")
            setGroups(groups)
            setConversations(conversations)
            console.log(conversations,"conv in index")
         
          }catch(error){
            console.log(error)
          }
        };
      getConversations();
   
     },[currentUser?.id,active])  

     console.log(currentChat,"chatatt")
     const send=async (e)=>{
        console.log("sending")
        e.preventDefault();
        
        const message = {
          sender: currentUser,
          text: newMessage,
          conversationid:currentChat.id,
          date:Number(Date.now()),
          time:Date.now()
        };
        const receiverId = currentChat?.members.find(
          (member) => member !== currentUser.id
        );
 
          setTextsubmit(false)
        try{
          
            const docRef = await addDoc(collection(db, "messages"),message);
        
            const docSnap = await getDoc(docRef);
          
            setMessages([...messages,{...docSnap.data(),id:docSnap.id}]);
            setNewMessage("")
      
            }catch (err) {
              console.log(err)
          }
      }
  
    console.log(newMessage,"conversations")


  return (
    <Layout>
        <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Messages</h5>
           
        </div>
       <div className='flex w-full space-x-6'>
          <div className='w-2/5  bg-white' style={{height:"80vh"}}>
             <Contacts 
                conversations={conversations}
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                currentUser={currentUser}
                receiverInfo={receiverInfo}
                setReceiver={setReceiver}
                groups={groups}
                active={active}
                setActive={setActive}
               
               />
          </div>
          <div className='w-3/5 h-96 bg-white' style={{height:"80vh"}}>
            {active==="dm"&&
                <Chatbox 
                currentChat={currentChat}
                messages={messages}
                send={send}
                setNewMessage={setNewMessage}
                currentUser={currentUser}
                receiverInfo={receiverInfo}
                conversations={groups}
                
              
              />

            }

             {active==="group"&&
              <GroupChat 
              currentChat={currentChat}
              messages={messages}
              send={send}
              setNewMessage={setNewMessage}
              currentUser={currentUser}
              receiverInfo={receiverInfo}
              conversations={conversations}

            />

             }

         </div>


       </div>
    </Layout>
   
  )
}
