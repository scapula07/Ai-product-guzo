import React from 'react'
import org1 from "../assets/org1.png"
import org2 from "../assets/org2.png"
import add from "../assets/icons/add.png"
import {IoMdAdd} from "react-icons/io"
import { groupState } from '../Recoil/globalstate'
import {useRecoilState} from "recoil"
import ionprofile from "../assets/ionProfile.png"
import ioncover from "../assets/ionCover.png"
import orgcover from "../assets/orgcover1.png"
import orgprofile from "../assets/orgcover.png"

export default function SidePanel() {
  const [group,setGroup]=useRecoilState(groupState)
  return (
    <div className='lg:px-4 py-8 '>
      <div className='flex flex-col space-y-4 items-center'>
        {groups.map((group)=>{
           return(
             <div>
                <img 
                  src={group?.img}
                  className="h-10 w-10 hover:h-12 hover:w-12"
                  onClick={()=>setGroup(group)}
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
    img:org1,
    type:"eco",
    name:"Ion Houston",
    profile:ionprofile,
    cover:ioncover
   

   },
  {
    img:org2,
    type:"org",
    name:"Common Desk",
    profile:orgprofile,
    cover:orgcover
   

  }
]