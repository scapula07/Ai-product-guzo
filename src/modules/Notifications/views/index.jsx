import React,{useEffect, useState} from 'react'
import img1 from "../../assets/orgcover.png"
import img2 from "../../assets/feedorg.png"
import img3 from "../../assets/gordon.png"
import Layout from '../../Layout'
import { useRecoilValue,useRecoilState } from 'recoil'
import { groupState ,updateUserState,userState} from '../../Recoil/globalstate'
import { notificationApi } from '../api'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";


export default function Notifications() {
    const [currentUser,setCurrentUser] =useRecoilState(userState)
    const [isUpdate,setUpdatedState]=useRecoilState(updateUserState)
    const [notifications,setNotifications]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [areNotification,setAre]=useState("")



    useEffect(()=>{
         const getNotifications=async()=>{ 
            console.log(currentUser?.id,"iddd")
            const response =await  notificationApi.getNotifications(currentUser?.id)
            response?.length===0 &&setAre("No notifications")
            response?.length>0 &&setAre("")
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
                    setCurrentUser={setCurrentUser}
                    isUpdate={isUpdate}
                    setUpdatedState={setUpdatedState}
                />
                )
            })

            }

        {areNotification?.length===0&&notifications?.length ===0&&
                    <div className='w-full flex justify-center py-10'>
                      <ClipLoader 
                            color={"rgba(62, 51, 221, 1)"}
                            loading={true}
                        />
                    </div>
                    }

                    {areNotification?.length >0&&
                      <div className='w-full flex justify-center py-10'>
                          <h5 className="text-lg font-semibold">You dont have any notification</h5>
                      </div>

                    }

        </div>

    </Layout>

  )
}

const Notification=({notification,currentUser,setNotifications,setCurrentUser,isUpdate,setUpdatedState})=>{
    const [accepted,setAccept]=useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const [open, setOpen] = useState(false);



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    


      const accept=async()=>{
        setErrorMsg(null)
        setAccept(true)
          try{
            const response =await notificationApi.acceptTeamInvite(notification?.id,notification?.from,currentUser)
            response?.status&&setNotifications(response?.notifications)
            // const user = localStorage.getItem("user");
            // console.log(JSON.parse(user),"user")
            // console.log(user,"user notification")
            // response?.status&&setCurrentUser(JSON.parse(user))
            // response?.status&&setUpdatedState(!isUpdate)
         
            response?.status&&setAccept(false)
           }catch(e){
            console.log(e)
            setAccept(false)
            setErrorMsg(e.message)
          }
       }
    return(
      <>
          <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical:"bottom", horizontal:"left"}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
               {errorMsg}
            </Alert>
         </Snackbar>

     
        <div className='flex items-center border-b py-2 space-x-7'>
            
           

            
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

        </>
    )
}
