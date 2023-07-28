import React from 'react'
import dm1 from "../../assets/feedorg.png"
import dm2 from "../../assets/orgcover.png"
import {BsThreeDots} from "react-icons/bs"

export default function Dmcontacts() {
  return (
    <div className='w-full flex flex-col space-y-6'>
        {contacts.map((contact)=>{
             return(
                <div className='flex items-center space-x-4  '>
                    <img 
                    className="rounded-full h-10 w-10"
                    src={contact?.img}
                    />

                    <div className='flex justify-between items-center w-full'>
                        <div className='flex flex-col'>
                            <h5 className='font-semibold text-lg'>{contact?.name}</h5>
                            <h5 className='text-sm'>{contact?.type}</h5>
                        </div>
                        <BsThreeDots />
                    </div>
                 
                </div>
             )
        })

        }


    </div>
  )
}


const contacts=[
     {
        img:dm1,
        name:"Ion Houston",
        type:"Ecosystem"
      },
      {
        img:dm2,
        name:"Ion Houston",
        type:"Ecosystem"
      },
      {
        img:dm1,
        name:"Ion Houston",
        type:"Ecosystem"
      },
]