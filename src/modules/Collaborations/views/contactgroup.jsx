import React from 'react'

import {BsThreeDots} from "react-icons/bs"

export default function Contactgroup({collabs}) {
    

  return (
    <div className='flex flex-col py-4'>
        <button className='text-blue-700 rounded-full px-8 py-1.5'
            style={{background: "rgba(236, 235, 254, 1)"}}
           >
           Create Contact Group
        </button>

        <div className=' flex flex-col overflow-y-scroll h-screen space-y-2 py-2'>
            {collabs?.map((collab)=>{
                 return(
                    <div className='bg-white rounded-lg flex justify-between py-2 px-2'>
                        <div className='flex flex-col'>
                            <h5 className='text-sm font-semibold'>{collab?.post?.title}</h5>
                            <h5 className='text-xs font-light'># of Contacts: {collab?.partners?.length}</h5>
                        </div>
                        <div className=''>
                            <BsThreeDots />
                        </div>
                    </div>
                 )
            })

            }

        </div>


    </div>
  )
}


const contacts=[
    {name:"Guzo Project",
     no:"212"
    },
    {name:"Cup Of JoeY - Coffee Meetups",
     no:"377"
    },
    {name:"NASA Talks",
     no:"2457"
    },
    {name:"Startup Showcase",
     no:"25"
    },
    {name:"Activation Festival",
     no:"213"
    },
    {name:"Startup Investor Studio",
     no:"212"
    },
    {name:"Ion Block Party",
     no:"212"
    },
    {name:"Open Accelerator",
     no:"212"
    },
    {name:"Open Accelerator",
     no:"212"
    },
    {name:"Open Accelerator",
     no:"212"
    },
    {name:"Open Accelerator",
     no:"212"
    },
    {name:"Open Accelerator",
     no:"212"
    },
    {name:"Open Accelerator",
     no:"212"
    }
]
