import React,{useEffect,useState} from 'react'
import Layout from '../../Layout'
import { Outlet } from 'react-router-dom'
import Suggestions from '../../Home/views/suggestions'
import Tabs from '../components/tabs'
import { userState,groupState } from '../../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import { connectApi } from '../api'
import { db } from '../../Firebase'

import { doc, onSnapshot ,updateDoc} from "firebase/firestore"



export default function Connections() {
    const currentUser=useRecoilValue(userState)
    const group=useRecoilValue(groupState)
    const [connects,setConnect]=useState()



    useEffect(()=>{
        if(group?.id?.length >0){
            let collection="individuals"
            if(group?.type?.length >0){
            collection=group?.type ==="eco"?"ecosystems" :"organizations"
            }
            
            const ref = doc(db,collection, group?.id);
            const unsub = onSnapshot(ref, (doc) => {
                if(group?.type?.length >0){
                setConnect({pending:doc.data()?.pendingMemberships,active:doc.data()?.connections})
                }else{
                    setConnect({pending:doc.data()?.pending,active:doc.data()?.connections}) 

                }
            });


        }
    },[group])


     useEffect(()=>{
        const seen=async()=>{
          const result = await updateDoc(doc(db,"unseen",group?.id), {
            connections:false
           })
        }
  
      group?.id?.length >0&& seen()
      
    },[group?.id])

  return (
    <Layout>
       <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold lg:text-xl text-sm'>Connections</h5>
           
        </div>
        <div className='flex w-full h-full space-x-10'>
            <div className='lg:w-3/5 w-full overflow-y-auto h-full no-scrollbar '>
                 <Tabs />
                

                <div className='py-6'>
                  
                
                </div>
                  <div className='relative z-50'>
                      <Outlet context={[connects]}/>
                   
                  </div>
      
                 </div>
                <div className='w-1/5 lg:block hidden'>
                    {/* <Suggestions /> */}

                </div>
                

            </div>

    </Layout>
  
  )
}
