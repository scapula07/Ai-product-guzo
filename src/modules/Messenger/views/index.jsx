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
       query, where,updateDoc,orderBy,onSnapshot} from "firebase/firestore"
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

   const [isLoading,setLoader]=useState(false)
   const [newMessage, setNewMessage] = useState("");
   const [areContacts,setContacts]=useState("")



    useEffect(()=>{
      const getConversations = async () => {
          try{
          
            console.log(currentUser?.id,"cur conv")
            const q = query(collection(db, "conversations"), where("members", "array-contains",currentUser?.id),orderBy("lastMessage", "desc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const convs= [];
              querySnapshot.forEach((doc) => {
                  convs.push({...doc?.data(),id:doc?.id});
               
              });
                 convs?.length===0 &&setContacts("No contact")
                 convs?.length >0 &&setContacts("")
              setConversations(convs)
            })
            
      
         
           }catch(error){
            console.log(error)
          }
        };
        if(currentUser?.id?.length >0){
          getConversations();
        }
        
   
       },[currentUser?.id,active])  

       useEffect(()=>{
           const seen=async()=>{
              const result = await updateDoc(doc(db,"unseen",currentUser?.id), {
                messages:false
              })
           }

           currentUser?.id?.length >0&& seen()
           
         },[currentUser?.id])

     console.log(groups,"grou chatatt")


     const send=async (e)=>{
        console.log(newMessage,"sending")
        if (newMessage?.length == 0) {
          return;
        }
        e.preventDefault();
        setLoader(true)
        
        const message = {
          sender: {
               id:currentUser?.id,
               img: currentUser?.img?.length >0?currentUser?.img :"",
               type:currentUser?.type?.length>0&&currentUser?.type ,
               name:currentUser?.type?.length==undefined?currentUser?.display :currentUser?.name,
             
          },
          text: newMessage,
          conversationid:currentChat.id,
          date:Number(Date.now()),
          time:new Date()
        };
        const receiverId = currentChat?.members.find(
          (member) => member !== currentUser.id
        );
 
          setTextsubmit(false)
        try{
          
            const docRef = await addDoc(collection(db, "messages"),message);
        
             const docSnap = await getDoc(docRef);
             console.log(docSnap?.data(),"came")
             docSnap?.exists()&& setNewMessage("")
             docSnap?.exists()&& setLoader(false)
             const receiver= currentChat?.members?.find((member)=>member !=currentUser?.id )
             console.log(receiver,"reci")
             const result = await updateDoc(doc(db,"unseen",receiver), {
                 messages:true
               })
            await updateDoc(doc(db,"conversations",currentChat?.id), {
               lastMessage:Number(new Date()),
               unseen:true,
               lastSender:currentUser?.id
              })

       
      
            }catch (err) {
              console.log(err)
              setLoader(false)
          }
      }
  
    console.log(currentChat,"conversations chat")


  return (
    <Layout>
        <div className='py-2 flex-col flex space-y-4 px-12'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Messages</h5>
           
        </div>
       <div className='flex w-full space-x-6 px-12'>
          <div className='w-1/3   overflow-y-scroll no-scrollbar' style={{ height:"80vh"}}>
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
                areContacts={areContacts}
               
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
                conversations={conversations}
                newMessage={newMessage}
                isLoading={isLoading}
                
                
              
              />

            }

             {/* {active==="group"&&
              <GroupChat 
              currentChat={currentChat}
              messages={messages}
              send={send}
              setNewMessage={setNewMessage}
              currentUser={currentUser}
              receiverInfo={receiverInfo}
              conversations={groups}
              newMessage={newMessage}
              isLoading={isLoading}
       

            />

             } */}

         </div>


       </div>
    </Layout>
   
  )
}
