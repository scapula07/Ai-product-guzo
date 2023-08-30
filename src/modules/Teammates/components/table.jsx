import React from 'react'

export default function Table({teams}) {

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
       {teams?.map((team)=>{
         count++
           return(
             <tr className='py-6 text-sm font-light '>
                {team?.type?.length>0?
                   <td className='bg-white text-center text-xs w-1/4'>{team?.name}</td>
                     :
                   <td className='bg-white text-center text-xs w-1/4'>{team?.firstName + " " + team?.lastName }</td>

                 }
              
               <td className='bg-white text-center w-1/4'>{team?.email }</td>
               <td className='bg-white text-center w-1/5'>Malcolm</td>
               <td className='bg-white text-center w-1/5'>...</td>
               
            </tr>
           )
          })
        }
 
      
     </tbody>
   </table>
    )
 }
 

