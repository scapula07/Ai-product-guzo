import React,{useEffect, useState} from 'react'
import {MdLocationPin} from "react-icons/md"
import { Link } from 'react-router-dom'
import { authApi } from '../../_api/auth'
import { useNavigate } from "react-router-dom";
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";
// import FadeIn from "react-fade-in";
import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";


export default function Login() {
    let navigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();

    },[])
    const [errorMsg, setErrorMsg] = useState(null)
    const account =useRecoilValue(accountTypeState)
    console.log(account,"email")

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isLoading,setLoader]=useState(false)

    const login=async()=>{
         
       
          setLoader(true)
          setErrorMsg(null)

          if (email.length < 3) {
            setErrorMsg(' email is invalid ');
            setLoader(false);
            return;
          }
  
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
              setErrorMsg( "email is invalid" );
              setLoader(false);
          }
          try{
             const user=await authApi.login(email,password)
            
             setLoader(false)
            localStorage.clear();
             user?.id.length >0&&localStorage.setItem('user',JSON.stringify(user));
             user?.id.length >0&& navigate(`/new/`)


            }catch(e){
                console.log(e)
                setLoader(false)
            }
   


        }

  return (
    <div className='w-full flex justify-center  '>
            <div className='w-4/5 flex bg-white rounded-lg  border flex-col  space-y-8 py-8' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold text-center'>Login with Email</h5>
                    <div className='px-10 py-1'>
                        {errorMsg && (
                        // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                        <Alert severity="error">{errorMsg}</Alert>
                        )}

                    </div>

                    <div className='flex flex-col w-full px-10 space-y-4'>
                        
                        <div className='flex flex-col w-full space-y-4'>
                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Email</label>
                                    <input 
                                        placeholder='Email'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Password</label>
                                    <input 
                                        placeholder='Password'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        name="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />

                            </div>

                            



                        </div>

                    </div>
                      

                      <div className='flex flex-col items-center space-y-3'>
                          {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                             :
                            <button className='text-blue-700 rounded-full px-8 py-1.5'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                onClick={login}
                            
                                >
                                Next
                            </button>
                           


                        }

                          <p className='text-sm font-semibold w-1/2'>
                             By signing up, you agree to 

                             <span className='text-blue-700 underline'> Terms of Service</span>, 
                             <span className='text-blue-700 underline'>Privacy Policy</span>, and 
                             <span className='text-blue-700 underline'> Cookie Policy</span>.
                          </p>

                      </div>


                      <div className='flex flex-col space-y-4 items-center w-full'>
                            <h5 className='h-0.5  w-1/3 text-black border '></h5>
                            <div className='flex flex-col space-y-2 items-center w-full'>
                            <h5>Already have an account?</h5>
                            <Link to="/new/onboard/register/email-password">
                                <button className='border border-blue-700 text-blue-700 rounded-full px-10 py-1'>Sign up</button>
                            </Link>
        

                     </div>


                  </div>
               
 
            </div>

    </div>
  )
}


