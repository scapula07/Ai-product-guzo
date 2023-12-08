import React,{useEffect,useState} from 'react'
import { useRecoilValue,useRecoilState } from 'recoil'
import { groupState ,updateUserState,userState} from '../../Recoil/globalstate'
import { notificationApi } from '../api'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { db } from '../../Firebase'
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc ,deleteDoc, where,or} from 'firebase/firestore'
 import NotificationCard from '../components/notificationCard';


export default function Global() {
    const [currentUser,setCurrentUser] =useRecoilState(userState)
    const group =useRecoilValue(groupState)
    const [isUpdate,setUpdatedState]=useRecoilState(updateUserState)
    const [notifications,setNotifications]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [areNotification,setAre]=useState("")
  
  
    useEffect(()=>{

      

        if(currentUser?.id?.length >0){
             const q = query(collection(db,"notifications"),where('to', '==', currentUser?.id),orderBy('date', 'desc'));
            
              const notifications= [];
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                     notifications.push({...doc?.data(),id:doc?.id});
                    console.log(doc?.data(),"feeed")
                });
                setNotifications(notifications)
              
              }
              notifications?.length===0 &&setAre("No notfications")
              notifications?.length >0 &&setAre("")
      
              
              });
          
            //   return () => {
            //     unsubscribe()
      
            // };
      
          }
      
      },[currentUser?.id])
      console.log(notifications,global)

      useEffect(()=>{
        const seen=async()=>{
           const result = await updateDoc(doc(db,"unseen",currentUser?.id), {
             notifications:false
           })
        }

        currentUser?.id?.length >0&& seen()
        
      },[currentUser?.id])
 
  return (
    <div className='flex flex-col w-full h-full space-y-7 overflow-y-scroll py-6 no-scrollbar px-4 '>
                   { 
                     notifications?.filter((notification)=>notification?.to===currentUser?.id)?.map((notification)=>{
                          console.log(notification,"notification global")
                          return(
                            <>
                      
                              <NotificationCard
                                notification={notification}
                                currentUser={currentUser}
                                setNotifications={setNotifications}
                                setCurrentUser={setCurrentUser}
                                isUpdate={isUpdate}
                                setUpdatedState={setUpdatedState}
                              />

                             
                            </>
                          )
                        })

                        }

                {areNotification?.length===0&&notifications?.filter((notification)=>notification?.to===currentUser?.id)?.length ===0&&
                    <div className='w-full flex justify-center py-10'>
                      <ClipLoader 
                            color={"rgba(62, 51, 221, 1)"}
                            loading={true}
                        />
                    </div>
                    }

                    {areNotification?.length >0&&
                      <div className='w-full flex justify-center py-10'>
                          <h5 className="text-lg font-semibold">You do not have any notifications.</h5>
                      </div>

                    }
        
    </div>
  )
}
