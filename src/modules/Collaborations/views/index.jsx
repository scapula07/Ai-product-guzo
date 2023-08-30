import React,{useEffect,useState} from 'react'
import Layout from '../../Layout'
import { Outlet } from 'react-router-dom'
import Suggestions from '../../Home/views/suggestions'
import Tabs from '../components/tabs'
import { collaborationApi } from '../_api'
import { groupState,userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'

export default function Collaborations() {
  const group =useRecoilValue(groupState)
  const [collabs,setCollabs]=useState([])
  const [isLoading,setLoading]=useState(false)
  const [arePosts,setPost]=useState("")


  useEffect(()=>{
    const getAllCollabs=async()=>{
        const collabs=await collaborationApi.getAllCollaborations(group?.id)
        collabs?.length===0 &&setPost("No Feeds")
        collabs?.length >0 &&setPost("")
        setCollabs(collabs)

    }
    getAllCollabs()

 },[group])
 console.log(collabs,"collabs")
   
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
                      <Outlet context={[collabs,arePosts]}/>
                   
                  </div>
      
                 </div>
           
                

            </div>

    </Layout>
  
  )
}