import React ,{useState} from 'react'
import { authApi } from '../../_api/auth'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function ForgetPassword() {
    let navigate = useNavigate();

     const [email,setEmail]=useState("")
     const [isLoading,setLoader]=useState(false)
     const [errorMsg, setErrorMsg] = useState(null)
     const [sent,setSent]=useState(false)

     const reset=async()=>{
         try{
            setLoader(true)
            console.log("resssss")
            const res= await authApi.resetPassword(email)
            console.log(res,"resssss")
            res&&setLoader(false)
            res&&setSent(true)
            
            
           }catch(e){
             console.log(e)
             setLoader(false)
             setErrorMsg(e.message)

           }

     }
  return (
       <>
        {sent?
           <>
                       
           <div className='w-full flex flex-col items-center bg-white py-10 px-6 space-y-3'>
             <h5 className='text-2xl font-semibold'>Link Sent! </h5>
               <div className='flex flex-col w-full items-center space-y-4'>
                  <p className='w-4/5 text-sm font-semibold'>
                     A password reset link has been sent to the email provided.  If this email is connected to an account on Guzo, you will receive an email that will enable you to reset the password to the account.
                 </p>
                   <Link to="/register/login">
                        <button
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                className='text-blue-700 rounded-full px-12 py-1.5 text-sm'
                            

                                >
                                Close
                            </button>

                   </Link>

               </div>

               </div>
           



           </>
           :

        
           <div className='w-full flex flex-col items-center bg-white py-10 px-6 space-y-3'>
             <h5 className='text-2xl font-semibold'>Reset your Guzo Password</h5>
                <div className='px-10 py-1'>
                    {errorMsg && (
                    //   <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                    <Alert severity="error">{errorMsg}</Alert>
                     )}

                 </div>
                 

               <div className='flex flex-col space-y-4'>
                  <p className='w-3/4 text-sm font-semibold'>Let’s get you back to engaging your ecosystems.Enter your Guzo account email below to reset that lost password.</p>
                  <div className='flex flex-col w-full '>  

                        <label className='text-sm text-slate-600 font-semibold'>Email</label>
                            <input 
                                placeholder='Email'
                                className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>



                </div>

                <div className='flex flex-col items-center space-y-2 py-4'>
                  {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                             :

                            <button
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                className='text-blue-700 rounded-full px-12 py-1.5 text-sm'
                                onClick={reset}

                                >
                                Reset password
                            </button>
                         }
                     <h5 className='text-blue-700'>Back</h5>

                </div>

        </div>

                    }

        </>
  )
}
