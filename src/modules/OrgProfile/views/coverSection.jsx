import React from 'react'
import cover from "../../assets/orgcover1.png"
import orgPic from "../../assets/orgcover.png"


export default function CoverSection({group}) {
 
  return (
    <div className='w-full flex flex-col space-y-4'>
      
        <div className='w-full flex flex-col  bg-white  rounded-lg'>
                <img 
                src={group?.cover }
                className="w-full h-33"

                />

                <div className='flex lg:flex-row flex-col py-6 space-x-4 px-4'>
                    <img 
                    src={group?.profile}
                    className="rounded-full lg:h-33 lg:w-33 h-10 w-10"
                    />

                    <div className='flex  flex-col w-full'>
                        <div className='flex items-center justify-between w-full'>
                            <h5 className='text-xl font-semibold'>{group?.name }</h5>

                            <button className=' border rounded-full py-1 px-8 text-sm font-semibold' style={{borderColor: "rgba(40, 28, 245, 1)"}}>Edit profile</button>

                        </div>
                        <div className='flex flex-col py-2 space-y-4'>
                                <p className='font-semibold text-sm'>
                                Worem ipsum dolor sit amet, consectetur adipiscing. 
                                </p>

                                <h5 className='text-slate-500 font-semibold'>Houston, Texas, United States</h5>

                        </div>
                    

                    </div>
                    
                </div>
              

                <div className='px-4 py-2 flex flex-col space-y-6'>
                    <div className='flex flex-col space-y-2 px-4 py-2 rounded-lg'  style={{background: "linear-gradient(0deg, #ECEBFE, #ECEBFE)"}} >
                        <h5 className='text-lg font-semibold'>About Common Desk</h5>
                        <p className='text-xs '>
                        Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis ipsum dolor.... 
                        <span className='font-semibold'>see more</span>.
                        </p>

                    </div>

                    <div className=''>
                        <h5 className='text-slate-700 text-sm font-semibold'>Membership</h5>

                    </div>
                </div>
               


        </div>


    </div>
  )
}
