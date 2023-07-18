import React from 'react'

export default function Tabs() {
  return (
    <div className='bg-white w-full rounded-lg flex items-center    px-8 py-2'>
        <div className='w-1/2 flex justify-center'>
            <h5 className='text-sm font-semibold'>My Opportunities</h5>
        </div>
          <div className='w-1/2 flex justify-center'>
            <h5 className='text-sm font-semibold'>Joined Opportunities</h5>
          </div>
          <div className='w-1/2 flex justify-center'>
            <h5 className='text-sm font-semibold'>Contacts</h5>
          </div>
      
   </div>
  )
}
