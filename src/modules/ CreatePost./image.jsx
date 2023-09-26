import React,{useRef,useState} from 'react'
import upload from "../../modules/assets/upload.png"
import {BiSolidPencil} from "react-icons/bi"
import {MdDelete } from "react-icons/md"
export default function Image({setOthers,setPost,post,setImg,url,setUrl}) {
  
    const hiddenFileInput = useRef()

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
            setPost({...post,img:dir})
    
        }
   const handleDelete=()=>{
       setUrl("")
       setPost({...post,img:{}})

   }
        const close=()=>{
          setOthers(false) 
          setImg(false)
          setPost({...post,img:null})
          setUrl("")
        }
  return (
    <div className='w-full flex justify-center'>
        
        <div className='w-3/4 flex flex-col space-y-6'>
                   
                    <h5  className='text-2xl font-semibold'>Add an Image to your Post</h5>

                    <div className='flex flex-col space-y-4'>
                    <h5 className='text-lg font-semibold'>Select file(s)</h5>
                     {url?.length ==0&&
                        <div className='flex justify-center items-center h-48 w-full rounded-lg' style={{background: "rgba(242, 242, 242, 1)"}}>
                        
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
                           

                            
                        </div>
                      }

                        { url?.src?.length > 0&&
                             <div className='w-1/2 py-4'
                               onClick={handleClick}
                             >
                                <img
                                  src={url?.src}
                                  className='w-full h-full rounded-lg'
                                />

                                  <input
                                    type="file"
                                    className='hidden'
                                    ref={hiddenFileInput}
                                    onChange={handleChange}
                                  />
                            </div>
                          
                          }



                     <div className='flex items-center justify-center space-x-4'>
                          <h5 className='rounded-full p-2 items-center justify-center' 
                                  style={{background: "rgba(236, 235, 254, 1)"}}
                                  // onClick={()=>setTrigger(true)}
                              >
                                        
                              <BiSolidPencil
                                className='text-blue-600 text-lg '
                                onClick={handleClick}
                              />
                    
                                            
                          </h5>

                          <h5 className='rounded-full p-2 items-center justify-center bg-red-600' 
                                
                                  // onClick={()=>setTrigger(true)}
                              >

                                <MdDelete 
                                    className='text-white'
                                    onClick={handleDelete}
                                    />
                              </h5>

                      </div>

                    </div>




              <div className='flex justify-end w-full pt-14 pb-3'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5 text-sm'
                             onClick={()=>close()}
                            >
                            Back
                        </button>



                        <button
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             className='text-blue-700 rounded-full px-10 py-1.5 text-sm'
                             onClick={()=>setOthers(false) || setImg(false)}
                            >
                          Save and Continue
                        </button>


                   </div>

              </div>
            
            </div>
        </div>

  )
}
