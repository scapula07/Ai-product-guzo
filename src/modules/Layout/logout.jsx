import React from 'react'
import {BiSolidUserCircle} from "react-icons/bi"
import { userApi } from './_api'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function LogOut({currentUser}) {
    let navigate = useNavigate();

    const logout=async()=>{
        localStorage.clear();
        try{
            const response =await userApi.logout()
            console.log(response,"response")
           
            navigate(`/new/onboard/register/login`)

        }catch(e){
            console.log(e)
        }

    }
  return (
    <div className='flex flex-col px-2 py-4 space-y-2'>
        <div className='rounded-lg flex flex-col items-center py-4 space-y-4 ' style={{background: "rgba(242, 242, 242, 1)"}}>
            <div>
                {currentUser?.img?.length >0 ?
                                <img 
                                    src={currentUser?.img}
                                    className='lg:w-16 lg:h-16 w-6 h-6 rounded-full'
                                
                                />
                            :
                           <BiSolidUserCircle 
                             className='text-5xl font-semibold '
                           />

                    }

            </div>
            <div className='flex flex-col items-center px-2'>
                <h5 className='font-semibold text-black text-sm'>{currentUser?.firstName + " " +currentUser?.lastName  }</h5>
                <h5 className='font-light text-slate-600 text-xs'>{currentUser?.email }</h5>

            </div>
            

        </div>
        <div className='flex flex-col text-sm'>
            <Link to="/new/settings">
              <h5>Settings</h5>
            </Link>
           
            <h5 onClick={logout}>Logout</h5>

        </div>

    </div>
  )
}
