import React from 'react'
import guzo from "../../../assets/guzoLogo.png"
import { Link } from 'react-router-dom'


export default function FactorAuth() {
  return (
    <div className='w-full h-screen'>
          <div className='flex  h-full w-full justify-center  items-center space-x-10'>
             
             <img 
               src={guzo}
               className="w-1/7"
             />

       

             <div className='w-3/5 flex flex-col items-center space-y-10'>
                <div className='flex flex-col -space-y-8 h-full' style={{fontSize:"7rem"}}>
                    <h5 className='font-semibold'>Required</h5>
                    <h5 className='font-semibold'> Authentication</h5>
                </div>
                <Link to="/new/onboard/profile">
                        <button className='text-blue-700 rounded-full px-8 py-1.5'
                                    style={{background: "rgba(236, 235, 254, 1)"}}
                                >
                                Continue
                    </button>
               </Link>

           
            </div>



            </div>
     </div>
  )
}
