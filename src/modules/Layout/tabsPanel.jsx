import React from 'react'
import {AiFillHome} from "react-icons/ai"
import home from "../assets/icons/home.png"
import user from "../assets/icons/user.png"
import icon from "../assets/icon.png"
import connections from "../assets/icons/connections.png"
import message from "../assets/icons/message.png"
import opportunity from "../assets/icons/opportunity.png"
import ecosystem from "../assets/icons/ecosystem.png"

export default function TabsPanel() {
  return (
    <div className='py-6  w-full relative h-full'>
        <div className='flex flex-col items-center space-y-10 w-full'>
            <h5 className='font-semibold text-2xl'>Common Desk</h5>
            <div className='flex flex-col py-20 space-y-6'>
                {navs.map((nav)=>{
                     return(
                        <div className='flex items-center space-x-6'>
                            <img 
                              src={nav?.icon}
                              className="h-5 w-5"
                            />
                            <h5 className='font-semibold'>{nav?.name}</h5>
                        </div>
                     )
                })

                 }

                 <div className='py-6'>
                    <button className='font-semibold bg-blue-600 py-2 rounded-full text-white text-sm w-full'>Post</button>
                 </div>


                  </div>
            

                </div>

                <div className='absolute bottom-0 flex w-full justify-center py-6'> 
                   <img 
                     src={icon}
                    />

                 </div>

    </div>
  )
}


const navs=[
    {
        name:"Home",
        icon:home

    },
    {
        name:"Connections",
        icon:connections

    },
    {
        name:"Opportunities",
        icon:opportunity
    },
    {
        name:"Ecosystem",
        icon:ecosystem
    },
    {
        name:"Messages",
        icon:message
    },
    {
        name:"Profile",
        icon:user
    },
]