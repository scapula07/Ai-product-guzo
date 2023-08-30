import React,{useState,useEffect} from 'react'
import img2 from "../assets/feedorg.png"
import {IoMdImage} from "react-icons/io"
import {AiTwotoneCalendar,AiOutlineHistory} from "react-icons/ai"
import {ImFilesEmpty} from "react-icons/im"
import {RiCheckboxBlankFill} from "react-icons/ri"
import {MdArrowDropUp} from "react-icons/md"
import { shareApi } from './_api/share'


export default function Share({setOthers,currentUser,group,setShare}) {
    const [eco,setEco]=useState([])
     useEffect(()=>{
        const getAllEcosystems=async()=>{
            const ecosystems=await shareApi.getAllEcosytems()
            setEco(ecosystems)
            console.log(ecosystems,"ecosystems")

        }
        getAllEcosystems()

      },[])
  return (
    <div className='w-full flex justify-center'>
      
         <div className='w-4/5 flex flex-col h-full space-y-10 py-4 '>
         <div className='flex items-center space-x-2 w-full'>
              {group?.type?.length>0?

                  <img 
                    src={group?.img}
                    className="h-10 w-10 rounded-full"
                  />
                 :
                 <>
                   {group?.img?.length>0?
                       <img 
                        src={group?.img}
                        className="h-10 w-10 rounded-full"
                       />
                        :
                        <div className='rounded-full p-2 items-center justify-center flex border'
                          >
                         <h5 className='font-semibold text-sm'> {currentUser?.firstName?.slice(0,1) +currentUser?.lastName?.slice(0,1)}</h5>
                      </div>
                        

                    }
                    
                   
                 </>
                 }
                {group?.type?.length>0?

               
                    <div className='flex flex-col '>
                        <h5 className='font-semibold'>{group?.name}</h5>
                        <h5 className='text-sm font-light'>{group?.type}</h5>
                        <div className='flex items-center space-x-1'>
                            <h5 className='text-sm font-semibold '>Share Options</h5>
                            <MdArrowDropUp
                            className='text-lg'
                            onClick={()=>setShare(true) || setOthers(true)}
                            />
                        </div>
                    

                    </div>
                    :
                    <div className='flex flex-col '>
                        <h5 className='font-semibold'>{group?.firstName + " " + group?.lastName}</h5>
                        <div className='flex items-center space-x-1'>
                            <h5 className='text-sm font-semibold '>Share Options</h5>
                            <MdArrowDropUp
                            className='text-lg'
                            onClick={()=>setShare(false) || setOthers(false)}
                            />
                        </div>
                    

                    </div>

                 }
            </div>


           


                 <div className='flex flex-col'>
                    <h5 className='text-sm font-semibold'>Which ecosystem(s) do you want your post to appear in?</h5>

                    <div className='flex flex-col bg-white' style={{background: "rgba(255, 255, 255, 1)"}}>
                        <div className='flex flex-col space-y-5 py-4'>
                            {["Guzo feed","Post to My Profile"].map((text)=>{
                                 return(
                                    <div className='flex items-center space-x-2'>
                                        <input
                                          type={"checkbox"}
                                         />
                                        <h5 className='text-sm font-semibold'>{text}</h5>
        
                                    </div>
    

                                 )
                               })

                            }
                           
                        </div>
                        <div className='flex flex-col space-y-5 py-4'>
                           <h5 className='text-sm font-semibold'>Ecosystems</h5>
                           <div className='flex items-center space-x-2'>
                                <input
                                    type={"checkbox"}
                                    />
                                <h5 className='text-sm font-semibold'>Select All Ecosystems</h5>

                          </div>
                          <div className='flex flex-col space-y-2 px-3'>
                            {eco.map((eco)=>{
                                    return(
                                        <div className='flex items-center space-x-2'>
                                            <input
                                            type={"checkbox"}
                                            />
                                            <h5 className='text-sm font-semibold'>{eco?.name}</h5>
            
                                        </div>
        

                                    )
                                })

                                }

                          </div>
                           
                           
                        </div>


                    </div>

                 </div>




                 <div className='flex justify-end w-full pt-14 pb-3'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5 border border-blue-700'
                             onClick={()=>setOthers(false)}
                            >
                            Back
                        </button>



                        <button
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             className='text-blue-700 rounded-full px-12 py-1.5'
                            >
                            Next
                        </button>


                   </div>

              </div>

       </div>
    </div>
  )
}
