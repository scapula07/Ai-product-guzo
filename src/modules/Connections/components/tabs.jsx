import React from 'react'

export default function Tabs() {
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'>
            <h5 className='text-sm font-semibold'>Active</h5>
        </div>
          <div className='w-1/2 flex justify-center'>
            <h5 className='text-sm font-semibold'>Pending</h5>
          </div>
      
   </div>
  )
}
