import React,{useState} from 'react'
import Layout from '../../Layout'
import { Outlet } from 'react-router-dom'
import Suggestions from '../../Home/views/suggestions'
import Tabs from '../components/tabs'
import { useLocation,useParams} from "react-router-dom";

export default function Collaboration() {
  const location =useLocation()
  const [collab,setCollab]=useState(location?.state?.collab)
  return (
    <Layout>
       <div className='py-2 flex-col flex space-y-4 px-10'> 
            <h5 className='text-slate-700 font-semibold lg:text-xl text-sm'>Opportunities</h5>
           
        </div>
        <div className=' w-full h-full space-x-10 px-10'>
            <div className='w-full overflow-y-auto h-full no-scrollbar'>
                 <Tabs />
                

                <div className='py-6'>
                  
                
                </div>
                  <div className=''>
                      <Outlet context={[collab]}/>
                   
                  </div>
      
                 </div>
           
                

            </div>

    </Layout>
  
  )
}