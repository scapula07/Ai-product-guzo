import React ,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function Tabs({group}) {
    const [active,setActive]=useState("feeds")
  return (
    <div className='bg-white w-full rounded-lg flex items-center  justify-center   px-8 py-2'>
        {/* <div className='w-1/2 flex justify-center'
           onClick={()=>setActive("feeds")}
        >
            <Link to="">
               <h5 className={`${active==="feeds" ?'text-base font-semibold  border-blue-600 ':'text-base font-semibold'}`} >
                    {
                       group?.type?.length >0?
                         <span>{group?.name}</span>
                         :
                         <span>{group?.display}</span>
                     }
               </h5>
            </Link>
           
        </div>
        <div className='w-1/2 flex justify-center'
           onClick={()=>setActive("ecos")}
        >
            <Link to="global">
              <h5 className={`${active==="ecos" ?'text-base font-semibold  border-blue-600 ':'text-base font-semibold'}`}>Global</h5>
           </Link>
        </div> */}
              <h5 className={`${active==="ecos" ?'text-base font-semibold  border-blue-600 ':'text-base font-semibold'}`}>Global</h5>
      
     </div>
  )
}
