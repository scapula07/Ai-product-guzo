import React ,{useState} from 'react'
import Modal from '../Modal'
import {AiOutlineClose } from "react-icons/ai"
import { postApi } from './_api'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";

export default function Join({group,feed,index}) {
    console.log(index,"iiiiii")
    const [request,setRequest]=useState({active:false})
    const [isLoading,setLoader]=useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [open, setOpen] = useState(false);



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

     const join=async()=>{
        console.log("joining")
        setLoader(true)
        setErrorMsg(null)
        if(group?.type?.length>0){
             request["img"]=group?.img
         }else if(group?.img?.length >0){
            request["img"]=group?.img

         }else{
            request["img"]=""

          }
        try{
            const response =await postApi.joinPost(feed,request,index,group)
            response&&setTrigger(false)
            response&&setLoader(false)
            response&&setOpen(true)
          }catch(e){
            console.log(e)
            setLoader(false)
            setErrorMsg(e.message)
          }


    }

    

    const [trigger,setTrigger]=useState(false)
  return (
   <>
      <button className='text-white font-semibold rounded-full px-8 w-1/2 py-2 '
       style={{background: "linear-gradient(70.54deg, #281CF5 17.62%, #5DE4D7 94.09%)"}}
       onClick={()=>setTrigger(true)}
       >
        
          Join now
     </button>

        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical:"top", horizontal:"center"}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
               You succesfully join this posts
            </Alert>
         </Snackbar>




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
               <div className='px-10 py-1'>
                        {errorMsg && (
                        // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                        <Alert severity="error">{errorMsg}</Alert>
                        )}

                 </div>


            <div className=''>
                <Form 
                  request={request}
                  setRequest={setRequest}
                />
            </div>

            <div className='flex items-center justify-end space-x-4 pb-6'>
                            <button className='text-blue-700 border-blue-700 border rounded-full px-4 py-1 text-sm'
                            
                                onClick={()=>setTrigger(false) || setRequest({})}
                                 >
                                  Cancel
                       
                               </button>

                               {isLoading?
                             
                                    <ClipLoader 
                                        color={"rgba(62, 51, 221, 1)"}
                                        loading={isLoading}
                                    />
                             :
                              <button className='text-blue-700 rounded-full px-4 py-1 text-sm'
                                    style={{background: "rgba(236, 235, 254, 1)"}}
                                    onClick={()=>join()}
                                
                                   >
                                    Submit
                       
                               </button>
                               }

              </div>

        </div>

     </Modal>
   </>
  )
}



const Form=({request,setRequest})=>{
    return(

        <div className='flex flex-col py-8 space-y-6'>
            <div className='flex items-center w-full space-x-4'>
                <div className='flex flex-col w-1/2 space-y-2'>
                    <label className='text-sm text-slate-700'>First Name</label>
                    <input 
                        placeholder='First Name'
                        className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                        name="firstName"
                        value={request?.firstName}
                        onChange={(e)=>setRequest({...request,firstName:e.target.value})}
                    

                    />

                </div>
                <div className='flex flex-col w-1/2 space-y-2'>
                    <label className='text-sm text-slate-700'>Last Name</label>
                        <input 
                            placeholder='Last Name'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            value={request?.lastName}
                            onChange={(e)=>setRequest({...request,lastName:e.target.value})}
                        />

                </div>

            </div>
            <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Email</label>
                        <input 
                            placeholder='Email'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="email"
                            value={request?.email}
                            onChange={(e)=>setRequest({...request,email:e.target.value})}
                            
                        />

                </div>
                <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Phone number</label>
                        <input 
                            placeholder='Phone number'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            value={request?.phone}
                            onChange={(e)=>setRequest({...request,phone:e.target.value})}
                            
                        />

                </div>
                <div className='flex flex-col w-full space-y-2'>
                    <label className='text-sm text-slate-700'>Add Note:</label>
                        <textarea 
                            placeholder='Add a description of your experience..... '
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border '
                            name="lastName"
                            value={request?.note}
                            onChange={(e)=>setRequest({...request,note:e.target.value})}
                            
                        />

                </div>

        </div>

    )
}
