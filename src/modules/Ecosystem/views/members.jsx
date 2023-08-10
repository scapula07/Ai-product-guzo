import React from 'react'
import cd from "../../assets/cd.png"
import gordon from "../../assets/gordon.png"
import head from "../../assets/head.png"
import philip from "../../assets/philip.png"

export default function Members() {
  return (
       <div className='flex flex-col'>
         <h5 className='font-semibold text-sm'>Pending Members</h5>
         {members.map((members)=>{
             return(
                <div className='flex flex-col bg-white rounded-lg w-full'>
                     <div className='flex '>
                    </div>
                    <div>
                    </div>
                     

                </div>
             )
         })

         }

      </div>
  )
}


const members=[
    {
        img:cd,
        name:"Common Desk",
        details:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        desc:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate consectetur adipiscing... see more. "

     },
     {
        img:gordon,
        name:"Headway",
        details:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        desc:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate consectetur adipiscing... see more. "

     },
     {
        img:head,
        name:"Gordon Taylor",
        details:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        desc:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate consectetur adipiscing... see more. "

     },
     {
        img:philip,
        name:"Philip Burke",
        details:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        desc:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate consectetur adipiscing... see more. "

     }
]