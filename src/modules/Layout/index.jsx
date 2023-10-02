import React,{useState,useEffect} from 'react'
import SidePanel from './sidePanel'
import TabsPanel from './tabsPanel'
import Header from './header'
import {useRecoilValue,useRecoilState} from "recoil"
import { groupState,userState } from '../Recoil/globalstate'
import NotificationPermission from '../NotificationPermission'

export default function Layout({children}) {
    const [hover,setHover]=useState(false)
    const [currentUser,setcurrentUser]=useRecoilState(userState)
    const user = localStorage.getItem("user");
    const [notificationOpen, setNotificationOpen] = useState(false);


    const handleNotificationOpen = () => {
      setNotificationOpen(true);
  
      // Close the notification after a specified duration
       setTimeout(() => {
        setNotificationOpen(false);
       }, 100000); // Adjust the duration as needed (in milliseconds)
    };
  




    useEffect( ()=>{
      
      console.log(JSON.parse(user),"user")
      console.log()
      JSON.parse(user)?.notificationToken?.length===undefined&&handleNotificationOpen()
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
                  {window.location.pathname.includes("/eco-profile")?
                     <div className='w-full flex px-6 py-10'>
                              <button
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                className='text-blue-700 rounded-full  px-8 py-1.5'
                                onClick={()=>window.history.go(-1)}
                              >
                                Back
                            </button>
                    </div>
            
                    :
                    <TabsPanel />

                  }
                   

                </div>
               
               
            </div>
            <div className='lg:w-4/5 w-full relative pt-8 lg:px-8 px-4 h-full'>
               <div className='absolute top-0 w-full py-8 lg:px-16 px-4 z-30' style={{background: "rgba(242, 242, 242, 0.6)"}}>
                   <Header 
                    hover={hover}
                    setHover={setHover}
                   />
                </div> 
               <div className='lg:pt-20 pt-8 overflow-y-auto h-full w-full no-scrollbar' >
                {children}
               </div>
                {/* {notificationOpen&&
                   <div className='absolute bottom-0 w-full flex justify-end px-10 z-30 py-8 '>
                        <NotificationPermission
                          setNotificationOpen={setNotificationOpen} 
                          currentUser={currentUser}
                        />
                    </div>
                } */}
                
            </div>



        </div>

    </div>
  )
}
