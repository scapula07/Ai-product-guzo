import React,{useState,useEffect} from 'react'
import cover from "../../assets/orgcover1.png"
import orgPic from "../../assets/orgcover.png"
import EditProfile from '../../EditProfile'
import {RiShareBoxFill} from "react-icons/ri"
import { profileApi } from '../../EditProfile/api'

export default function CoverSection({group}) {
    console.log(group?.location,"groupp")

    
  return (
    <div className='w-full flex flex-col space-y-4'>
      
          <div className='w-full flex flex-col  bg-white  rounded-lg'>
              { group?.cover?.length>0?
                    <img 
                      src={group?.cover}
                      className="w-full h-28"
  
                      />
                           :

                          <img 
                          src={cover}
                          className="w-full h-28"
        
                        />


              }


                <div className='flex lg:flex-row flex-col py-6 space-x-4 px-4'>
                    {group?.name?.length > 0?
                        <img 
                            src={group?.img}
                            className="rounded-full h-28 w-28 "
                        />
                             :
                        <>
                          {group?.img?.length>0?
                            <img 
                               src={group?.img}
                                className="rounded-full sm:h-28 sm:w-28"
                             />
                             :
                             <div className='rounded-full h-28 w-28  p-2 items-center justify-center flex border'
                                 >
                               <h5 className='font-semibold text-6xl'> {group?.firstName?.slice(0,1) +group?.lastName?.slice(0,1)}</h5>
                             </div>
                              }
                           </>
                         }
             

                    <div className='flex  flex-col w-full'>
                         <div className='flex items-center justify-between w-full'>
                            {group?.name?.length >0?
                              <h5 className='text-xl font-semibold w-full'>{group?.name}</h5>
                              :
                              <h5 className='text-xl font-semibold w-full'> {group?.firstName + " " + group?.lastName } </h5>
                           }
                             
                           <div className='flex items-center w-full space-x-1'>
                                <EditProfile 
                                  group={group}
                                />  

                             <h5 className='rounded-full p-2 flex items-center justify-center ' 
                                    style={{background: "rgba(236, 235, 254, 1)"}}
                               >
                                          
                                  <RiShareBoxFill
                                    className='text-blue-600 text-lg '
                                  />
                      
                             
                             </h5>  



                           </div>
                          
                                                                                  
{/*   
                            <button className=' border rounded-full py-1 px-8 text-sm font-semibold' style={{borderColor: "rgba(40, 28, 245, 1)"}}>Edit profile</button> */}

                         </div>
                        <div className='flex flex-col py-2 space-y-4'>
                                <p className='font-semibold text-sm'>
                                Worem ipsum dolor sit amet, consectetur adipiscing. 
                                </p>

                                <h5 className='text-slate-500 font-semibold'>{group?.location?.value} </h5>

                        </div>
                    

                    </div>
                    
                </div>
              

                <div className='px-4 py-2 flex flex-col space-y-6'>
                    <div className='flex flex-col space-y-2 px-4 py-2 rounded-lg'  style={{background: "linear-gradient(0deg, #ECEBFE, #ECEBFE)"}} >
                        <h5 className='text-lg font-semibold'>About {group?.type?.length>0? group?.name :group?.firstName}</h5>
                        <p className='text-xs '>
                          {group?.about}....
                        <span className='font-semibold'>see more</span>.
                        </p>

                    </div>

                    <div className=''>
                        <h5 className='text-slate-700 text-sm font-semibold'>Membership</h5>

                    </div>
                </div>
               


        </div>


    </div>
  )
}
