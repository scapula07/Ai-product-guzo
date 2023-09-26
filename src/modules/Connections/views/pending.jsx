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
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useOutletContext } from 'react-router-dom';
import ecoImg from "../../assets/img3.png"
import org from "../../assets/img2.png"
import indiv from "../../assets/indiv.png"




export default function Pending() {
    const currentUser=useRecoilValue(userState)
    console.log(currentUser,"user")
    const [connects]= useOutletContext();
     console.log(connects?.pending?.length,"length of pending")

  return (
   
    <>
    <div className='w-full'>
      
        {/* {connects?.pending?.length ===0&&
            <div className='flex justify-center'>
                <ClipLoader 
                        color={"rgba(62, 51, 221, 1)"}
                        loading={true}
                    />


            </div>
        
        } */}

      
    <div className='grid grid-flow-row lg:grid-cols-3 grid-cols-2  gap-4 gap-y-8 h-full w-full'>
        {connects?.pending?.map((eco)=>{
            return(
           
                <div className='flex flex-col bg-white py-4 px-4 rounded-lg'>
                    <div className='flex flex-col items-center space-y-3'>
                        <img 
                          src={eco.img}
                          className="rounded-full lg:w-32 lg:h-32 w-20 h-20"
                        />
                        <h5 className=' text-center font-semibold text-sm lg:text-base '>{eco?.name}</h5>
                        {eco?.type=="eco"?
                            <div className="flex items-center space-x-1">
                            <img 
                            src={ecoImg}
                            className="w-3 h-3"
                            />
                            <h5 className='text-xs'>Ecosystem</h5>

                        </div>
                          :
                         <>
                       {eco?.type==="org"?
                           <div className="flex items-center space-x-1">
                                <img 
                                src={org}
                                className="w-3 h-3"
                                />
                              <h5 className='text-xs'>Organization</h5>
                             </div>
                             :
                             <div className="flex items-center space-x-1">
                                <img 
                                src={indiv}
                                className="w-3 h-3"
                                />
                              <h5 className='text-xs'>Individual</h5>
                             </div>

                              }
                            
                        </>
                  

                
                      }
                    </div>

                    <div className='flex flex-col items-center space-y-3 py-4'>
                  

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




      </div>

     {connects?.pending?.length == undefined &&
          <div className='w-full flex justify-center py-10'>
            <h5 className="text-lg font-semibold">No pending connections</h5>
           </div>

     } 
       {connects?.pending?.length==0 &&
          <div className='w-full flex justify-center py-10'>
            <h5 className="text-lg font-semibold">No pending connections</h5>
           </div>

     } 
     </>
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