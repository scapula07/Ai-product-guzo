import React,{useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { ecosystemApi } from '../api';

export default function PendingMember({group,member}) {
    const [accepted,setAccept]=useState(false)
    const [isLoading,setLoading]=useState(false)

    const accept=async(id,member)=>{
        setLoading(true)
       
         try{
           
            const result =ecosystemApi.acceptMember(id,member)
            setLoading(false)
            setAccept(true)
         }catch(e){
            console.log(e)
            setLoading(false)
         }
         
       }


  return (
      <div className='flex flex-col bg-white rounded-lg w-full space-y-2'>
            <div className='flex items-center py-6 px-2 rounded-lg w-full justify-between'>
                    <div className='flex items-center space-x-4'>
                        <img 
                            src={member?.img}
                            className="w-14 h-14 rounded-full"
                        />

                        <div className='flex flex-col'>
                            <h5 className='text-xl font-semibold'>{member?.name}</h5>
                            <h5 className='text-sm '>{"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "}</h5>
                        </div>
                </div>

                <div className='flex items-center space-x-4 justify-end w-1/4'>
                    <h5 className='text-slate-600 font-semibold text-lg'>Ignore</h5>
                    {isLoading===true&&
                
                        <ClipLoader 
                            color={"rgba(62, 51, 221, 1)"}
                        

                        />
                    }
                    {!isLoading&&
                        <button 
                            style={{background: "rgba(236, 235, 254, 1)"}}
                            className='text-blue-700 rounded-full px-8 py-1.5'
                            onClick={()=>accept(group?.id,member)}
                        
                            > 
                            Accept
                        </button>
                    }

                </div>
            <div>
            </div>
        </div>
        <div className='px-8 py-2'>
                <div className='bg-slate-200 py-2 px-4 h-20 rounded-lg'>
                    <h5 className='text-xs'>Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate consectetur adipiscing... see more. </h5>


                </div>
        </div>

    

    </div>
  )
}
