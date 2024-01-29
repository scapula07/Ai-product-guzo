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
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../../Firebase'
import { useLocation,useParams} from "react-router-dom";

export default function PosterProfile() {

    
    const location =useLocation()
    const group=location?.state?.group
    console.log(group,group?.id,"group profile herr>>>>>>>>>>>>>>>>>>")
    const [profile,setUpdate]=useState()



    
        useEffect(()=>{
      
            if(group?.id?.length >0){
              let collectionName="individuals"
              if(group?.type?.length >0){
                collectionName= group?.type=="eco"?"ecosystems":"organizations"
       
              }

              const unsub = onSnapshot(doc(db,collectionName,group?.id), (doc) => {
                console.log("Current data: <<<<<<<<<< ", doc.data());
                setUpdate(doc.data())
               });
              }
             })
    

             console.log(profile,"here profile")
    
  return (
        <Layout>
              <div className='py-2'> 
                 <h5 className='text-slate-700 font-semibold lg:text-xl text-lg'>Profile</h5>
              </div>
          

            <div className='flex w-full h-full space-x-10'>
             
                <div className='lg:w-3/5 w-full overflow-y-auto h-full no-scrollbar'>
                  <CoverSection group={profile}/>
                     {/* {group?.type==="eco"?
                         ""
                        :
                        <div className='py-6'>
                            <CreatePost group={group}/>
                        </div>
                        } */}

                    {group?.type==="eco"?
                        <div className=''>
                            <EcoFeed group={group}/>
                        </div>
                      
                      :
                      <div className='py-6'>
                       <Posts 
                         group={group}
                       />
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
