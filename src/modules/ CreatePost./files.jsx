import React,{useRef,useState} from 'react'
import upload from "../../modules/assets/upload.png"

export default function Files({setOthers,setPost,post,setFile,url,setUrl}) {
  
    const hiddenFileInput = useRef()

    const handleClick = event => {
            hiddenFileInput.current.click()
        }

        const handleChange = async(e)=> {
            const dir = e.target.files[0]
            console.log(dir,"dir")
            if (dir) {
          
            setPost({...post,file:dir})
            }
    
        }
  return (
    <div className='w-full flex justify-center'>
        
        <div className='w-3/4 flex flex-col space-y-6'>
                
                    <h5  className='text-2xl font-semibold'>Add a file to your post...</h5>

                    <div className='flex flex-col space-y-4'>
                       <h5 className='text-lg font-semibold'>Select file(s)</h5>
                        <div className='flex justify-center items-center h-48 w-full rounded-lg' style={{background: "rgba(242, 242, 242, 1)"}}>
                        {url?.length ==0&&
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
                                <h5 className='text-sm font-light'>Upload or Drop File(s)</h5>

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

                    </div>




              <div className='flex justify-end w-full pt-14 pb-3'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5 border border-blue-700'
                             onClick={()=>setOthers(false) || setFile(false)}
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
