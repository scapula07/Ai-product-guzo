import React, { useState } from 'react'
import mail from "../../../assets/icons/email.png"
import gmail from "../../../assets/icons/google.png"
import linkdin from "../../../assets/icons/linkdin.png"
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import { Link } from 'react-router-dom'

import { useNavigate } from "react-router-dom";
import { authApi } from '../../_api/auth'


export default function AuthTypes() {
   let navigate = useNavigate();

    const [activeAuth,setAuth]=useState("")
    const account =useRecoilValue(accountTypeState)
    console.log(account,"avcc")

 



    const auths=[
        {
            icon:gmail,
            name:"Sign up with Google",
            link:"",
            click:async()=>{
             const user=await authApi.googleAuth(account)
             let route=""
              if(account==="Organization"){
                  route="org"
                }else if(account==="Ecosystem"){
                  route="ecosystem"
              }

               localStorage.clear();
               localStorage.setItem('user',JSON.stringify(user));

               user?.id.length >0&& navigate(`/create-profile/${route}`)

               console.log(route,"rrrr")
             

            }
            
    
        },
        {
            icon:linkdin,
            name:"Sign up with LinkedIn",
            link:"",
            click:async()=>{
              const user=await authApi.linkedinAuth()
              // let route=""
              //  if(account==="Organization"){
              //      route="org"
              //    }else if(account==="Ecosystem"){
              //      route="ecosystem"
              //  }
 
              //   localStorage.clear();
              //   localStorage.setItem('user',JSON.stringify(user));
 
              //   user?.id.length >0&& navigate(`/create-profile/${route}`)
 
              //   console.log(route,"rrrr")
              
 
             }
    
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
            <div className='w-4/5 flex bg-white rounded-lg  border flex-col items-center py-8 space-y-8 ' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
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
                            
          

                             <h5 className="font-light text-sm">
                              {auth?.name}
                                
                               
                                </h5>

                          
                        
                          
                        </div>
                        </>
                     )
                 })
                 }


                 <div className='flex flex-col space-y-4 items-center w-full'>
                    <h5 className='h-0.5  w-1/3 text-black border '></h5>
                    <div className='flex flex-col space-y-2 items-center w-full'>
                      <h5>Already have an account?</h5>
                     <Link to="login">
                        <button className='border border-blue-700 text-blue-700 rounded-full px-10 py-1'>Sign in</button>
                     </Link>
   

                    </div>


                 </div>
 
            </div>

    </div>
  )
}


