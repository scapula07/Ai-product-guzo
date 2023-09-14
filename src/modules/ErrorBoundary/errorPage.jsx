import React from 'react'
import Layout from '../Layout'
export default function ErrorPage() {
  return (
    <Layout>
            <div className='w-full h-full flex flex-col items-center space-y-20'>
                 <div className='flex flex-col space-y-1 items-center'>
                     <h5 className='text-blue-600 text-3xl'>ooops!</h5>
                     <h5 className='text-black text-xl'>Something went wrong</h5>

                 </div>

                 <div className='flex flex-col'>
                     <button className='bg-blue-600 py-3 px-12 rounded-lg text-white'
                      onClick={()=>window.history.back(-1)}
                     >Back to previous page</button>

                 </div>

            </div>

    </Layout>
    
  )
}
