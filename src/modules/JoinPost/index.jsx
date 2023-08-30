import React ,{useState} from 'react'
import Modal from '../Modal'
import {AiOutlineClose } from "react-icons/ai"

export default function Join({group}) {

    const [trigger,setTrigger]=useState(false)
  return (
   <>
      <button className='text-white font-semibold rounded-full px-8 w-1/2 py-2 '
       style={{background: "linear-gradient(70.54deg, #281CF5 17.62%, #5DE4D7 94.09%)"}}
       onClick={()=>setTrigger(true)}
       >
        
          Join now
     </button>

     <Modal trigger={trigger}  cname="w-1/2 py-2   px-8 rounded-lg " >
        <div className='w-full flex justify-end px-6 py-2'>
            <AiOutlineClose 
            onClick={()=>setTrigger(false)}
            />
        </div>

        <div className='flex flex-col space-y-6'>
             <div className='flex flex-col space-y-4'>
                 <h5 className='text-xl font-semibold'>Thank you for your consideration!</h5>
                 <h5 className='text-sm'>You will be joining as:</h5>

             </div>

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
                         <h5 className='font-semibold text-sm'> {group?.firstName?.slice(0,1) +group?.lastName?.slice(0,1)}</h5>
                      </div>
                        

                    }
                    
                   
                 </>
                 }
                {group?.type?.length>0?

               
                    <div className='flex flex-col '>
                        <h5 className='font-semibold'>{group?.name}</h5>
                        <h5 className='text-sm font-light'>{group?.type}</h5>

                    </div>
                    :
                    <div className='flex flex-col '>
                        <h5 className='font-semibold'>{group?.firstName + " " + group?.lastName}</h5>

                    </div>

                 }
         </div>

            <div className=''>
                <Form />
            </div>

            <div className='flex items-center justify-end space-x-4 pb-6'>
                            <button className='text-blue-700 border-blue-700 border rounded-full px-4 py-1 text-sm'
                            
                                onClick={()=>setTrigger(false)}
                                 >
                                  Cancel
                       
                               </button>
                              <button className='text-blue-700 rounded-full px-4 py-1 text-sm'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                             
                                 >
                                    Submit
                       
                               </button>

              </div>

        </div>

     </Modal>
   </>
  )
}



const Form=({})=>{
    return(

        <div className='flex flex-col py-8 space-y-6'>
            <div className='flex items-center w-full space-x-4'>
                <div className='flex flex-col w-1/2 space-y-2'>
                    <label className='text-sm text-slate-700'>First Name</label>
                    <input 
                        placeholder='First Name'
                        className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                        name="firstName"
                    

                    />

                </div>
                <div className='flex flex-col w-1/2 space-y-2'>
                    <label className='text-sm text-slate-700'>Last Name</label>
                        <input 
                            placeholder='Last Name'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            
                        />

                </div>

            </div>
            <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Email</label>
                        <input 
                            placeholder='Email'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            
                        />

                </div>
                <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Phone number</label>
                        <input 
                            placeholder='Phone number'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            
                        />

                </div>
                <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Add Note:</label>
                        <textarea 
                            placeholder='Add a description of your experience..... '
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            
                        />

                </div>

        </div>

    )
}
