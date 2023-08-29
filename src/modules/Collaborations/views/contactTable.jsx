import React from 'react'

export default function ContactTable() {
  return (
    <div className='flex w-full flex-col py-4 w-full overflow-x-auto'>
        <div className='flex justify-end w-full overflow-x-auto'>
            
                <button className='text-blue-700 rounded-full px-8 py-1.5'
                    style={{background: "rgba(236, 235, 254, 1)"}}
                >
                Add New Contact
                </button>
         </div>
        <div className='py-8 px-4 overflow-x-scroll ' style={{width:"200%"}}>

          <Table />
            
        </div>


    </div>
  )
}
 

const Table=()=>{
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
      {[1,2,3,4].map(()=>{
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

