import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {FiMessageSquare } from "react-icons/fi"
import {BsThreeDots } from "react-icons/bs"
import { messageApi } from '../api/message'
import { useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import eco from "../../assets/img3.png"
import org from "../../assets/img2.png"
import indiv from "../../assets/indiv.png"
import {MdArrowDropDown } from "react-icons/md"
import { ecosystemApi } from '../api'

export default function ActiveMember({member,group}) {
   
    let navigate = useNavigate();
    const [isLoading,setLoading]=useState(false)
    const [isRemoving,setRemove]=useState(false)
    const [trigger,setTrigger]=useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const removeMember=async()=>{
         setRemove(true)
         setErrorMsg(null)
        try{
            const response =await ecosystemApi.removeMember(group,member)
            response&&setRemove(false)
            response&&setTrigger(false)
          }catch(e){
            console.log(e)
            setErrorMsg(e.message)
            
          }
    }
  
  
     const startConversation=async()=>{
        setLoading(true)
        try{
            const response=await messageApi.startConversation(member,group)
            console.log(response,"msg res")
            setLoading(false)
            response && navigate(`/messages/${group?.id}`)
            setLoading(false)
            
  
          }catch(e){
            console.log(e)
          }
  
        }
  
  return (

    <div className='flex flex-col bg-white py-4 px-4 rounded-lg'>
        {member?.type?.length >0?
            <div className='flex flex-col items-center space-y-3'>
                <img 
                    src={member?.img}
                    className="rounded-full w-32 h-32"
                />
                <h5 className=' text-center font-semibold '>{member?.name}</h5>
                <h5 className='text-sm font-semibold text-slate-600'>
                    {member?.type==="eco"?
                     "Ecosystem"
                      :
                      "Organization"

                    }
                </h5>
         </div>
           :
            <>
             <div className='flex flex-col items-center space-y-3'>
                {member?.img?.length >0?
                   <img 
                   src={member?.img}
                   className="rounded-full w-32 h-32"
                   />

                   :
                   <div className='rounded-full  w-32 h-32 items-center justify-center flex border'
                      >
                    <h5 className='font-semibold text-4xl'> {member?.firstName?.slice(0,1) + member?.lastName?.slice(0,1)}</h5>
                </div>

                 

                }
             
                {member?.firstName !=undefined?
                   <h5 className=' text-center font-semibold '>{member?.firstName + " " + member?.lastName}</h5>
                   :
                   <h5  className=' text-center font-semibold '>{member?.display}</h5>

                }
               
                {/* <h5 className='text-sm font-semibold text-slate-600'>Ecosystem</h5> */}
             </div>
             
            </>

           

        }
        

            <div className='flex flex-col items-center space-y-3 py-4'>
             
                 {member?.type=="eco"?
                    <div className="flex items-center space-x-1">
                    <img 
                    src={eco}
                    className="w-3 h-3"
                    />
                    <h5 className='text-xs'>Ecosystem</h5>

                    </div>
                  :
                  <>
                       {member?.type==="org"?
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

              <div className='flex items-center space-x-3 py-2'> 
              
                {isLoading?
                            
                            <ClipLoader 
                                color={"rgba(62, 51, 221, 1)"}
                                loading={isLoading}
                            />
                            :
                         <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>

                        
                            <FiMessageSquare 
                                className='text-blue-600 text-2xl '
                                onClick={startConversation}
                            />
                        
                        
                            </h5>
                    }
                    
               
                    <h5 className='rounded-full p-2 items-center justify-center relative ' style={{background: ` ${trigger?"white" :"rgba(236, 235, 254, 1)"}`}}>
                        
                        {!trigger&&
                        <BsThreeDots 
                            className='text-blue-600 text-2xl  '
                            onClick={()=>setTrigger(true)}
                        />
                        }
                        {trigger&&
                            <div className='absolute top-0 -mt-1'>
                              <div className='bg-rose-100 h-12 w-32 rounded-b-2xl rounded-tr-2xl px-4 py-2 flex items-center justify-between'>
                               {isRemoving?
                            
                                  <ClipLoader 
                                      color={"rgba(62, 51, 221, 1)"}
                                      loading={true}
                                  />
                                  :
                                  <h5 className='text-rose-600 font-semibold '
                                    onClick={removeMember}
                                  >Remove</h5>
                               }
                                  <MdArrowDropDown 
                                    className='text-3xl font-semibold text-slate-700'
                                    onClick={()=>setTrigger(false)}
                                  />

                              </div>


                            </div>

                        }

                    </h5>            </div>
        </div>

    </div>
       
  )
}
