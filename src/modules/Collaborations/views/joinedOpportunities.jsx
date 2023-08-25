import op1 from  "../../assets/new2.png"
import op2 from  "../../assets/conference.png"
import op3 from  "../../assets/new3.png"
import op4 from  "../../assets/new1.png"
import op5 from  "../../assets/new5.png"
import op6 from  "../../assets/new4.png"
import {FiMessageSquare} from "react-icons/fi"
import {BsThreeDots} from "react-icons/bs"

export default function JoinedOpportunities() {
        return (
            <div className="flex flex-col w-full space-y-20">
                 
                  
                    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                        
                        {pending.map((eco)=>{
                            return(
                                <div className='flex flex-col bg-white py-4 px-4 space-y-4'>
                                    <div className='flex justify-end'>
                                        <h5 className=' py-1 px-4 rounded-lg text-white text-sm' style={{background: "rgba(142, 142, 142, 1)"}}>Pending Approval</h5>
                                    </div>
                                    <div className='flex flex-col items-center space-y-3'>
                                        <img 
                                        src={eco.img}
                                        className="rounded-md w-full h-36"
                                        />
                                        <h5 className=' text-center font-semibold '>{eco?.name}</h5>
                                        <h5 className='text-sm font-semibold text-slate-600'>
                                            Hosted by
                                        </h5>
                                    </div>
                
                                    <div className='flex flex-col items-center space-y-3 py-4'>
                                        <p className=' text-center font-light text-sm'>
                                        Worem ipsum dolor sit amet, consectetur adi...
                                        </p>
                
                                        <div className='flex items-center space-x-3 py-2'> 
                                        <h5 className='rounded-full px-6 py-2.5 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(236, 235, 254, 1)"}}>
                                            Manage
                                        </h5>
                                        <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
                                            <BsThreeDots 
                                                className='text-blue-600 text-2xl'
                                            />
                                        </h5>
                                        </div>
                                    </div>
                
                                </div>
                            )
                        })
                
                        }
        
                    </div>


                    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                    
                            {active.map((eco)=>{
                                return(
                                    <div className='flex flex-col bg-white py-4 px-4 space-y-4'>
                                        <div className='flex justify-end'>
                                            <h5 className='bg-black py-1 px-4 rounded-lg text-white text-sm'>Active</h5>
                                        </div>
                                        <div className='flex flex-col items-center space-y-3'>
                                            <img 
                                            src={eco.img}
                                            className="rounded-md w-full h-36"
                                            />
                                            <h5 className=' text-center font-semibold '>{eco?.name}</h5>
                                            <h5 className='text-sm font-semibold text-slate-600'>
                                                Hosted by
                                            </h5>
                                        </div>
                    
                                        <div className='flex flex-col items-center space-y-3 py-4'>
                                            <p className=' text-center font-light text-sm'>
                                            Worem ipsum dolor sit amet, consectetur adi...
                                            </p>
                    
                                            <div className='flex items-center space-x-3 py-2'> 
                                            <h5 className='rounded-full px-6 py-2.5 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(236, 235, 254, 1)"}}>
                                                Manage
                                            </h5>
                                            <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>
                                                <BsThreeDots 
                                                    className='text-blue-600 text-2xl'
                                                />
                                            </h5>
                                            </div>
                                        </div>
                    
                                    </div>
                                )
                            })
                    
                            }
            
                </div>


            </div>

        )
      }
      
      
      
      const active=[
        {
          name:"Houston Startup Showcase",
          img:op1
      
         },
         {
          name:"Cup of JoeY",
          img:op2
      
         },
         {
          name:"Investor Studio Series",
          img:op3
      
         },
         {
          name:"Open Accelerator Series",
          img:op4
      
         },
         {
          name:"Tech Rodeo",
          img:op5
      
         }
      ]


      const pending=[
        {
          name:"Guzo Festival",
          img:op6
      
         }
      ]