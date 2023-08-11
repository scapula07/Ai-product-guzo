import React from 'react'
import {AiFillHome} from "react-icons/ai"
import home from "../assets/icons/home.png"
import user from "../assets/icons/user.png"
import icon from "../assets/icon.png"
import connections from "../assets/icons/connections.png"
import message from "../assets/icons/message.png"
import opportunity from "../assets/icons/opportunity.png"
import ecosystem from "../assets/icons/ecosystem.png"
import { Link } from 'react-router-dom'
import { groupState } from '../Recoil/globalstate'
import {useRecoilValue} from "recoil"

export default function TabsPanel() {
    const group =useRecoilValue(groupState)
  return (
    <div className='py-6  w-full relative h-full'>
        <div className='flex flex-col items-center space-y-10 w-full'>
            <h5 className='font-semibold text-2xl'>{group?.name}</h5>
            <div className='flex flex-col py-20 space-y-6'>
                {navs.map((nav)=>{
                     return(
                        <div className='flex items-center space-x-6'>
                            <img 
                              src={nav?.icon}
                              className="h-5 w-5"
                            />
                            <Link to={nav?.link}>
                            <h5 className='font-semibold'>{nav?.name}</h5>
                            </Link>
                           
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
        icon:home,
        link:"/new"

    },
    {
        name:"Connections",
        icon:connections,
        link:"/new/connections"

    },
    {
        name:"Opportunities",
        icon:opportunity,
        link:"/new/collaborations"
    },
    {
        name:"Ecosystem",
        icon:ecosystem,
        link:"/new/ecosystem"
    },
    {
        name:"Messages",
        icon:message,
        link:"/new/messages"
    },
    {
        name:"Profile",
        icon:user,
        link:"/new/profile"
    },
]