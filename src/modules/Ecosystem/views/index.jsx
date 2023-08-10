import React from 'react'
import Layout from '../../Layout'
import Tabs from '../components/tabs'
import { Outlet } from 'react-router-dom'

export default function Ecosystem() {
  return (
     <Layout>
          <div className='py-2 flex-col flex space-y-4'> 
              <h5 className='text-slate-700 font-semibold lg:text-xl text-sm'>Ecosystem</h5>
           
          </div>

          <div className=' w-full h-full space-x-10'>
            <div className='w-full overflow-y-auto h-full '>
                 <Tabs />
                

                <div className='py-6'>
                  
                
                </div>
                  <div className=''>
                      <Outlet />
                   
                  </div>
      
                 </div>
           
                

            </div>



    </Layout>

  )
}
