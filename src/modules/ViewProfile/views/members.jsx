import React,{useState} from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { groupState,userState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import { messageApi } from '../_api/message'
import { useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

export default function ViewMembers({group}) {
  const currentUser =useRecoilValue(userState)
  const active=group?.active?.some(member => member?.id===currentUser?.id)
  const isCreator=group?.creator===currentUser?.id



  console.log(currentUser,"creator")
  return (
    <div className='w-full'>
    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
        {active&&group?.active?.map((member)=>{
            return(
              <Member 
                  member={member}
                  currentUser={currentUser}
              />
             )
        })

        }
          {isCreator&&group?.active?.map((member)=>{
            return(
                <Member 
                   member={member}
                   currentUser={currentUser}
                />
                 )
             })

           }

      </div>

        <div className='flex items-center py-4 w-full'>
          {group?.active?.length ===0&&
              <h5 className='text-sm font-light '>No active member</h5>
              }
        </div>
      </div>
  )
}




const Member=({member,currentUser})=>{
  console.log(currentUser,"member")
  let navigate = useNavigate();
  const [isLoading,setLoading]=useState(false)


   const startConversation=async()=>{
      setLoading(true)
      try{
          const response=await messageApi.startConversation(member,currentUser)
          console.log(response,"msg res")
          setLoading(false)
          response && navigate("/messages")
          setLoading(false)
          

        }catch(e){
          console.log(e)
        }

      }
  return(
       
    <div className='flex flex-col bg-white py-4 px-4'>
    <div className='flex flex-col items-center space-y-3'>
        <img 
          src={member?.img}
          className="rounded-full w-32 h-32"
        />
        <h5 className=' text-center font-semibold '>{member?.firstName + " " + member?.lastName}</h5>
        <h5 className='text-sm font-semibold text-slate-600'>Ecosystem</h5>
    </div>

    <div className='flex flex-col items-center space-y-3 py-4'>
        <p className=' text-center font-light text-sm'>
        Worem ipsum dolor sit amet, consectetur adi...
        </p>
        
        <div className='flex items-center space-x-3 py-2'> 
           {isLoading?
                 
                 <ClipLoader 
                     color={"rgba(62, 51, 221, 1)"}
                     loading={isLoading}
                 />
                 :
            <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>

             
                <FiMessageSquare 
                      className='text-blue-600 text-2xl '
                      onClick={startConversation}
                  />
               
             
                </h5>
           }
           <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
              <BsThreeDots 
                   className='text-blue-600 text-2xl'
              />
           </h5>
        </div>
    </div>

</div>



  )
}