import React from 'react'
import upload from "../../modules/assets/upload.png"

export default function Files({setOthers}) {
  return (
    <div className='w-full flex justify-center'>
        
        <div className='w-3/4 flex flex-col space-y-6'>
                    <h5 className='text-2xl font-semibold'>Select file(s)</h5>


                    <div className='flex flex-col space-y-4'>
                        <h5  className='text-lg font-semibold'>Add an Image for your Event Post</h5>
                        <div className='flex justify-center items-center h-48 w-full rounded-lg' style={{background: "rgba(242, 242, 242, 1)"}}>
                            <div className='flex flex-col items-center'>
                                <img 
                                    src={upload}
                                />
                                <h5 className='text-sm font-light'>Upload or Drop Images</h5>

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
