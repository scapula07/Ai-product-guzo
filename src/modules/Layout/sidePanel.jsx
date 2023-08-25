import React, { useEffect } from 'react'
import org1 from "../assets/org1.png"
import org2 from "../assets/org2.png"
import add from "../assets/icons/add.png"
import {IoMdAdd} from "react-icons/io"
import { groupState } from '../Recoil/globalstate'
import {useRecoilState,useRecoilValue} from "recoil"
import ionprofile from "../assets/ionProfile.png"
import ioncover from "../assets/ionCover.png"
import orgcover from "../assets/orgcover1.png"
import orgprofile from "../assets/orgcover.png"
import { userState } from '../Recoil/globalstate'

export default function SidePanel() {
  const [group,setGroup]=useRecoilState(groupState)
  const currentUser =useRecoilValue(userState)
  const {organizations,ecosystems}=currentUser


  useEffect(()=>{
    const isGroup= organizations?.length >0 || ecosystems?.length >0
    isGroup&&setGroup([...organizations,...ecosystems][0])
     
    },[currentUser])

  return (
    <div className='lg:px-4 py-8 '>
      <div className='flex flex-col space-y-4 items-center'>
          {organizations?.length >0 &&
          <>
            
                {[...organizations].map((group)=>{
                  console.log(group,"ggg")

                  return(
                    <div className='rounded-lg p-0.5 items-center justify-center flex border'>
                      <img 
                        src={group?.img}
                        className="h-8 w-8 rounded-full"
                        onClick={()=>setGroup(group)}
                      />
                  </div>
                  )
              })}
            </>
          }
          {ecosystems?.length >0 &&
          <>
            
                {[...ecosystems].map((group)=>{
                  console.log(group,"ggg")
                  return(
                    <div className='rounded-lg p-1 items-center justify-center flex border'>
                      <img 
                        src={group?.img}
                        className="h-8 w-8  rounded-full"
                        onClick={()=>setGroup(group)}
                      />
                    </div>
                  )
              })}
            </>
          }
        

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