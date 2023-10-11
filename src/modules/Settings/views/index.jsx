import React,{useState} from 'react'
import Layout from "../../Layout"
import { Link } from 'react-router-dom'
import { groupState,userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import Modal from '../../Modal'
import {AiOutlineClose } from "react-icons/ai"
import DeleteAccount from '../../DeleteAccount'
export default function Settings() {
  const group =useRecoilValue(groupState)
  const currentUser =useRecoilValue(userState)

  console.log(group,"grouppppp settingssss")
  return (
    <Layout>
         <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Settings</h5>
           
          </div>

          <div className='flex flex-col w-full space-y-4  '>
              
              <Card 
                    title="settings"
                    group={group}
                    currentUser={currentUser}
                    body={[
                      {
                        text: "Change password",
                        link:"/register/reset"

                      },
                      {
                        text: `${group?.type?.length>0? "Teammates" :""}`,
                        link:`/team/${group?.id}`

                      },
                      {
                        text: `${group?.creator==currentUser?.id || group?.display?.length >0 ?"Delete account" :"" }`,
                        link:"",
                    

                      }
                      ]}
              
                />
              {/* <Card 
                  title="Subscriptions and Payments"
                  body={[
                    {
                     text: "Billing Information",
                     link:""
                    },
                    {
                      text: "Manage Subscription",
                      link:``

                    },
                    {
                      text: "View Payment History",
                      link:""

                    }
                    ]}
                 
              /> */}
              {/* <Card 
                  title="Monetization & Privacy"
                  body={[
                    {
                     text: "Manage Ecosystem Privacy",
                     link:""
                    },
                    {
                      text:"Setup Paywall",
                      link:``

                    }
                    ]}
                
                 /> */}

          </div>

  

    </Layout>
   
  )
}


const Card=({title,group,body,currentUser})=>{
  const [trigger,setTrigger]=useState(false)
     return(
        <>
     
        <div className='bg-white w-3/4 flex flex-col space-y-4 px-8 py-6'>
            <h5 className='text-sm font-semibold'>{title}</h5>
            {body?.map((option)=>{
                 return(
                    <>
                     {option?.text!="Delete account"&&
                     <Link to={option?.link}>
                   
                        <h5 className='text-sm font-light'>{option?.text}</h5>
                    </Link>
                        }
                    {option?.text==="Delete account"&&
                      <h5 className='text-sm font-light text-red-600'    onClick={()=>setTrigger(true)}>{option?.text}</h5>

                     }
                     </>
                 )
            })

            }

        </div>

        <Modal trigger={trigger}  cname="w-1/4 py-2   px-4 rounded-lg ">
             <div className='w-full flex justify-end px-6 py-4'>
                <AiOutlineClose 
                   onClick={()=>setTrigger(false)}
                />
              </div>


              <DeleteAccount 
               group={group}
               currentUser={currentUser}
              />

        </Modal>

      
        </>
     )
}