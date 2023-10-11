import React ,{useState} from 'react'
import Layout from '../../Layout'
import { useRecoilValue,useRecoilState } from 'recoil'
import { groupState ,updateUserState,userState} from '../../Recoil/globalstate'
import { notificationApi } from '../api'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { db } from '../../Firebase'
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc ,deleteDoc, where,or} from 'firebase/firestore'
import { Outlet } from 'react-router-dom'
import Tabs from '../components/tabs'

export default function Notifications() {
    const group =useRecoilValue(groupState)
  return (
    <Layout>
           <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold lg:text-xl text-lg'>Notifications</h5>
           
           </div>
     
        <div className='w-full overflow-y-auto h-full no-scrollbar py-10'>
                 <Tabs 
                  group={group}
                 />
                

         
             <div className=''>
                <Outlet />
            
             </div>
      </div>
                
                

            

    </Layout>
   
  )
}
