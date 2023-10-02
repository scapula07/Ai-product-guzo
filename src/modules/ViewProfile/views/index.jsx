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
import { db } from '../../Firebase'
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc } from 'firebase/firestore'


export default function ViewProfile() {
 

    const [ecosystem,setEcosystem]=useState()

    const location =useLocation()
    const eco=location?.state?.eco
    const account=location?.state?.account

     useEffect(()=>{
      
          
       if(eco?.id?.length >0){
            const unsub = onSnapshot(doc(db,"ecosystems",eco?.id), (doc) => {
              console.log("Current data: ", doc.data());
              setEcosystem({ ...doc.data(), id: doc.id })
              console.log({ ...doc.data(), id: doc.id },"ecosystem")
          });
      

       }
      },[])


    
  return (
        <Layout>
        <>
          

            <div className='flex w-full h-full space-x-10 py-4'>
             
                <div className='lg:w-3/5 w-full overflow-y-auto h-full no-scrollbar'>
                  <CoverSection
                   group={ecosystem}
                   account={account}
                   />
                  {eco?.type==="eco"?
                     ""
                        :
                        <div className='py-6'>
                            <CreatePost group={ecosystem}/>
                        </div>
                        }

                    {eco?.type==="eco"?
                        <div className=''>
                            <EcoFeed
                             group={{...ecosystem,id:eco?.id}}
                             account={account}
                             />
                        </div>
                      
                      :
                      <div className=''>
                       <Posts  
                         group={{...ecosystem,id:eco?.id}}
                       />
                       </div>

                   }
                  
                </div>
                <div className='w-2/5 lg:block hidden'>
                     {/* <Suggestions /> */}

                </div>
               

            </div>
            </>
            
        </Layout>
  )
}
