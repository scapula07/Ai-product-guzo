import React from 'react'
import Layout from '../../Layout'
import Suggestions from './suggestions'
import Tabs from '../components/tabs'
import CreatePost from './createPost'
import { Outlet } from 'react-router-dom'

import {useRecoilValue} from "recoil"
import { groupState,userState } from '../../Recoil/globalstate'

export default function Home() {
    const group =useRecoilValue(groupState)
    const currentUser=useRecoilValue(userState)
  return (
    <Layout>
        <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold lg:text-xl text-lg'>Home</h5>
           
        </div>
        <div className='flex w-full h-full space-x-10'>
            <div className='lg:w-3/5 overflow-y-auto h-full '>
                 <Tabs />
                

                <div className='py-6'>
                    <CreatePost
                      group={group}
                      currentUser={currentUser}
                     />
                
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
