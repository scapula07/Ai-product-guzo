
import React,{useEffect,useState} from 'react'
import guzo from "../../assets/guzoLogo.png"
import {Outlet } from "react-router-dom"
import { Link } from 'react-router-dom'
import { userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
export default function AccountProfiles() {
   const user=useRecoilValue(userState)
   
  return (
   

      <div className='w-full h-full' style={{background: "rgba(242, 242, 242, 0.6)"}}>
          <div className='flex  h-full w-full justify-center  items-center space-x-20'>
             
             <img 
               src={guzo}
               className="w-1/7"
             />

             <div className='w-3/5 h-full py-20 overflow-y-scroll no-scrollbar'>
                <Outlet  context={[user]}/>

             </div>

       </div>
       </div>
  )
}
