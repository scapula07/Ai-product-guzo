import React ,{useEffect,useState} from 'react'
import {useRecoilValue} from "recoil"
import { groupState,userState } from '../../Recoil/globalstate'
import { ecosystemApi } from '../api'

import { useNavigate } from 'react-router-dom'
import ActiveMember from '../components/activeMember'
import PendingMember from '../components/pendingMember'




export default function EcoMembers() {
    const group =useRecoilValue(groupState)
    const currentUser=useRecoilValue(userState)
  

    const [members,setMembers]=useState([])
     useEffect(()=>{
        const getAllMembers=async()=>{
            console.log("mmmm")
           const members=await ecosystemApi.getAllMembers(group?.id,currentUser)
           setMembers(members)

           console.log("running again")
           }
           getAllMembers()
          },[])
    console.log(members?.active,"mmmm pending")

  return (
      <>
        
       <div className='flex flex-col space-y-6 w-full'>
         <h5 className='font-semibold text-sm'>Pending Members</h5>
            {members?.pending?.map((member)=>{
                return(
                    <PendingMember 
                        member={member}
                        group={ group}
                        setMembers={setMembers}
                    />
            

                )
            })

            }

            <div>
            {members?.pending?.length==0&&
               <h5 className='text-sm  font-light w-full text-center'>No Pending members</h5>
                }
            </div>


            <div className='py-8'>
               <h5 className='font-semibold text-sm'>Active Members</h5>
                <div className='grid grid-flow-row grid-cols-4  gap-4 gap-y-8 h-full w-full py-6'>
                {members?.active?.map((member)=>{
                    return(
                        <ActiveMember 
                            member={member}
                            group={group}
                           
                        />
                

                    )
                })

                }

               </div>
               {members?.active?.length==0&&
                  <h5 className='text-sm  font-light w-full text-center'>No Active members</h5>
                }

                
            </div>

      </div>

      </>
  )
}


