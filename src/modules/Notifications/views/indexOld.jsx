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
import { db } from '../../Firebase'
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc ,deleteDoc, where,or} from 'firebase/firestore'

export default function Notifications() {
    const [currentUser,setCurrentUser] =useRecoilState(userState)
    const group =useRecoilValue(groupState)
    const [isUpdate,setUpdatedState]=useRecoilState(updateUserState)
    const [notifications,setNotifications]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [areNotification,setAre]=useState("")

          useEffect(()=>{

      

          if(currentUser?.id?.length >0){
              // const q = query(collection(db, "notifications"), where("to","==",currentUser?.id));
                  //       const q = query(
                  //   collection(db, 'posts'),
                  //     or(where('creator_id', '==', group?.id),
                  //       where('access', 'array-contains', group?.id)
                  //     ),orderBy('createdAt', 'desc')
                  // );
               const q = query(collection(db,"notifications"),
                   or(where('to', '==', currentUser?.id),
                    where('to', '==', group?.id)
                     ),orderBy('date', 'desc')
                );
              
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
            
                return () => {
                  unsubscribe()
        
              };
        
            }
        
        },[])
   

        console.log(notifications,"notiiiii")
  return (
    <Layout>
        <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Notifications</h5>
           
        </div>
         <div className='flex flex-col w-full h-full space-y-7 overflow-y-scroll py-6 no-scrollbar space-y-10'>

              <div className='flex flex-col space-y-4'>
                    <h5 className="text-lg font-semibold" style={{color:"#212121"}}>Global</h5>

                    <div className='flex flex-col '>
                       { 
                          notifications?.filter((notification)=>notification?.to===currentUser?.id)?.map((notification)=>{
                          console.log(notification,"notification global")
                          return(
                            <>
                            {notification?.type==="join request"&&notification?.type==="action"&&
                              <Notification 
                                notification={notification}
                                currentUser={currentUser}
                                setNotifications={setNotifications}
                                setCurrentUser={setCurrentUser}
                                isUpdate={isUpdate}
                                setUpdatedState={setUpdatedState}
                              />

                             }
                            </>
                          )
                        })

                        }

                    </div>
                   

                </div>


                <div className='flex flex-col space-y-4'>
                     {group?.type?.length >0?
                         <h5 className="text-lg font-semibold" style={{color:"#212121"}}>{group?.name}</h5>
                         :
                         <h5 className="text-lg font-semibold" style={{color:"#212121"}}>{group?.display}</h5>

                      }
                     

                      <div className='flex flex-col '>
                    {
                      notifications?.filter((notification)=>notification?.to===group?.id)?.map((notification)=>{
                            console.log(notification,"notification account")
                       return(
                          <>
                          {notification?.type!="join request"&&

                          
                              <Notification 
                                  notification={notification}
                                  currentUser={currentUser}
                                  setNotifications={setNotifications}
                                  setCurrentUser={setCurrentUser}
                                  isUpdate={isUpdate}
                                  setUpdatedState={setUpdatedState}
                                />
                          }

                         </>
                          )
                        })

                      }


                      </div>
            
                 </div>
            

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
    const [ignore,setIgnore]=useState(false)
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
              const response =await notificationApi.acceptTeamInvite(notification?.id,notification?.from,currentUser,notification?.name,notification?.img)
              response&&setAccept(false)
           }catch(e){
            console.log(e)
            setAccept(false)
            setErrorMsg(e.message)
          }
       }
       const handleignore=async()=>{
        setErrorMsg(null)
        setIgnore(true)
          try{
              const response =await notificationApi.declineTeamInvite(notification?.id,notification?.from,currentUser,notification?.name,notification?.img)
              response&&setIgnore(false)
           }catch(e){
            console.log(e)
            setIgnore(false)
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
                          {ignore?
                
                                <ClipLoader 
                                    color={"rgba(62, 51, 221, 1)"}
                                

                                />
                            
                                :
                           <h5 className='text-slate-500 font-semibold text-sm'
                           onClick={()=>handleignore()}
                           >Ignore</h5>
                          }
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
