import React,{useState} from 'react'
import Tabs from "../components/tabs"
import { Outlet } from 'react-router-dom'
import Posts from './posts'
import Members from './members'

export default function EcoFeed({group}) {
  const [active,setActive]=useState("feed")
  return (
    <div className='py-6'>
        <div className='lg:w-full overflow-y-auto h-full '>
            <Tabs 
               setActive={setActive}
               active={active}
            />
        </div>

        <div className='py-6'>
          {active==="feed"&&<Posts group={group}/>}
          {active==="members"&&<Members group={group} />}
           
        </div>

                

    </div>
  )
}
