import React,{useState,useEffect} from 'react'
import Layout from '../../Layout'
import Table from '../components/table'
import Modal from '../../Modal'
import {AiOutlineClose } from "react-icons/ai"
import { userState,groupState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
import { teamApi } from '../_api/team'


export default function Teammates() {
    const [trigger,setTrigger]=useState(false)
    const group =useRecoilValue(groupState)
    const currentUser=useRecoilValue(userState)
    const [teams,setTeam]=useState([])

    
    useEffect(()=>{
        const getAllTeammates=async()=>{
            console.log("mmmm")
           const teammates=await teamApi.getAllTeammates(group?.id,currentUser)
           console.log(teammates,"teammm")
           setTeam(teammates)
        }
        getAllTeammates()
     },[group])
  
  return (
    <Layout>

            <div className='py-2 flex-col flex space-y-4 px-10'> 
                <h5 className='text-slate-700 font-semibold lg:text-xl text-sm'>Teammates</h5>
                
            </div>
            <div className=' w-full h-full space-y-4 px-10 flex flex-col'>
                <div className='flex items-center justify-between'>
                     <h5 className='text-blue-700'>Back to settings</h5>

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
                    />


                </div>
            </div>

            <Modal trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg " >
                    <div className='flex flex-col px-4 py-4'>
                         <div className=''>
                            <h5 className='font-semibold text-xl'>Invite others to join your team</h5>

                         </div>


                          <Form 
                           
                          />

                          <div className='flex items-center justify-center space-x-4'>
                            <button className='text-blue-700 border-blue-700 border rounded-full px-4 py-1 text-sm'
                            
                                onClick={()=>setTrigger(false)}
                                 >
                                  Cancel
                       
                               </button>
                              <button className='text-blue-700 rounded-full px-4 py-1 text-sm'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                             
                                 >
                                    Submit
                       
                               </button>

                          </div>


                    </div>

            </Modal>

    </Layout>
  )
}


const Form=({})=>{
    return(

        <div className='flex flex-col py-8 space-y-6'>
            <div className='flex items-center w-full space-x-4'>
                <div className='flex flex-col w-1/2 space-y-2'>
                    <label className='text-sm text-slate-700'>First Name</label>
                    <input 
                        placeholder='First Name'
                        className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                        name="firstName"
                    

                    />

                </div>
                <div className='flex flex-col w-1/2 space-y-2'>
                    <label className='text-sm text-slate-700'>Last Name</label>
                        <input 
                            placeholder='Last Name'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            
                        />

                </div>

            </div>
            <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Email</label>
                        <input 
                            placeholder='Email'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            
                        />

                </div>

        </div>

    )
}