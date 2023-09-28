import React,{useState,useEffect} from 'react'
import Layout from '../../Layout'
import Table from '../components/table'
import Modal from '../../Modal'
import {AiOutlineClose } from "react-icons/ai"
import { userState,groupState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import { teamApi } from '../_api/team'
import { inviteEmail } from '../_api/email'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";


export default function Teammates() {
    const [trigger,setTrigger]=useState(false)
    const group =useRecoilValue(groupState)
    const currentUser=useRecoilValue(userState)
    const [teams,setTeam]=useState([])
    const [isLoading,setLoader]=useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [invitee,setInvitee]=useState({})
  
    
    const [open, setOpen] = useState(false);
    const currentDomain = window.location.hostname;

    console.log(currentDomain,"domain")


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    
    useEffect(()=>{
        const getAllTeammates=async()=>{
            console.log("mmmm")
            const teammates=await teamApi.getAllTeammates(group)
            console.log(teammates,"teammm")
            setTeam(teammates)
         }
        getAllTeammates()
     },[])

     const addTeammates=async()=>{
        setLoader(true)
        setErrorMsg(null)

         try{
   
            const res =await inviteEmail.sendInvite(invitee)
            console.log(res,"res")
           if( res ===200){
               console.log("sent succesfully")
                const response =await teamApi.addInvitee(invitee,group)
                console.log(response,"ressss")
                response?.status&&setTrigger(false)
                response?.status&&setLoader(false)
                response?.status&&setTeam(response)
            }
            
                // const response =await teamApi.addInvitee(invitee,group)
                // console.log(response,"ressss")
                // response?.status&&setTrigger(false)
                // response?.status&&setLoader(false)
                // response?.status&&setTeam(response)

         }catch(e){
            console.log(e,"Errrr")
            setLoader(false)
            setErrorMsg(e?.message)
         }

        }
  
  return (
    <Layout>

            <div className='py-2 flex-col flex space-y-4 px-10'> 
                <h5 className='text-slate-700 font-semibold lg:text-xl text-sm'>Teammates</h5>
                
            </div>
            <div className=' w-full h-full space-y-4 px-10 flex flex-col'>
                <div className='flex items-center justify-between'>
                     <h5 className='text-blue-700' 
                       onClick={()=>window.history.back(-1)}
                     >Back to settings</h5>

                 <button className='text-blue-700 rounded-full px-8 py-1.5'
                    style={{background: "rgba(236, 235, 254, 1)"}}
                    onClick={()=>setTrigger(true)}
                    >
                       Add Teammates
                </button>


                </div>
                <div className='w-full overflow-y-auto h-full '>
                   <Table
                      teams={teams}
                      group={group}
                      currentUser={currentUser}
                    />


                </div>
            </div>

            <Modal trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg " >
                    <div className='flex flex-col px-4 py-4'>
                         <div className=''>
                            <h5 className='font-semibold text-xl'>Invite others to join your team</h5>

                         </div>
                         {errorMsg && (
                            // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                            <Alert severity="error">{errorMsg}</Alert>
                          )}



                          <Form 
                            invitee={ invitee}
                            setInvitee={setInvitee}
                           
                          />

                          <div className='flex items-center justify-center space-x-4'>
                            <button className='text-blue-700 border-blue-700 border rounded-full px-4 py-1 text-sm'
                            
                                onClick={()=>setTrigger(false) || setLoader(false)}
                                 >
                                  Cancel
                       
                               </button>
                               {isLoading?
                             
                                    <ClipLoader 
                                        color={"rgba(62, 51, 221, 1)"}
                                        loading={isLoading}
                                    />
                             :
                              <button className='text-blue-700 rounded-full px-4 py-1 text-sm'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                onClick={addTeammates}
                             
                                 >
                                    Submit
                       
                               </button>
                              }

                          </div>


                    </div>

            </Modal>

            <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical:"top", horizontal:"center"}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
               Invite sent!
            </Alert>
         </Snackbar>

    </Layout>
  )
}


const Form=({ invitee,setInvitee})=>{
    return(

        <div className='flex flex-col py-8 space-y-6'>
            <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Email</label>
                        <input 
                            placeholder='Email'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            onChange={(e)=>setInvitee({...invitee,email:e.target.value})}
                            
                        />

                </div>

        </div>

    )
}