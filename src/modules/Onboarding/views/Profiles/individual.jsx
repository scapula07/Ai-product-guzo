import React from 'react'

export default function Individual() {
  return (
    <div className='w-full flex flex-col  space-y-6 ' style={{background: "rgba(242, 242, 242, 0.6)"}}>
        <div className='w-full flex bg-white rounded-lg  border flex-col  space-y-8 py-28' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
               <div className='flex flex-col items-center w-full space-y-10'>
                  <h5 className='text-xl font-semibold'>Create your profile...</h5>

                  <div className='rounded-full h-44 w-44 flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}>
                       <h5 className='text-sm font-light'>Upload Profile Photo*</h5> 
                       <h5 className='text-xs font-light'>(Acceptable: jpeg, png)</h5>
                  </div>

               </div>


               <div className='flex flex-col w-full px-10'>  

                      <label className='text-sm text-slate-600 font-semibold'>Individual Account Display Name*</label>
                        <input 
                            placeholder='Display Name'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        />

                        <h5 className='font-light text-slate-500 text-sm '>This will be the name that displays for your individual account.</h5>

               </div>


  

        </div>
        
        <div className='flex  items-center w-full justify-between'>
            <h5 style={{color: "rgba(37, 31, 134, 1)"}}>Back</h5>
            <button className='px-6 py-2 text-blue-600 rounded-full' style={{background: "rgba(237, 237, 237, 1)"}}> Continue</button>
                        
        </div>


    </div>
  )
}
