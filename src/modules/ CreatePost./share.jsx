import React,{useState,useEffect} from 'react'
import img2 from "../assets/feedorg.png"
import {IoMdImage} from "react-icons/io"
import {AiTwotoneCalendar,AiOutlineHistory} from "react-icons/ai"
import {ImFilesEmpty} from "react-icons/im"
import {RiCheckboxBlankFill} from "react-icons/ri"
import {MdArrowDropUp} from "react-icons/md"
import { shareApi } from './_api/share'
import ClipLoader from "react-spinners/ClipLoader";
import {ImCheckboxChecked,ImCheckboxUnchecked} from "react-icons/im"
import ecoImg from "../assets/ecoIcon.jpeg"
import org from "../assets/orgIcon.jpeg"
import indiv from "../assets/indivIcon.jpeg"


export default function Share({setOthers,currentUser,group,setShare,access,setAccess,eco,arePosts,makePost,isLoading}) {


  console.log(arePosts?.length,"poststts")


    const close=()=>{
      setOthers(false) 
    }
  return (
    <div className='w-full flex justify-center no-scrollbar'>
      
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
                        <div className='flex items-center space-x-1'>
                             {group?.type=="eco"?
                                         <div className="flex items-center space-x-1">
                                           <img 
                                            src={ecoImg}
                                            className="w-2.5 h-3"
                                           />
                                           <h5 className='text-xs'>Ecosystem</h5>

                                         </div>
                                       :
                                       <div className="flex items-center space-x-1">
                                             <img 
                                             src={org}
                                             className="w-2.5 h-3"
                                             />
                                       <h5 className='text-xs'>Organization</h5>

                                     </div>
                             }
                        </div>
                    

                    </div>
                    :
                    <div className='flex flex-col '>
                        <h5 className='font-semibold'>{group?.display}</h5>
                        <div className="flex items-center space-x-1">
                         <img 
                            src={indiv}
                            className="w-2.5 h-3"
                            />
                       <h5 className='text-xs'>Individual</h5>

                  </div>
                    

                    </div>

                 }
            </div>


           


                 <div className='flex flex-col'>
                    <h5 className='text-sm font-semibold'>Which ecosystem(s) do you want your post to appear in?</h5>

                    <div className='flex flex-col bg-white px-4 py-4 rounded-lg' style={{background: "white"}}>
                        <div className='flex flex-col space-y-5 py-1'>
                     
                          <div className='flex flex-col space-y-2 px-3'>
                             {eco?.map((eco)=>{
                              
                                    return(
                                      <>
                                          {eco?.type=="eco"&&
                                              <Pick  
                                              eco={eco}
                                              access={access}
                                              setAccess={setAccess}
                                     
                                              />

                                          }
                                          
                                      </>
                          
                                )

                               
                            })}
                              {arePosts?.length===0&&eco?.length ===0&&
                                <div className='w-full flex justify-center py-10'>
                                <ClipLoader 
                                        color={"rgba(62, 51, 221, 1)"}
                                        loading={true}
                                    />
                                </div>
                              }
                               {arePosts?.length >0&&
                                  <div className='w-full flex justify-center py-10'>
                                    <h5 className="text-sm font-semibold">No ecosystem</h5>
                                </div>

                                }

                          </div>
                           
                           
                        </div>


                    </div>

                 </div>




                 <div className='flex justify-end w-full pt-14 pb-3'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5'
                             onClick={close}
                            >
                            Back
                        </button>


                        {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                             :
                           <button
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             className='text-blue-700 rounded-full  px-8 py-1.5'
                             onClick={()=>makePost(group)}
                            >
                             Post
                          </button>
                        }


                   </div>

              </div>

       </div>
    </div>
  )
}




const Pick=({eco,access,setAccess})=>{
    const [checked,setChecked]=useState(false)
    const add=()=>{

      console.log(eco)

      setAccess([...access,eco?.id])
       setChecked(true)
    }
    const remove=()=>{
      setChecked(false)
      access?.filter((id)=>id===eco?.id)
      setAccess( access?.filter((id)=>id !=eco?.id))
   }

   console.log(access,"accesss")
    return(
        <div className='flex items-center space-x-2'>
           {checked?
                  <ImCheckboxChecked
                    className='text-slate-500 text-sm'
                    onClick={remove}

                />
                :
                <ImCheckboxUnchecked
                className='text-slate-500 text-sm'
                onClick={add}
              />

           }
         
           


            <h5 className='text-sm font-semibold'>{eco?.name}</h5>

        </div>
     )
}