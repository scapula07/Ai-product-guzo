import React,{useState,useEffect} from 'react'
import Layout from '../../Layout'
import CoverSection from './coverSection'
import CreatePost from './createPost'
import Posts from './posts'
import Suggestions from './suggestions'
import { groupState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import EcoFeed from './ecoFeed'
import { profileApi } from '../../EditProfile/api'

export default function Profile() {
    const group =useRecoilValue(groupState)
    
    console.log(group?.type,"group profile")
    const [profile,setUpdate]=useState()



    
        useEffect(()=>{
           const fetchProfile=async()=>{
              const response =await profileApi.fetchProfile(group)
              console.log(response,"res profile")
              setUpdate(response,"response")
            }

           fetchProfile()

         },[group])
 
    
  return (
        <Layout>
              <div className='py-2'> 
                 <h5 className='text-slate-700 font-semibold lg:text-xl text-lg'>Profile</h5>
              </div>
          

            <div className='flex w-full h-full space-x-10'>
             
                <div className='lg:w-3/5 w-full overflow-y-auto h-full no-scrollbar'>
                  <CoverSection group={profile}/>
                     {group?.type==="eco"?
                         ""
                        :
                        <div className='py-6'>
                            <CreatePost group={group}/>
                        </div>
                        }

                    {group?.type==="eco"?
                        <div className=''>
                            <EcoFeed group={group}/>
                        </div>
                      
                      :
                      <div className=''>
                       <Posts />
                       </div>

                   }
                  
                </div>
                <div className='w-2/5 lg:block hidden'>
                     {/* <Suggestions /> */}

                </div>
               

            </div>
            
        </Layout>
  )
}
