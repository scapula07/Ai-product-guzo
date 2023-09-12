import React from 'react'
import { Link } from 'react-router-dom'
import {FiMessageSquare } from "react-icons/fi"
import {BsThreeDots } from "react-icons/bs"

export default function ActiveMember({member,group}) {
  return (

    <div className='flex flex-col bg-white py-4 px-4 rounded-lg'>
        {member?.type?.length >0?
            <div className='flex flex-col items-center space-y-3'>
                <img 
                    src={member?.img}
                    className="rounded-full w-32 h-32"
                />
                <h5 className=' text-center font-semibold '>{member?.name}</h5>
                <h5 className='text-sm font-semibold text-slate-600'>
                    {member?.type==="eco"?
                     "Ecosystem"
                      :
                      "Organization"

                    }
                </h5>
         </div>
           :
            <>
             <div className='flex flex-col items-center space-y-3'>
                {member?.img?.length >0?
                   <img 
                   src={member?.img}
                   className="rounded-full w-32 h-32"
                   />

                   :
                   <div className='rounded-full  w-32 h-32 items-center justify-center flex border'
                      >
                    <h5 className='font-semibold text-4xl'> {member?.firstName?.slice(0,1) + member?.lastName?.slice(0,1)}</h5>
                </div>

                 

                }
             
               
                <h5 className=' text-center font-semibold '>{member?.firstName + " " + member?.lastName}</h5>
                <h5 className='text-sm font-semibold text-slate-600'>Ecosystem</h5>
             </div>
             
            </>

           

        }
        

        <div className='flex flex-col items-center space-y-3 py-4'>
            <p className=' text-center font-light text-sm'>
            Worem ipsum dolor sit amet, consectetur adi...
            </p>

            <div className='flex items-center space-x-3 py-2'> 
                <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
                    <Link to={`/messages/${group?.id}`}>
                    <FiMessageSquare 
                        className='text-blue-600 text-2xl '
                    />
                    </Link>
                    
                </h5>
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
