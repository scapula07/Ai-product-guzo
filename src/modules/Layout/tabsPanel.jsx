import React,{useState,useEffect} from 'react'
import {AiFillHome} from "react-icons/ai"
import home from "../assets/icons/home.png"
import user from "../assets/icons/user.png"
import icon from "../assets/icon.png"
import eco from "../assets/ecoIcon.jpeg"
import ind from "../assets/indivIcon.jpeg"
import connections from "../assets/icons/connections.png"
import message from "../assets/icons/message.png"
import opportunity from "../assets/icons/opportunity.png"
import ecosystem from "../assets/icons/ecosystem.png"
import { Link } from 'react-router-dom'
import { groupState,userState } from '../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import CreatePosts from '../ CreatePost.'
import Modal from '../Modal'
import {AiOutlineClose } from "react-icons/ai"
import {RiSettings3Fill} from "react-icons/ri"
import indiv from "../assets/orgIcon.jpeg"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../Firebase'
import {MdArrowDropDown} from "react-icons/md"

export default function TabsPanel() {
    const group =useRecoilValue(groupState)
    const [trigger,setTrigger]=useState(false)
    const [hover,setHover]=useState(false)
    const [unseen,setUnseen]=useState()
    const currentUser=useRecoilValue(userState)
   
    useEffect(()=>{
       if(group?.id?.length >0){
          const ref =doc(db,"unseen",group?.id)
          const unsub = onSnapshot(ref, (doc) => {
          console.log(doc?.data(),"unseee nn")
          setUnseen(doc?.data())
          });


       }
     },[group])

const navs=[
  {
      name:"Home",
      icon:home,
      link:`/home/${group?.id}`

  },
  {
      name:"Connections",
      icon:connections,
      link:`/connections/${group?.id}`

  },
  // {
  //     name:"Posts",
  //     icon:opportunity,
  //     link:`/collaborations/${group?.id}`
  // },
  {
      name:"Ecosystem",
      icon:ecosystem,
      link:`/ecosystem/${group?.id}`
  },
  {
      name:"Messages",
      icon:message,
      link:`/messages/${group?.id}`
  },
  {
      name:"Profile",
      icon:user,
      link:`/profile/${group?.id}`
  },
]
  return (
    <>
    <div className='py-6  w-full relative h-full'>
        <div className='flex flex-col items-center space-y-4 w-full'>
            {group?.type?.length >0?
                    <div className='flex items-center space-x-5'>
                          <img
                             src={group?.img}
                             className="rounded-full w-8 h-8"
                           />
                          <div className='flex flex-col '>
                               {group?.name?.length >16?
                                   <h5 className='font-semibold text-lg flex items-center' >
                                    
                                    <span onClick={()=>setHover(true)}>{group?.name?.slice(0,16)}...</span>
                                     {hover&&
                                        <MdArrowDropDown 
                                           onClick={()=>setHover(false)}
                                        className='text-3xl font-semibold'
                                      />

                                     }

                                    </h5>
                                   :
                                   <h5 className='font-semibold text-lg flex items-center' >
                                    <span onClick={()=>setHover(true)}>{group?.name}</span>
                                    {hover&&
                                        <MdArrowDropDown 
                                           onClick={()=>setHover(false)}
                                        className='text-3xl font-semibold'
                                      />

                                     }
                                     
                                   </h5>
                                 }
                               
                                { group?.type=="eco"?
                                <div className='flex items-center space-x-1.5'>
                                    <img 
                                      src={eco}
                                      className="w-2.5 h-3"
                                      />
                                    <h5 className='text-xs'>Ecosystem</h5>
                                </div>
                                  :
                            <div className='flex items-center space-x-1.5'>
                              <img 
                                src={indiv}
                                className="w-2.5 h-3"
                              />
                              <h5 className='text-xs'>Organization</h5>
                            </div>
                            }
                          </div>
                     </div>
                     :
                     <>
                   {
                     group?.id?.length>0&&
                        <div className='flex items-center space-x-5'>
                             <img
                                src={group?.img}
                                 className="rounded-full w-8 h-8"
                             />
                                <div className='flex flex-col '>
                                        <h5 className='font-semibold text-lg flex items-center' >
                                             <span onClick={()=>setHover(true)}>{group?.display}</span>
                                             {hover&&group?.type?.length >0&&
                                              <MdArrowDropDown 
                                                 onClick={()=>setHover(false)}
                                                 className='text-3xl font-semibold'
                                                />

                                                }
                                        </h5>
                            
                                        <div className='flex items-center space-x-1.5'>
                                          <img 
                                            src={ind}
                                            className="w-2.5 h-3"
                                            />
                                          <h5 className='text-xs'>Individual</h5>
                                          </div>

                                  </div>
                         </div>
                        
                      }
                    
                 </>
                


             }

             {hover&&group?.type?.length >0&&
               <Link to={`/settings-/${group?.id}`}>
                  <div className=''>
                      <div className='flex items-center space-x-3 bg-white rounded-lg px-4 py-2 '>
                        <RiSettings3Fill  className='text-slate-600'/>
                        <h5 className='text-sm text-slate-600 font-semibold'>Settings</h5>
                      </div>

                  </div>
               </Link>
          

             }

            
          
            <div className='flex flex-col py-28 space-y-6'>
                {navs.map((nav)=>{
                     return(
                      <>
                       {nav?.name==="Ecosystem"?
                        <>
                         {
                             group?.type==="eco"&&
                              <div className='flex items-center space-x-6'>
                              <img 
                                src={nav?.icon}
                                className="h-5 w-5"
                              />
                              <Link to={nav?.link}>
                                  <h5 className='font-semibold flex items-center space-x-0.5'>
                                          <span>{nav?.name}</span>
                                          {unseen?.ecosystems&&
                                             <span className='bg-red-500 lg:h-1.5 lg:w-1.5 h-1 w-1 rounded-full'></span>
                                          }
                                         
                                   </h5>
                              </Link>
                            
                            </div>
                         }

                          </>
                            :
                            <div className='flex items-center space-x-6'>
                                <img 
                                  src={nav?.icon}
                                  className="h-5 w-5"
                                />
                                <Link to={nav?.link}>
                                    {["Connections","Messages"].includes(nav?.name)?
                                        <h5 className='font-semibold flex items-center space-x-0.5'>
                                          <span>{nav?.name}</span>
                                          {nav?.name==="Messages"?
                                               <>
                                                 {unseen?.messages&&
                                                    <span className='bg-red-500 lg:h-1.5 lg:w-1.5 h-1 w-1 rounded-full'></span>
                                                 }
                                                  
                                               </>
                                             
                                               :
                                               <>
                                                {unseen?.connections&&
                                                   <span className='bg-red-500 lg:h-1.5 lg:w-1.5 h-1 w-1 rounded-full'></span>
                                                }
                                               </>
                                              
                                          }
                                        
                                        </h5>
                                        :
                                        <h5 className='font-semibold'>{nav?.name}</h5>

                                    }
                                
                                </Link>
                              
                             </div>

                       }

                        </>
                     )
                })

                 }

                 <div className='py-6'>
                    <button className='font-semibold bg-blue-600 py-2 rounded-full text-white text-sm w-full'
                      onClick={()=>setTrigger(true)}
                     >Post</button>
                 </div>


                  </div>
            

                </div>

                <div className='absolute bottom-0 flex w-full justify-center py-6'> 
                   <img 
                     src={icon}
                    />

                 </div>

    </div>


    <Modal trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg " >
               <div className='w-full flex justify-end px-6 py-2'>
                    <AiOutlineClose 
                    onClick={()=>setTrigger(false)}
                 />

              </div>
              <div className='h-full overflow-y-scroll' style={{height:"500px"}}>
                <CreatePosts 
                  group={group}
                  currentUser={currentUser}
                  setTrigger={setTrigger}
                />

              </div>
              
        
      </Modal>
         


    </>
  )
}

