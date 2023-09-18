import React, { useEffect,useState } from 'react'
import cover from "../../assets/orgcover1.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import {IoMdNotifications} from "react-icons/io"
import { groupState,userState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"

export default function CoverSection({group}) {
    console.log(group,"group")
    const currentUser =useRecoilValue(userState)


 
      const active=group?.active?.some(member => member?.id===currentUser?.id) || group?.creator ===currentUser?.id
      const pending=group?.active?.some(member => member?.id===currentUser?.id)
      console.log(active)
      console.log(pending)
       
    

     
 
  return (
    <div className='w-full flex flex-col space-y-4'>
      
        <div className='w-full flex flex-col  bg-white  rounded-lg'>
                <img 
                src={cover }
                className="w-full h-33"

                />

                <div className='flex lg:flex-row flex-col py-6 space-x-4 px-4'>
                    <img 
                    src={group?.img}
                    className="rounded-full lg:h-36 lg:w-36 h-10 w-10"
                    />

                    <div className='flex  flex-col w-full'>
                        <div className='flex items-center justify-between w-full'>
                            <h5 className='text-xl font-semibold'>{group?.name }</h5>

                            {/* <button className=' border rounded-full py-1 px-8 text-sm font-semibold' style={{borderColor: "rgba(40, 28, 245, 1)"}}>Edit profile</button> */}
                            <div className='flex items-center space-x-4'>
                       

                                 <h5 className='rounded-full flex items-center justify-center p-2'
                                    style={{background:" rgba(236, 235, 254, 1)"}}
                                    >
                                        <FiMessageSquare 
                                            className="text-xl text-blue-700"
                                            />
                                    </h5>
                                    <h5 className='rounded-full flex items-center justify-center p-2'
                                        style={{background:" rgba(236, 235, 254, 1)"}}
                                    >
                                        <IoMdNotifications
                                           className="text-xl text-blue-700"
                                        />
                                    </h5>
                                   <BsThreeDots 
                                      className="text-xl text-blue-700"
                                   />

                            </div>

                        </div>
                        <div className='flex flex-col py-2 space-y-4'>
                                <p className='font-semibold text-sm'>
                                Worem ipsum dolor sit amet, consectetur adipiscing. 
                                </p>

                                <h5 className='text-slate-500 font-semibold'>{group?.location} </h5>

                        </div>
                    

                    </div>
                    
                </div>
              

                <div className='px-4 py-2 flex flex-col space-y-6'>
                    <div className='flex flex-col space-y-2 px-4 py-2 rounded-lg'  style={{background: "linear-gradient(0deg, #ECEBFE, #ECEBFE)"}} >
                        <h5 className='text-lg font-semibold'>About {group?.name}</h5>
                        <p className='text-xs '>
                        {group?.about}....
                        <span className='font-semibold'>see more</span>.
                        </p>

                    </div>

                    <div className='flex justify-between w-full items-center'>
                        {/* <div className='flex space-x-4'>
                            <h5 className='text-slate-700 text-sm font-semibold'>Membership</h5>
                            <h5 className='text-slate-700 text-sm font-semibold'>Members</h5>


                        </div> */}
                        {active?
                           ""
                           :
                           <>
                              {pending?
                                 <button className='bg-blue-600 rounded-full py-2 text-white px-20'>Join</button>
                                 :
                                 <button className='bg-blue-600 rounded-full py-2 text-white px-20'>Join</button>
             }


                           </>

                       
                        }
                      

                    </div>
                </div>
               


        </div>


    </div>
  )
}
