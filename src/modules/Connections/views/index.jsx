import React from 'react'
import Layout from '../../Layout'
import { Outlet } from 'react-router-dom'
import Suggestions from '../../Home/views/suggestions'
import Tabs from '../components/tabs'
import { userState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"

export default function Connections() {
    const currentUser=useRecoilValue(userState)
  return (
    <Layout>
       <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold lg:text-xl text-sm'>Connections</h5>
           
        </div>
        <div className='flex w-full h-full space-x-10'>
            <div className='lg:w-3/5 w-full overflow-y-auto h-full '>
                 <Tabs />
                

                <div className='py-6'>
                  
                
                </div>
                  <div className=''>
                      <Outlet />
                   
                  </div>
      
                 </div>
                <div className='w-2/5 lg:block hidden'>
                    <Suggestions />

                </div>
                

            </div>

    </Layout>
  
  )
}
