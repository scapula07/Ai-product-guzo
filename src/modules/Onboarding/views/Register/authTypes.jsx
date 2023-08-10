import React, { useState } from 'react'
import mail from "../../../assets/icons/email.png"
import gmail from "../../../assets/icons/google.png"
import linkdin from "../../../assets/icons/linkdin.png"
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import { Link } from 'react-router-dom'
import { click } from '@testing-library/user-event/dist/click'
import { useNavigate } from "react-router-dom";
import { authApi } from '../../_api/auth'


export default function AuthTypes() {
  
    const [activeAuth,setAuth]=useState("")
    const account =useRecoilValue(accountTypeState)
    console.log(account,"avcc")

    let navigate = useNavigate();



    const auths=[
        {
            icon:gmail,
            name:"Sign up with Google",
            link:"",
            click:()=>{authApi.googleAuth()}
            
    
        },
        {
            icon:linkdin,
            name:"Sign up with LinkedIn",
            link:"",
            click:()=>{navigate("email-password")}
    
        },
        {
            icon:mail,
            name:"Sign up with Email",
            link:"",
            click:()=>{navigate("email-password")}
        }
     ]
  return (
    <div className='w-full flex justify-center  '>
            <div className='w-1/2 flex bg-white rounded-lg h-96 border flex-col items-center py-8 space-y-8 ' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold '>Sign up for Guzo</h5>

                 {auths?.map((auth)=>{
                   
                
                     return(
                        <>
                        <div className='flex items-center space-x-6 px-4 w-2/5 border py-3 rounded-lg '
                          onClick={auth?.click}
                        >
                            <img  
                              src={auth?.icon}
                              className="w-4"
                            />
                            
                                 {/* <Link to={`${activeAuth="Sign up with Email" ? "email-password": "2fa"}`}>
                                   <h5 className="font-light text-sm">{auth?.name}</h5>
                                </Link> */}

                             <h5 className="font-light text-sm">
                              {auth?.name}
                                {/* {activeAuth==="Sign up with Email" ?
                                   <Link to="email-password"> </Link>
                                   :
                                    <span click={auth?.click}>{auth?.name}</span>   

                                } */}
                               
                                </h5>

                          
                        
                          
                        </div>
                        </>
                     )
                 })
                 }
 
            </div>

    </div>
  )
}


