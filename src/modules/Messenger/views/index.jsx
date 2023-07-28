import React from 'react'
import Layout from '../../Layout'
import Contacts from '../components/contacts'
import Chatbox from './chatbox'

export default function Messenger() {
  return (
    <Layout>
        <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Messages</h5>
           
        </div>
       <div className='flex w-full space-x-6'>
          <div className='w-2/5  bg-white' style={{height:"80vh"}}>
             <Contacts />
          </div>
          <div className='w-3/5 h-96 bg-white' style={{height:"80vh"}}>
              <Chatbox />
         </div>


       </div>
    </Layout>
   
  )
}
