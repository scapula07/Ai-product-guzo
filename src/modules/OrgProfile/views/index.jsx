import React from 'react'
import Layout from '../../Layout'
import CoverSection from './coverSection'
import CreatePost from './createPost'
import Posts from './posts'
import Suggestions from './suggestions'

export default function Profile() {
    
  return (
        <Layout>
              <div className='py-2'> 
                 <h5 className='text-slate-700 font-semibold text-xl'>Profile</h5>
              </div>
          

            <div className='flex w-full h-full space-x-10'>
             
                <div className='w-3/5 overflow-y-auto h-full'>
                  <CoverSection />

                  <div className='py-6'>
                    <CreatePost />
                  </div>
                  <div className=''>
                    <Posts />
                  </div>
                </div>
                <div className='w-2/5'>
                     <Suggestions />

                </div>
               

            </div>
            
        </Layout>
  )
}
