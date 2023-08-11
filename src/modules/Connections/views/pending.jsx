import React,{useEffect} from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import { connectApi } from '../api'
import { userState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"

export default function Pending() {
    const currentUser=useRecoilValue(userState)
    console.log(currentUser,"user")

    // useEffect(()=>{
    //     const getPending=async()=>{
    //         const pending= await connectApi.getPending(currentUser)
    //         console.log(pending,"pending")

    //     }
    //     getPending()

    // },[])
  return (
    <div className='grid grid-flow-row lg:grid-cols-3 grid-cols-2  gap-4 gap-y-8 h-full w-full'>
        {currentUser?.pending?.map((eco)=>{
            return(
                <div className='flex flex-col bg-white py-4 px-4 rounded-lg'>
                    <div className='flex flex-col items-center space-y-3'>
                        <img 
                          src={eco.img}
                          className="rounded-full lg:w-32 lg:h-32 w-20 h-20"
                        />
                        <h5 className=' text-center font-semibold text-sm lg:text-base '>{eco?.name}</h5>
                        <h5 className='lg:text-sm text-xs font-semibold text-slate-600'>Ecosystem</h5>
                    </div>

                    <div className='flex flex-col items-center space-y-3 py-4'>
                        <p className=' text-center font-light lg:text-sm text-xs'>
                        Worem ipsum dolor sit amet, consectetur adi...
                        </p>

                        <div className='flex items-center space-x-3 py-2'> 
                           <h5 className='rounded-full p-2 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(242, 242, 242, 1)"}}>
                              Pending...
                           </h5>
                           <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
                              <BsThreeDots 
                                   className='text-blue-600 lg:text-2xl text-sm'
                              />
                           </h5>
                        </div>
                    </div>

                </div>
            )
        })

        }

      </div>
  )
}



const ecosystems=[
  {
    name:"Common Desk",
    img:eco1

   },
   {
    name:"Fifth Ward CRC",
    img:eco2

   },
   {
    name:"Headway Idea Labs",
    img:eco3

   },
   {
    name:"Alvin-Manvel Area Chamber of Commerce",
    img:eco5

   }
]