import React,{useState,useEffect} from 'react'
import SidePanel from './sidePanel'
import TabsPanel from './tabsPanel'
import Header from './header'
import {useRecoilValue,useRecoilState} from "recoil"
import { groupState,userState } from '../Recoil/globalstate'


export default function Layout({children}) {
    const [hover,setHover]=useState(false)
    const [currentUser,setcurrentUser]=useRecoilState(userState)
    const user = localStorage.getItem("user");
    useEffect( ()=>{
      
      console.log(JSON.parse(user),"user")
      setcurrentUser(JSON.parse(user))
      },[])
  return (
     <div className='w-full overflow-x-hidden overflow-y-hidden h-screen' 
        style={{background: "rgba(242, 242, 242, 0.6)"}}
        onMouseOut={()=>setHover(false)}
      >
        <div className='flex w-full h-full relative'>

            <div className='w-1/4  h-full overflow-y-hidden lg:flex  hidden'>
                <div className='w-1/5 border-r h-full '>
                   <SidePanel />
                </div>
                <div className=' border-r h-full w-4/5 '>
                   <TabsPanel />

                </div>
               
               
            </div>
            <div className='lg:w-3/4 w-full relative pt-8 lg:px-8 px-4 h-full'>
               <div className='absolute top-0 w-full py-8 lg:px-16 px-4 z-30' style={{background: "rgba(242, 242, 242, 0.6)"}}>
                   <Header 
                    hover={hover}
                    setHover={setHover}
                   />
                </div> 
               <div className='lg:pt-20 pt-8 overflow-y-auto h-full w-full no-scrollbar' >
                {children}
               </div>
                
            </div>



        </div>

    </div>
  )
}
