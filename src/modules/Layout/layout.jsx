import React ,{useState,useEffect} from 'react'
import SearchBar from './searchBar'
import {IoMdNotificationsOutline} from "react-icons/io"
import {BiMenu} from "react-icons/bi"
import { Drawer } from "@mui/material";
import SidePanel from './sidePanel';
import TabsPanel from './tabsPanel';
import {useRecoilState,useRecoilValue} from "recoil"
import { userState,groupState } from '../Recoil/globalstate'
import LogOut from './logout';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../Firebase'
import icon from "../assets/icon.png"
import text from "../assets/guzotext.png"
export default function NewLayout({children}) {
  return (
    <div className='w-full h-full  '>
          <div className='flex items-center'>
             <Header />
          </div>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}


const Header=()=>{
    const currentUser =useRecoilValue(userState)

    console.log(currentUser,"new")
     return(
        <div className='w-full flex  py-20 px-20 items-center'>
             <div className='w-1/3'>
                   <img 
                     src={icon}
                   />
             </div>
             <div className='w-1/3 flex justify-center'>
                    <img 
                     src={text}
                   />
                
             </div>
             
             <div className='w-1/3 flex justify-center'>
                  {/* {currentUser?.img?.length >0 ?
                     <Link to="/account">
                    
                        <img 
                            src={currentUser?.img}
                            className='lg:w-8 lg:h-6 w-6 h-6 rounded-full'
                           
                        />
                         </Link>
                    :
                    <h5 className='rounded-full bg-blue-600 text-white font-semibold text-sm p-2 border-2 border-white lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center'
                       
                    >
                           <Link to="/account">
                        {currentUser?.firstName?.slice(0,1) +currentUser?.lastName?.slice(0,1)}
                        </Link>

                    </h5> */}

                

                  <Link to="/account">
                    
                    <img 
                        src={currentUser?.organizations[0]?.img}
                        className='lg:w-8 lg:h-6 w-6 h-6 rounded-full'
                       
                    />
                     </Link>


                
            </div>
   
   


        </div>
     )
}