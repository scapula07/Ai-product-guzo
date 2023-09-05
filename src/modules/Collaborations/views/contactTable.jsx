import React from 'react'

export default function ContactTable({collabs}) {
  
  return (
    <div className='flex w-full flex-col py-4 w-full overflow-x-auto no-scrollbar'>
         
  
          <div className='px-4 overflow-x-scroll no-scrollbar' style={{width:"200%"}}>

              <Table
               collabs={collabs}
               />
            
            </div>


        </div>
  )
}
 

const Table=({collabs})=>{
  let count=0
   return(
    
    <table class="table-auto w-full border-separate border-spacing-0.5">
    <thead className='py-2' style={{background: "linear-gradient(0deg, #DFDDFB, #DFDDFB),linear-gradient(0deg, #F2F2F2, #F2F2F2)"}}>
      <tr >
        {["ID","Date Updated","First Name",
        "Last Name","Phone Number ","Email ","Address #1","Address #2",
        "City",
        "Zip code",
        "Country"
    ].map((text)=>{
           return(
            <th className='py-1 text-sm '>{text}</th>
           )
        })

        }

      </tr>
    </thead>
    <tbody className='bg-white'>
      {collabs?.map((collab)=>{

        count++
          return(
            <tr className='py-6 text-sm font-light'>
              <td className='bg-white text-center text-xs'>{count}</td>
              <td className='bg-white text-center'>Malcolm</td>
              <td className='bg-white text-center'>Malcolm</td>
              <td className='bg-white text-center'>Malcolm</td>
              <td className='bg-white text-center'>Malcolm</td> 
              <td className='bg-white text-center'>Malcolm</td>
              <td className='bg-white text-center'>Malcolm</td>
              <td className='bg-white text-center'>Malcolm</td>
              <td className='bg-white text-center' >Malcolm</td>
              <td className='bg-white text-center'>Malcolm</td>
              <td className='bg-white text-center'>Malcolm</td>
           </tr>
          )
         })
       }

     
    </tbody>
  </table>
   )
}

