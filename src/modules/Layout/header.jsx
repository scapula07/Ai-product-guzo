import React ,{useState} from 'react'
import SearchBar from './searchBar'
import {IoMdNotificationsOutline} from "react-icons/io"
import {BiMenu} from "react-icons/bi"
import { Drawer } from "@mui/material";
import SidePanel from './sidePanel';
import TabsPanel from './tabsPanel';

export default function Header() {
    const [trigger,setTrigger]=useState(false)
  return (
    <div className='w-full flex lg:justify-end items-center z-20 relative ' style={{background: "rgba(242, 242, 242, 0.6)"}}>
        <div className='lg:hidden flex justify-start w-1/4'>
            <BiMenu 
            className='lg:hidden block text-3xl font-semibold'
            onClick={()=>setTrigger(true)}
            />
        </div>
       

        <div className='flex items-center space-x-10 '>
            <SearchBar />

            <div className='flex items-center space-x-4'>
                <h5 className='flex '>
                   <IoMdNotificationsOutline 
                       className='lg:text-3xl text-xl '
                   />
                   <span className='bg-red-500 lg:h-1.5 lg:w-1.5 h-1 w-1 rounded-full -ml-3 mt-1'></span>
                </h5>

                <img 
                  src=""
                  className='lg:w-8 lg:h-8 w-6 h-6 rounded-full'
                />
               

            </div>
        </div>

{/* 
        {trigger&&
          <div  className=' sm:hidden  fixed top-0 left-0 w-3/4 bg-white z-10 h-screen py-6 px-6'>

          </div>


        } */}
          <div className='lg:hidden block'> 
           <Drawer open={trigger} onClose={() => setTrigger(false)}  >
               <div  className='  fixed top-0 left-0 w-3/4 bg-white z-10 h-screen py-6 px-1 flex'>
                <div className='w-1/4 border-r h-full '>
                    <SidePanel />
                    </div>
                    <div className=' h-full w-4/5 '>
                    <TabsPanel />

                    </div>

                </div>


           </Drawer>
           </div>

    </div>
  )
}
