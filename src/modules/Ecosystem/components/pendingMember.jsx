import { Face2 } from '@mui/icons-material';
import React,{useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { ecosystemApi } from '../api';
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";


export default function PendingMember({group,member,setMembers}) {
    const [accepted,setAccept]=useState(false)
    const [ignore,setIgnore]=useState(false)
    // const [isLoading,setLoading]=useState(false)
    const [loading,setLoader]=useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const accept=async(id,member)=>{
       
        setErrorMsg(null)
         try{
            setAccept(true)
            const result =await ecosystemApi.acceptMember(id,member)
         
            
            result&&setAccept(false)
           

         }catch(e){
            console.log(e)
            setLoader(false)
            setAccept(false)

            setErrorMsg(e.message)

         }
         
       }


     const ignoreRequest=async(id,member)=>{
       
        setErrorMsg(null)
         try{
            setIgnore(true)
            const result =await ecosystemApi.ignore(id,member)
            console.log(result?.status,"resss")
            result?.status&&setMembers({active:result?.active,pending:result?.pending})
            result?.status&&setIgnore(false)
           
            setIgnore(false)
         }catch(e){
            console.log(e)
            setLoader(false)
            setIgnore(false)

            setErrorMsg(e.message)

         }
         
       }
    console.log(accepted,"accepted")


  return (
      <div className='flex flex-col bg-white rounded-lg w-full '>
            <div className='flex items-center py-3 px-5 rounded-lg w-full justify-between'>
                    <div className='flex items-center space-x-4'>
                        <>
                          {member?.type?.length >0?
                                <img 
                                src={member?.img}
                                className="w-20 h-20 rounded-full"

                                />
                                :
                                <>
                                {member?.img?.length>0?
                                    <img 
                                        src={member?.img}
                                        className="h-20 w-20 rounded-full"
                                      />
                                        :
                                        <div className='rounded-full p-2 items-center justify-center flex border'
                                        >
                                        <h5 className='font-semibold text-sm'> {member?.firstName?.slice(0,1) +member?.lastName?.slice(0,1)}</h5>
                                    </div>
                                        

                                     }

                                  
                                 </>


                          }
                           
                           </>
                       
                         {member?.type?.length >0?
                            <div className='flex flex-col space-y-4'>
                                <h5 className='text-xl font-semibold'>{member?.name}</h5>
                                
                            </div>
                                :
                                <div className='flex flex-col space-y-4'>
                                    {member?.firstName?.length !=undefined?
                                       <h5 className='text-xl font-semibold'>{member?.firstName + " " + member?.lastName }</h5>
                                       :
                                       <h5 className='text-xl font-semibold'>{member?.display }</h5>

                                    }
                                   
                               </div>



                            }
                       
                 </div>

                <div className='flex items-center justify-end w-1/2 '>
                    <div className='w-1/3 flex items-center space-x-8 '>
                         {ignore?
                    
                         <ClipLoader 
                                    color={"rgba(62, 51, 221, 1)"}
                                

                            />
                        
                            :

                                <h5 className='text-slate-600 font-semibold text-lg '
                                onClick={()=>ignoreRequest(group?.id,member)}
                                >
                                    Ignore
                                </h5>
                            }
                        {accepted?
                    
                            <ClipLoader 
                                color={"rgba(62, 51, 221, 1)"}
                            

                            />
                    
                        :
                            <button 
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                className='text-blue-700 rounded-full px-8 py-1.5'
                                onClick={()=>accept(group?.id,member)}
                            
                                > 
                            Accept
                            
                            </button>
                        }
                   </div>
                </div>
            <div>
            </div>
        </div>
        <div className='px-8 pb-5'>
                {/* <div className='bg-slate-200 py-2 px-4 h-20 rounded-lg flex flex-col space-y-6'>
                    <h5 className='text-xs'>Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate consectetur adipiscing...
                      <span className='text-black text-sm font-semibold'>see more</span>
                    </h5>

                        {member?.type?.length >0?
                            
                                <h5 className='text-xs '> Reply to {member?.name}</h5>
                                :
                                <div className='flex flex-col space-y-4'>
                                    {member?.firstName?.length !=undefined?
                                       <h5 className='text-xs'>Reply to {member?.firstName + " " + member?.lastName }</h5>
                                       :
                                       <h5 className='text-xs '>Reply to {member?.display }</h5>

                                    }
                                   
                               </div>



                        }

                </div> */}
            </div>

          {errorMsg && (

                <Snackbar open={true} autoHideDuration={1000}   anchorOrigin={{ vertical:"top", horizontal:"center"}}>
                    <Alert onClose={""} severity="error" sx={{ width: '100%' }}>
                        {errorMsg}
                    </Alert>
                </Snackbar>
          )}

    </div>
  )
}
