import React,{useEffect} from 'react'
import Layout from '../../Layout'
import Tabs from '../components/tabs'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ecosystemApi } from '../api'
import { groupState,userState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"

export default function Ecosystem() {
    const currentUser=useRecoilValue(userState)

    
  return (
     <Layout>
          <div className='py-2 flex-col flex space-y-4 w-full'> 
              <h5 className='text-slate-700 font-semibold lg:text-xl text-sm'>Ecosystem</h5>
           
          </div>

          <div className=' w-full h-full space-x-10'>
            <div className='w-full overflow-y-auto h-full no-scrollbar'>
                 <Tabs />
                

                <div className='py-6'>
                  
                
                </div>
                  <div className='w-full'>
                      <Outlet />
                   
                  </div>
      
                 </div>
           
                

            </div>



    </Layout>

  )
}
