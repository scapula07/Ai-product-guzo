import React ,{useState} from 'react'
import {MdNotificationsActive} from "react-icons/md"
import {BsToggleOn,BsToggle2Off} from "react-icons/bs"
import { messaging } from '../Firebase'
import { getToken } from 'firebase/messaging'
import { notificationApi } from './api'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";


export default function NotificationPermission({setNotificationOpen,currentUser}) {
  
  const [isLoading,setLoader]=useState(false)
  const [errorMsg, setErrorMsg] = useState(null)


  const requestPermission=()=>{
    setLoader(true)
      Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken(messaging, { vapidKey: 'BJzfHRUOH_Q9PG-4pgN0ho0hT9_jf8AMT4lywWQtkK134oLlCOGzex8W7C4tgZaPYJDhiDHsnTvr2yf9qsrthqI' }).then(async(currentToken) => {
            console.log(currentToken,"token")
            try{
              const response=await notificationApi.updateNotificationToken(currentUser,currentToken)
              response?.id?.length>0&&localStorage.setItem('user',JSON.stringify(response));
              response?.id?.length>0&&setNotificationOpen(false)
             }catch(e){
              console.log(e)
              setLoader(false)
            }



          }).catch((e)=>{
           console.log(e)
            setLoader(false)
         })
      }})

    }

   

    
  
   return (
    <div className='flex flex-col bg-white py-4 px-6'>
        <div className='flex items-center space-x-4'>
            <MdNotificationsActive
              className='text-3xl font-semibold text-slate-600'
             />
            <h5 className='text-sm font-semibold'>Guzo wants permission to send notification</h5>
        </div>

         <div className='flex items-center py-3'>
            {isLoading?
                             
              <ClipLoader 
                  color={"rgba(62, 51, 221, 1)"}
                  loading={isLoading}
              />
              :
              <button
                  style={{background: "rgba(236, 235, 254, 1)"}}
                  className='text-blue-700 rounded-md px-8 py-1.5'
                  onClick={()=> requestPermission()}
                
                >
                  Grants permission
                </button>
             }

         </div>

    </div>
   )
}
