import React,{useState} from 'react'
import Modal from '../Modal'
import {MdDelete} from "react-icons/md"
import {AiOutlineClose } from "react-icons/ai"
import { postApi } from './api'
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { deleteProfile } from './api'

export default function DeleteAccount({group,currentUser}) {

     const [trigger,setTrigger]=useState(false)
     const [isLoading,setLoader]=useState(false)
     const [errorMsg, setErrorMsg] = useState(null)

     const [open, setOpen] = useState(false);

     let navigate =useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


     const deletePost=async()=>{
        setErrorMsg(null)
         setLoader(true)

         try{
            const response =await deleteProfile.deleteAccount(group,currentUser)
            response&&setTrigger(false)
            response&&setLoader(false)
            response&&setOpen(true)
            const accounts=[...currentUser?.ecosystems,...currentUser?.organizations,currentUser?.individual]
           
            console.log(accounts?.length,accounts,"acco")
            
            if(accounts?.length > 1){
            
              response&&navigate("/register/login")
            }else{
              response&&navigate("/create-account")
            }
            

          }catch(e){
            console.log(e)
            setErrorMsg(e.message)
            setLoader(false)
          }
         
     }

  return (
    <>

       
  

          <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical:"top", horizontal:"center"}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Account has been deleted
            </Alert>
         </Snackbar>



              <div className='flex flex-col space-y-4 py-4 px-4 w-full items-center'>
                  <h5 className="text-sm font-semibold text-center">Are you sure you want to delete this account</h5>
                     {errorMsg && (
                        // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                        <Alert severity="error">{errorMsg}</Alert>
                        )}


                  <div className='flex items-center justify-center space-x-4'>
                      {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                           :
                       <button className='text-blue-700 rounded-full px-4 py-1 text-sm'
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             onClick={()=>deletePost()}
                         
                            >
                             Continue
                
                        </button>
                        }

                  </div>

            </div>
         
  
 
    </>
  )
}