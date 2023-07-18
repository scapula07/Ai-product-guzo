import React from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"

export default function Pending() {
  return (
    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
        {ecosystems.map((eco)=>{
            return(
                <div className='flex flex-col bg-white py-4 px-4'>
                    <div className='flex flex-col items-center space-y-3'>
                        <img 
                          src={eco.img}
                          className="rounded-full w-32 h-32"
                        />
                        <h5 className=' text-center font-semibold '>{eco?.name}</h5>
                        <h5 className='text-sm font-semibold text-slate-600'>Ecosystem</h5>
                    </div>

                    <div className='flex flex-col items-center space-y-3 py-4'>
                        <p className=' text-center font-light text-sm'>
                        Worem ipsum dolor sit amet, consectetur adi...
                        </p>

                        <div className='flex items-center space-x-3 py-2'> 
                           <h5 className='rounded-full p-2 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(242, 242, 242, 1)"}}>
                              Pending...
                           </h5>
                           <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
                              <BsThreeDots 
                                   className='text-blue-600 text-2xl'
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