import React,{useEffect,useState} from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"
import { connectApi } from '../api'
import { userState ,groupState} from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useOutletContext } from 'react-router-dom';
import ecoImg from "../../assets/ecoIcon.jpeg"
import org from "../../assets/orgIcon.jpeg"
import indiv from "../../assets/indivIcon.jpeg"
import {MdArrowDropDown} from "react-icons/md"



export default function Pending() {
    const currentUser=useRecoilValue(userState)
    const group=useRecoilValue(groupState)
    console.log(currentUser,"user")
    const [connects]= useOutletContext();
     console.log(connects?.pending?.length,"length of pending")

  return (
   
    <>
    <div className='w-full'>
          <div className='grid grid-flow-row lg:grid-cols-3 grid-cols-2  gap-4 gap-y-8 h-full w-full'>
          {connects?.pending?.map((eco)=>{
              return(
            
                <PendingCard 
                  eco={eco}
                  group={group}
                />
            
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









const PendingCard=({eco,group})=>{

      const [isRemoving,setRemove]=useState(false)
      const [trigger,setTrigger]=useState(false)
      const [errorMsg, setErrorMsg] = useState(null)


      const removeMember=async()=>{
          setRemove(true)
          setErrorMsg(null)
          try{
              const response =await connectApi.removePendingConnections(group,eco)
              response&&setRemove(false)
              response&&setTrigger(false)
            }catch(e){
              console.log(e)
              setErrorMsg(e.message)
              
            }
        }


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
                  className="w-2.5 h-3"
                  />
                  <h5 className='text-xs'>Ecosystem</h5>

              </div>
                :
              <>
            {eco?.type==="org"?
                <div className="flex items-center space-x-1">
                      <img 
                      src={org}
                      className="w-2.5 h-3"
                      />
                    <h5 className='text-xs'>Organization</h5>
                  </div>
                  :
                  <div className="flex items-center space-x-1">
                      <img 
                      src={indiv}
                      className="w-2.5 h-3"
                      />
                    <h5 className='text-xs'>Individual</h5>
                  </div>

                    }
                  
              </>
        

      
            }
          </div>

          <div className='flex flex-col items-center space-y-3 py-4'>
        

              <div className="flex items-center justify-center space-x-3 py-2 relative"> 
                 {!trigger&&
                   <h5 className='rounded-full p-2 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(242, 242, 242, 1)"}}>
                    Pending...
                   </h5>
                  }
                   <h5 className='rounded-full p-2 items-center justify-center relative ' style={{background: ` ${trigger?"white" :"rgba(236, 235, 254, 1)"}`}}>
          
                  {!trigger&&
                  <BsThreeDots 
                      className='text-blue-600 text-2xl  '
                      onClick={()=>setTrigger(true)}
                  />
                  }
                  

              </h5>

              {trigger&&
                   <div className='absolute top-0  w-full '>
                        <div className=' w-full flex justify-center'>
                         
                          <div className='bg-rose-100 h-12 w-32 rounded-b-2xl rounded-tr-2xl px-4 py-2 flex items-center justify-between relative z-50'>
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


                      </div>

                  }
              </div>
          </div>

      </div>


     )
}