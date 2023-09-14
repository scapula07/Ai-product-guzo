import React,{useRef,useState} from 'react'
import upload from "../../modules/assets/upload.png"

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

        const close=()=>{
          setOthers(false) 
          setImg(false)
          setPost({...post,img:null})
          setUrl("")
        }
  return (
    <div className='w-full flex justify-center'>
        
        <div className='w-3/4 flex flex-col space-y-6'>
                   
                    <h5  className='text-2xl font-semibold'>Add an Image for your Event Post</h5>

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

                    </div>




              <div className='flex justify-end w-full pt-14 pb-3'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5 border border-blue-700'
                             onClick={()=>close()}
                            >
                            Back
                        </button>



                        <button
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             className='text-blue-700 rounded-full px-12 py-1.5'
                             onClick={()=>setOthers(false) || setImg(false)}
                            >
                            Next
                        </button>


                   </div>

              </div>
            
            </div>
        </div>

  )
}
