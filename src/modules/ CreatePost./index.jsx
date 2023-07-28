import React from 'react'
import img2 from "../assets/feedorg.png"
import {IoMdImage} from "react-icons/io"
import {AiTwotoneCalendar,AiOutlineHistory} from "react-icons/ai"
import {ImFilesEmpty} from "react-icons/im"
import {RiCheckboxBlankFill} from "react-icons/ri"

export default function CreatePosts () {
  return (
      <div className='w-full flex flex-col h-full space-y-10 py-4'>

        <div className='flex items-center space-x-2 w-1/4'>
                <img 
                src={img2}
                className="h-10 w-10 rounded-full"
                />

                <div className='flex flex-col '>
                    <h5 className='font-semibold'>{"Ion Houston"}</h5>
                    <h5 className='text-sm font-light'>{"Ecosystem"}</h5>
                    <h5 className='text-sm font-semibold '>Share Options</h5>

                </div>
         </div>

         <div className='flex flex-col space-y-4'>

                <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Post Title*</label>
                        <input 
                            placeholder='Give your post a title...'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
     
                        />

                 </div>

                 <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Post Title*</label>
                        <textarea
                            placeholder='Include a description of your opportunity, request, project, event, initiative, need.....'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
     
                        />

                 </div>


             <button className='text-blue-700 rounded-full px-8 py-1.5 w-1/2'
                    style={{background: "rgba(236, 235, 254, 1)"}}
                    >
               Add a Request
              </button>
              
                 <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Tags</label>
                        <input 
                            placeholder='Add up to (5) descriptive tags that will help people discover your post.....'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
     
                        />

                 </div>

                 <div className='flex  flex-col space-y-4'>
                    <h5 className='text-sm font-semibold'>Additional Details</h5>

                    <div className='flex items-center space-x-4'>
                        {[<IoMdImage/>,<AiTwotoneCalendar />,<ImFilesEmpty/>].map((icon)=>{
                            return(
                                <h5 className='rounded-full p-3 items-center justify-center text-lg text-slate-700'
                                  style={{background: "rgba(242, 242, 242, 1)" }}
                                >
                                    {icon}
                                </h5>
                            )
                        })

                        }


                    </div>

                    <div className='flex w-full items-center justify-center'>
                        {[1,2].map(()=>{
                             return(
                                <RiCheckboxBlankFill
                                className='text-slate-300 text-2xl'
                                 />
                             )
                        })

                        }
                       

                      </div>
                 </div>

                 <div className='flex items-center justify-end'>
                    <div className='flex items-center space-x-4'>
                        <h5
                             className='text-blue-700 rounded-full px-4 py-2'
                           style={{background: "rgba(236, 235, 254, 1)"}}
                        >
                          <AiOutlineHistory />
                        </h5>
                        <button
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             className='text-blue-700 rounded-full px-12 py-1.5'
                        >
                            Post
                        </button>

                    </div>
                 </div>




         </div>
    
      </div>
  )
}
