import React,{useRef} from 'react'
import upload from "../../modules/assets/upload.png"

export default function Events({setOthers, eventPost,setEvt,setUrl,setSelectedFile,setEvent,url}) {
    const hiddenFileInput = useRef()

    console.log(url?.length ,"length")

    const handleClick = event => {
            hiddenFileInput.current.click()
        }

        const handleChange = async(e)=> {
            const dir = e.target.files[0]
            console.log(dir,"dir")
            if (dir) {
            setUrl({
                src: URL.createObjectURL(dir)
                })
            }
        setEvt({...eventPost,file:dir})
          
    
        }
  return (
    <div className='w-full flex justify-center'>
        
        <div className='w-3/4 flex flex-col space-y-6'>
                <h5 className='text-2xl font-semibold'>Add a request to your post...</h5>


                <div className='flex flex-col space-y-4'>
                     <h5  className='text-lg font-semibold'>Add an Image for your Event Post</h5>
                     <div className='flex justify-center items-center h-48 w-full rounded-lg' style={{background: "rgba(242, 242, 242, 1)"}}>
                      {url?.src?.length ==0&&
                            <div className='flex flex-col items-center'
                            onClick={handleClick}
                            >
                                <img 
                                    src={upload}
                                />
                                <input
                                    type="file"
                                    className='hidden'
                                    ref={hiddenFileInput}
                                    onChange={handleChange}
                                />
                                <h5 className='text-sm font-light'>Upload or Drop Images</h5>

                            </div>
                           }
                            { url?.src?.length > 0&&
                             <div className='w-1/2 py-4'>
                                <img
                                  src={url?.src}
                                  className='w-full h-full rounded-lg'
                                />
                            </div>
                          
                          }
                          
                     </div>

                </div>

                <div className='flex flex-col'>
                     <div className="flex items-center space-x-6 ">
                         <div className='flex items-center space-x-1'>
                            <input type={"radio"}/>
                            <h5 className='font-light text-xs'>In Person</h5>
                         </div>
                         <div className='flex items-center space-x-1'>
                            <input type={"radio"} style={{background:"black"}}/>
                            <h5 className='font-light text-xs'>Online</h5>
                         </div>

                     </div>

                </div>


                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-col w-full space-y-2'>
                                <label className='text-sm text-slate-700'>Event Name*</label>
                                <input 
                                    placeholder='What is the name of your event'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                                    name="title"
                                    value={eventPost?.title}
                                    onChange={(e)=>setEvt({...eventPost,title:e.target.value})}
             
            
                                />

                        </div> 
                    
                        <div className='flex flex-col w-full space-y-2'>
                                <label className='text-sm text-slate-700'>Event Description</label>
                                <textarea
                                    placeholder='Include a description of your opportunity, request or need..... '
                                    className=' py-2 h-28 px-4 w-full rounded-md text-sm outline-none border'
                                    name="body"
                                    value={eventPost?.body}
                                    onChange={(e)=>setEvt({...eventPost,title:e.target.value})}
            
                                />

                        </div> 

              </div>


              <div className='flex justify-end w-full pt-4 pb-3'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5 border border-blue-700'
                             onClick={()=>setOthers(false) || setEvent(false)}
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
