import React,{useState} from 'react'
import {RiArrowDownSLine} from "react-icons/ri"
import {AiOutlineClose} from "react-icons/ai"


export default function Request({reqs}) {
  return (
    <div className='flex flex-col rounded-lg'>
        {reqs?.map((req)=>{
            return(
                <RequestCard 
                  req={req}
                />
            )
        })

        }

    </div>
  )
}



const RequestCard=({req})=>{
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    const [trigger,setTrigger]=useState(false)
  
      const color=[
          "",
          "rgba(197, 193, 251, 1)",
          "rgba(205, 247, 243, 1)",
          "rgba(254, 247, 197, 1)",
          "rgba(255, 198, 201, 1)"
      ]
     return(
          <div className='flex flex-col py-6 px-4 space-y-4 rounded-lg' style={{background:`${color[randomNumber]}`}} >
              <div className='flex items-center justify-between'>
                    <h5 className='text-xl font-semibold'>{req?.title}</h5>
                    {trigger?
                        <AiOutlineClose
                        className='text-xl font-light'
                        onClick={()=>setTrigger(false)}
                      />
                      :
                      <RiArrowDownSLine 
                      className='text-3xl font-semibold'
                      onClick={()=>setTrigger(true)}
                    />
                      
  
                    }
                   
  
              </div>
              {trigger&&
                <div className='flex flex-col space-y-2'>
                     <p>{req?.body}</p>
                     <div className='flex justify-center w-full'>
                        <button className='text-white font-semibold rounded-full px-8 w-1/2 py-2 ' style={{background: "linear-gradient(70.54deg, #281CF5 17.62%, #5DE4D7 94.09%)"}}>Join now</button>
                  
                      </div>
                    
                </div>
               }
                
  
         </div>
  
     )
  }