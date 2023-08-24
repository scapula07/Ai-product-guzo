import React ,{useEffect,useState} from 'react'
import Layout from '../../Layout'
import CoverSection from './coverSection'
import CreatePost from './createPost'
import Posts from './posts'
import Suggestions from './suggestions'
import { groupState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import EcoFeed from './ecoFeed'
import { useLocation,useParams} from "react-router-dom";
import { ecosystemApi } from '../_api'


export default function ViewProfile() {
 

    const [ecosystem,setEcosystem]=useState()

    const location =useLocation()
    const eco=location?.state?.eco
     useEffect(()=>{
        const getEcosystem=async()=>{
          
            const response =await ecosystemApi.getEcosystem(eco?.id)
            console.log(response,"response")
            setEcosystem(response)

         }
        getEcosystem()

     },[])

     console.log(ecosystem,"system")
    
  return (
        <Layout>
              <div className='py-2'> 
                 <h5 className='text-slate-700 font-semibold lg:text-xl text-lg'>Profile</h5>
              </div>
          

            <div className='flex w-full h-full space-x-10'>
             
                <div className='lg:w-3/5 w-full overflow-y-auto h-full'>
                  <CoverSection group={ecosystem}/>
                  {eco?.type==="eco"?
                     ""
                        :
                        <div className='py-6'>
                            <CreatePost group={ecosystem}/>
                        </div>
                        }

                    {eco?.type==="eco"?
                        <div className=''>
                            <EcoFeed group={ecosystem}/>
                        </div>
                      
                      :
                      <div className=''>
                       <Posts />
                       </div>

                   }
                  
                </div>
                <div className='w-2/5 lg:block hidden'>
                     <Suggestions />

                </div>
               

            </div>
            
        </Layout>
  )
}
