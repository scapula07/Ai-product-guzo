import React,{useEffect, useState} from 'react'
import img1 from "../../assets/orgcover.png"
import img2 from "../../assets/feedorg.png"
import img3 from "../../assets/gordon.png"
import Layout from '../../Layout'
import { groupState,userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import { notificationApi } from '../api'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";


export default function Notifications() {
    const currentUser =useRecoilValue(userState)
    const [notifications,setNotifications]=useState([])


    useEffect(()=>{
         const getNotifications=async()=>{ 
            console.log(currentUser?.id,"iddd")
            const response =await  notificationApi.getNotifications(currentUser?.id)
            setNotifications(response)
            console.log(response,"notifications")
         }
         getNotifications()

      },[currentUser])
  return (
    <Layout>
        <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Notifications</h5>
           
        </div>
        <div className='flex flex-col w-full h-full space-y-7 overflow-y-scroll py-6 no-scrollbar'>
            {notifications?.map((notification)=>{
                return(
                <Notification 
                    notification={notification}
                    currentUser={currentUser}
                    setNotifications={setNotifications}
                />
                )
            })

            }

        </div>

    </Layout>

  )
}

const Notification=({notification,currentUser,setNotifications})=>{
    const [accepted,setAccept]=useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

      const accept=async()=>{
        setErrorMsg(null)
        setAccept(true)
          try{
            const response =await notificationApi.acceptTeamInvite(notification?.from,currentUser)
            response?.status&&setNotifications(response?.notifications)
            response?.status&&setAccept(false)
          }catch(e){
            console.log(e)
            setAccept(false)
            setErrorMsg(e.message)
          }
       }
    return(
        <div className='flex items-center border-b py-2 space-x-7'>
            
            {errorMsg && (
            // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
            <Alert severity="error">{errorMsg}</Alert>
            )}

            
           <div className='flex items-center space-x-2 w-1/4'>
                <img 
                src={notification?.img}
                className="h-10 w-10 rounded-full"
                />

                <div className='flex flex-col '>
                    <h5 className='font-semibold'>{notification?.name}</h5>
                    {/* <h5 className='text-sm font-light'>{notification?.account}</h5> */}

                </div>
             </div>
              <div className='flex items-center justify-between w-full'>
                <h5 className='font-light text-sm'>{notification?.message}</h5>
                    {notification?.type=="Message"&&
                      <h5 className='text-blue-700 font-semibold text-sm'>Message</h5>

                    }
                    {notification?.type=="join request"&&
                      <div className='flex items-center space-x-8'>
                           <h5 className='text-slate-500 font-semibold text-sm'>Ignore</h5>
                         {accepted?
                
                                <ClipLoader 
                                    color={"rgba(62, 51, 221, 1)"}
                                

                                />
                            
                                :
                            <button className='text-sm font-semibold px-6 py-2 rounded-full text-blue-700 '
                                style={{background:"rgba(236, 235, 254, 1)"}}
                                onClick={()=>accept()}
                                >
                                Accepted
                            </button>
                           }

                        </div>
                     
                    }
                     {notification?.type=="post request"&&
                      <div className='flex items-center space-x-8'>
                           <h5 className='text-slate-500 font-semibold text-sm'>Decline</h5>
                           <button className='text-sm font-semibold px-6 py-2 rounded-full text-blue-700 '
                             style={{background:"rgba(236, 235, 254, 1)"}}>
                              Approve
                           </button>

                        </div>
                     
                    }

             </div>

        </div>
    )
}
