import React from 'react'
import {BsThreeDots} from "react-icons/bs"

export default function Table({teams}) {
  console.log(teams,"teammam")
   let count=0
    return(
     
     <table class="table-auto w-full border-separate border-spacing-0.5">
     <thead className='py-2' style={{background: "linear-gradient(0deg, #DFDDFB, #DFDDFB),linear-gradient(0deg, #F2F2F2, #F2F2F2)"}}>
       <tr >
         {["Name",
          "Email",
          "Role",
          ""
     ].map((text)=>{
            return(
             <th className='py-1 text-sm '>{text}</th>
            )
         })
 
         }
 
       </tr>
     </thead>
     <tbody className='bg-white w-full'>
       {teams?.teammates?.map((team)=>{
         count++
           return(
             <tr className='py-6 text-sm font-light '>
                {team?.type?.length>0?
                   <td className='bg-white text-center text-xs w-1/4'>{team?.name}</td>
                     :
                   <td className='bg-white text-center text-xs w-1/4'>{team?.firstName?.length != undefined? team?.firstName + " " + team?.lastName :team?.display }</td>

                 }
              
               <td className='bg-white text-center w-1/4'>{team?.email }</td>
                <td className='bg-white text-center w-1/5 py-2 px-8' >
                 <h5 className='py-1.5 px-2 text-xs font-semibold rounded-full ' style={{background: "rgba(169, 163, 249, 1)"}}>Admin</h5>
                 </td>
               <td className='bg-white text-center w-1/5 font-semibold text-2xl'>...</td>
               
            </tr>
           )
          })
        }
        {teams?.invitees?.map((team)=>{
         count++
           return(
             <tr className='py-6 text-sm font-light '>
                {team?.type?.length>0?
                   <td className='bg-white text-center text-xs w-1/4'>{team?.name}</td>
                     :
                   <td className='bg-white text-center text-xs w-1/4'>{team?.name }</td>

                 }
              
               <td className='bg-white text-center w-1/4'>{team?.email }</td>
                <td className='bg-white text-center w-1/5 py-2 px-8' >
                   <h5 className='py-1.5 px-2 text-xs font-semibold rounded-full ' style={{background: "rgba(252, 229, 67, 1)"}}>Pending</h5> 
                </td>
               <td className='bg-white text-center w-1/5 font-semibold text-2xl'>...</td>
               
            </tr>
           )
          })
        }
 
      
     </tbody>
   </table>
    )
 }
 

