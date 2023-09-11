import React from 'react'
import img1 from "../../assets/orgcover.png"
import img2 from "../../assets/feedorg.png"
import img3 from "../../assets/gordon.png"
import Layout from '../../Layout'
import { groupState,userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'

export default function Notifications() {
    const currentUser =useRecoilValue(userState)
  return (
    <Layout>
        <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Notifications</h5>
           
        </div>
        <div className='flex flex-col w-full h-full space-y-7 overflow-y-scroll py-6 no-scrollbar'>
            {currentUser?.notifications?.map((notification)=>{
                return(
                <Notification 
                    notification={notification}
                />
                )
            })

            }

        </div>

    </Layout>

  )
}

const Notification=({notification})=>{
    return(
        <div className='flex items-center border-b py-2 space-x-7'>
           <div className='flex items-center space-x-2 w-1/4'>
                <img 
                src={notification?.img}
                className="h-10 w-10 rounded-full"
                />

                <div className='flex flex-col '>
                    <h5 className='font-semibold'>{notification?.name}</h5>
                    {/* <h5 className='text-sm font-light'>{notification?.account}</h5> */}

                </div>
             </div>
              <div className='flex items-center justify-between w-full'>
                <h5 className='font-light text-sm'>{notification?.message}</h5>
                    {notification?.type=="Message"&&
                      <h5 className='text-blue-700 font-semibold text-sm'>Message</h5>

                    }
                    {notification?.type=="join request"&&
                      <div className='flex items-center space-x-8'>
                           <h5 className='text-slate-500 font-semibold text-sm'>Ignore</h5>
                           <button className='text-sm font-semibold px-6 py-2 rounded-full text-blue-700 '
                             style={{background:"rgba(236, 235, 254, 1)"}}>
                              Accepted
                           </button>

                        </div>
                     
                    }
                     {notification?.type=="post request"&&
                      <div className='flex items-center space-x-8'>
                           <h5 className='text-slate-500 font-semibold text-sm'>Decline</h5>
                           <button className='text-sm font-semibold px-6 py-2 rounded-full text-blue-700 '
                             style={{background:"rgba(236, 235, 254, 1)"}}>
                              Approve
                           </button>

                        </div>
                     
                    }

             </div>

        </div>
    )
}
