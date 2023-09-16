import React from 'react'

export default function Profile({ shareBy}) {
  console.log(shareBy,"sharedd")
  return (
      <div className='bg-white flex flex-col h-56 w-4/5 items-center rounded-lg'>
         {shareBy?.type?.length >0?
             <div className='flex flex-col items-center space-y-2'>
                <img 
                  src={shareBy?.img}
                  className="w-28 h-28 rounded-full"
                />
    
                <h5 className='text-sm font-semibold'>{shareBy?.name}</h5>
    
           </div>
              :
             <div className='flex flex-col items-center space-y-2'>
              <img 
               src={shareBy?.img}
               className="w-28 h-28 rounded-full"
             />

             <h5 className='text-sm font-semibold'>{shareBy?.firstName + " " + shareBy?.lastName }</h5>

         </div>

         }
         
          <div className='flex flex-col py-3'>
            <button className='rounded-full px-8 py-1 text-blue-700 border border-blue-700 text-xs'>View profile</button>

          </div>

      </div>
  )
}
