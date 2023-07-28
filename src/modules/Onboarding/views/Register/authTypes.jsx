import React, { useState } from 'react'
import mail from "../../../assets/icons/email.png"
import gmail from "../../../assets/icons/google.png"
import linkdin from "../../../assets/icons/linkdin.png"
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import { Link } from 'react-router-dom'
export default function AuthTypes() {
    const active =useRecoilValue( accountTypeState)
    const [activeAuth,setAuth]=useState("")
  return (
    <div className='w-full flex justify-center  '>
            <div className='w-1/2 flex bg-white rounded-lg h-96 border flex-col items-center py-8 space-y-8 ' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold '>Sign up for Guzo</h5>

                 {auths?.map((auth)=>{
                   
                
                     return(
                        <div className='flex items-center space-x-6 px-4 w-2/5 border py-3 rounded-lg '
                          onClick={()=>setAuth(auth?.name)}
                        >
                            <img  
                              src={auth?.icon}
                              className="w-4"
                            />
                            
                                 {/* <Link to={`${activeAuth="Sign up with Email" ? "email-password": "2fa"}`}>
                                   <h5 className="font-light text-sm">{auth?.name}</h5>
                                </Link> */}

                             <h5 className="font-light text-sm">
                                {activeAuth==="Sign up with Email" ?
                                   <Link to="email-password"> {auth?.name}</Link>
                                   :
                                   <Link to="/new/onboard/2fa"> {auth?.name}</Link>

                                }
                               
                                </h5>

                          
                        
                          
                        </div>
                     )
                 })
                 }
 
            </div>

    </div>
  )
}


 const auths=[
    {
        icon:gmail,
        name:"Sign up with Google",
        link:""

    },
    {
        icon:linkdin,
        name:"Sign up with LinkedIn",
        link:""

    },
    {
        icon:mail,
        name:"Sign up with Email",
        link:""

    }
 ]