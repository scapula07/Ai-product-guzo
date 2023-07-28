import React from 'react'
import guzo from "../../assets/guzoLogo.png"

export default function EditProfile() {
  return (

    <div className='w-full h-screen' style={{background: "rgba(242, 242, 242, 0.6)"}}>
            <div className='flex  h-full w-full justify-center  items-center space-x-20'>
            
            <img 
                src={guzo}
                className="w-1/7"
            />

            <div className='w-3/5 h-full py-20'>
                <Edit />
                 

            </div>

        </div>
     </div>
  )
}




const Edit=()=>{
    return (
        <div className='w-full flex flex-col  space-y-6  h-full' style={{background: "rgba(242, 242, 242, 0.6)"}}>
                <div className='w-full flex bg-white rounded-lg  border flex-col  space-y-8 py-4' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                    <div className='flex flex-col items-center w-full space-y-10'>
                        <h5 className='text-2xl font-semibold'>Edit Profile</h5>

                        <div className=' w-full h-44 flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}>
                            <h5 className='text-sm font-light'>Upload Profile Photo*</h5> 
                            <h5 className='text-xs font-light'>(Acceptable: jpeg, png)</h5>
                        </div>
    
                        <div className='rounded-full h-44 w-44 flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}>
                            <h5 className='text-sm font-light'>Upload Profile Photo*</h5> 
                            <h5 className='text-xs font-light'>(Acceptable: jpeg, png)</h5>
                        </div>
    
                    </div>

                    <div className='flex flex-col w-full px-10 space-y-4'>
                        <h5 className='text-lg font-semibold'>Name and Contact Info</h5>

                   
                        <div className='flex flex-col w-full  '>  
                            
        
                            <label className='text-sm text-slate-600 font-semibold'>Org Name*</label>
                                <input 
                                    placeholder='Org Name'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                />
    
                                
        
                        </div>
                        <div className='flex flex-col w-full '>  
            
                            <label className='text-sm text-slate-600 font-semibold'>Contact Email*</label>
                                <input 
                                    placeholder='Contact Email'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                />

                                    

                            </div>
                            <div className='flex flex-col w-full '>  
                                
                                  <label className='text-sm text-slate-600 font-semibold'>Contact Phone Number*</label>
                                    <input 
                                        placeholder='Contact Phone Number'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    />

                                

                            </div>

                            <h5 className='text-lg font-semibold'>Category</h5>

                        </div>
    
    
    
                    
                  </div>
                
                <div className='flex  items-center w-full justify-between'>
                    <h5 style={{color: "rgba(37, 31, 134, 1)"}}>Save and Close</h5>
                    <button className='px-6 py-2 text-blue-600 rounded-full' style={{background: "rgba(237, 237, 237, 1)"}}> Continue</button>
                                
                </div>
    
    
        </div>
      )
}