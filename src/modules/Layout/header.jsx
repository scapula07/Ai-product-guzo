import React ,{useState} from 'react'
import SearchBar from './searchBar'
import {IoMdNotificationsOutline} from "react-icons/io"
import {BiMenu} from "react-icons/bi"
import { Drawer } from "@mui/material";
import SidePanel from './sidePanel';
import TabsPanel from './tabsPanel';
import {useRecoilState,useRecoilValue} from "recoil"
import { userState } from '../Recoil/globalstate'
import LogOut from './logout';
import { Link } from 'react-router-dom';

export default function Header({hover,setHover}) {
    const [trigger,setTrigger]=useState(false)
    const currentUser =useRecoilValue(userState)
    console.log(currentUser)
  return (
    <>
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
                <Link to="/notifications">
                    <h5 className='flex '>
                    <IoMdNotificationsOutline 
                        className='lg:text-3xl text-xl '
                    />
                    <span className='bg-red-500 lg:h-1.5 lg:w-1.5 h-1 w-1 rounded-full -ml-3 mt-1'></span>
                    </h5>
                </Link>
          

                <div className='relatiive' onMouseOver={()=>setHover(true)} >
                    {currentUser?.img?.length >0 ?
                        <img 
                            src={currentUser?.img}
                            className='lg:w-12 lg:h-10 w-6 h-6 rounded-full'
                           
                        />
                    :
                    <h5 className='rounded-full bg-blue-600 text-white font-semibold text-sm p-1 border-2 border-white lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center'
                       
                    >
                        {currentUser?.firstName?.slice(0,1) +currentUser?.lastName?.slice(0,1)}

                    </h5>

                    }

                  
                    

                      

                    

                </div>
                
               
               

            </div>
        </div>

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
        {hover&&

       
         <div className='absolute w-full flex justify-end h-96 px-28 z-30' >
            <div className='w-44 h-60 rounded-lg' 
                style={{ background: "rgba(236, 235, 254, 1)"}}
                onMouseOver={()=>setHover(true)}>
                    <LogOut 
                     currentUser={currentUser}
                    />

            </div>


          </div>
         }
    </>
  )
}
