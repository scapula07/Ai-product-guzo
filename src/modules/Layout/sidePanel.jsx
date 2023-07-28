import React from 'react'
import org1 from "../assets/org1.png"
import org2 from "../assets/org2.png"
import add from "../assets/icons/add.png"
import {IoMdAdd} from "react-icons/io"

export default function SidePanel() {
  return (
    <div className='px-4 py-8 '>
      <div className='flex flex-col space-y-4 items-center'>
        {groups.map((group)=>{
           return(
             <div>
                <img 
                  src={group?.img}
                  className="h-10 w-10 "
                />
             </div>
           )
        })}

             <div className='rounded-full h-10 w-10  flex justify-center items-center  ' style={{background: "linear-gradient(70.54deg, #281CF5 17.62%, #5DE4D7 94.09%)"}}>
                <img 
                  src={add}
                  />
             </div>



      </div>


    </div>
  )
}


const groups=[
  {
    img:org1
   

   },
  {
    img:org2

  }
]