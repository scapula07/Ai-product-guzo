import React, { useEffect,useState } from 'react'
import cover from "../../assets/orgcover1.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import {IoMdNotifications} from "react-icons/io"
import { groupState,userState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import { ecosystemApi } from '../../Home/_api/ecosystem'
import { useNavigate } from 'react-router-dom'
import eco from "../../assets/img3.png"



export default function CoverSection({group}) {
    console.log(group,"group")
    const currentUser =useRecoilValue(userState)
    const account=useRecoilValue(groupState)

 
      const active=group?.active?.some(member => member?.id===account?.id) || group?.creator ===currentUser?.id
      const pending=group?.pending?.some(member => member?.id===account?.id)


      const isPending= eco?.pending?.some(e=>e?.id ===group?.id)
      console.log(isPending,eco?.name)
      const isMember= eco?.active?.some(e=>e?.id ===currentUser?.id) || eco?.creator ===currentUser?.id;



      console.log(active)
      console.log(pending)
       
    
      const [errorMsg, setErrorMsg] = useState(null)
      let navigate = useNavigate();
      const [isLoading,setLoading]=useState(false)
  
       const join=async(id)=>{
          setLoading(true)
          try{
            const result =await ecosystemApi.joinRequest(id,currentUser,group)
            setLoading(false)
       
            result&&navigate(`/connections/${group?.id}/pending`)
  
          //  const response =await notificationApi.sendNotification(currentUser?.accessToken,currentUser?.notificationToken)
            
  
            }catch(e){
                console.log(e)
                setLoading(false)
                setErrorMsg(e)
            }
       }
     
 
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
                            <div className='flex flex-col space-x-1'>
                                 <h5 className='text-xl font-semibold'>{group?.name }</h5>
                                  <div className='flex items-center space-x-1.5'>
                                          <img 
                                            src={eco}
                                            className="w-2.5 h-2.5"
                                          />
                                          <h5 className='text-xs'>Ecosystem</h5>
                                      </div>

                            </div>
                          
                              

                            {/* <button className=' border rounded-full py-1 px-8 text-sm font-semibold' style={{borderColor: "rgba(40, 28, 245, 1)"}}>Edit profile</button> */}
                            <div className='flex items-center space-x-4'>
                       

                                 <h5 className='rounded-full flex items-center justify-center p-2'
                                    style={{background:" rgba(236, 235, 254, 1)"}}
                                    >
                                        <FiMessageSquare 
                                            className="text-xl text-blue-700"
                                            />
                                    </h5>
                                    {/* <h5 className='rounded-full flex items-center justify-center p-2'
                                        style={{background:" rgba(236, 235, 254, 1)"}}
                                    >
                                        <IoMdNotifications
                                           className="text-xl text-blue-700"
                                        />
                                    </h5>
                                   <BsThreeDots 
                                      className="text-xl text-blue-700"
                                   /> */}

                            </div>

                        </div>
                        <div className='flex flex-col py-8 space-y-4 '>
                            <h5 className='text-slate-900 font-semibold text-sm'>{group?.location} </h5>

                        </div>
                    

                    </div>
                    
                </div>
              

                <div className='px-4 py-2 flex flex-col space-y-6'>
                    {group?.about?.length !=undefined&&
                            <div className='flex flex-col space-y-2 px-4 py-2 rounded-lg'  style={{background: "linear-gradient(0deg, #ECEBFE, #ECEBFE)"}} >
                            <h5 className='text-lg font-semibold'>About {group?.name}</h5>
                            <p className='text-xs '>
                            {group?.about}....
                            <span className='font-semibold'>see more</span>.
                            </p>

                        </div>
                     }


                    <div className='flex justify-center w-full items-center'>
                       
                        {active?
                           ""
                           :
                           <>
                              {pending?
                                 <button className=' rounded-full py-2 text-white px-20'
                                   style={{background:"rgba(142, 142, 142, 1) "}}
                                 >Pending...</button>
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
