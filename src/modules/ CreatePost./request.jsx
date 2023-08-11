import React from 'react'

export default function Request({setOthers, requestPost, setRequest,setRequests,requests}) {

    const close=()=>{
        setOthers(false)
        setRequest(false) 
        setRequests([...requests,requestPost])
    }
  return (
    <div className='w-full flex justify-center'>
          <div className='w-3/4 flex flex-col space-y-10'>
              <h5 className='text-2xl font-semibold'>Add a request to your post...</h5>

              <div className='flex flex-col space-y-6'>
                    <div className='flex flex-col w-full space-y-2'>
                                <label className='text-sm text-slate-700'>Request Title*</label>
                                <input 
                                    placeholder='What do you need...'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                                    name="title"
                                    value={requestPost?.title}
                                    onChange={(e)=>setRequest({...requestPost,title:e.target.value})}
            
                                />

                        </div> 
                    
                        <div className='flex flex-col w-full space-y-2'>
                                <label className='text-sm text-slate-700'>Request Body*</label>
                                <textarea
                                    placeholder='Include a description of your opportunity, request or need..... '
                                    className=' py-2 h-28 px-4 w-full rounded-md text-sm outline-none border'
                                    name="body"
                                    value={requestPost?.body}
                                    onChange={(e)=>setRequest({...requestPost,body:e.target.value})}
            
            
                                />

                        </div> 

              </div>


              <div className='flex justify-end w-full pt-20 pb-6'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5 border border-blue-700'
                             onClick={close}
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
