import React, { useEffect, useState ,useMemo} from 'react'
import org1 from "../assets/org1.png"
import org2 from "../assets/org2.png"
import add from "../assets/icons/add.png"
import {IoMdAdd} from "react-icons/io"
import { groupState ,updateUserState} from '../Recoil/globalstate'
import {useRecoilState,useRecoilValue} from "recoil"
import ionprofile from "../assets/ionProfile.png"
import ioncover from "../assets/ionCover.png"
import orgcover from "../assets/orgcover1.png"
import orgprofile from "../assets/orgcover.png"
import { userState } from '../Recoil/globalstate'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

export default function SidePanel() {

  const isUpdate=useRecoilValue(updateUserState)
  const [group,setGroup]=useRecoilState(groupState)
  const currentUser =useRecoilValue(userState)
  const organizations=currentUser?.organizations
  const ecosystems=currentUser?.ecosystems
  const [team,setTeam]=useState([])
  const { id} = useParams();
   console.log(id,"iddd")

   
     useEffect(()=>{
      const isGroup= organizations?.length >0 || ecosystems?.length >0
 
       isGroup&&setTeam([currentUser,...organizations,...ecosystems])
   
      
       isGroup&&setGroup([currentUser,...organizations,...ecosystems].find(group=>group?.id===id))
       
    
      },[currentUser,isUpdate])
      useEffect(()=>{
        // const isGroup= organizations?.length >0 || ecosystems?.length >0
   
        //  isGroup&&setTeam([currentUser,...organizations,...ecosystems])
     
        
         setGroup(currentUser)
      
        },[])
        const isGroup= organizations?.length >0 || ecosystems?.length >0
        currentUser?.id?.length>0&&!isGroup&&setGroup(currentUser)
      console.log(group,"side pannel")


      const currentPath = window.location.pathname;
      
    console.log(team,"team")
  console.log(currentUser,"user current lllll")
  return (
    <div className='lg:px-4 py-8 '>
      <div className='flex flex-col space-y-4 items-center'>
          {currentUser?.id?.length >0 &&
            <>
              {currentUser?.img?.length ===0?
                   <Link to={`/home/${group?.id}`}>
                   <div className='rounded-lg p-2 items-center justify-center flex border'
                      onClick={()=>setGroup(currentUser)}
                     >
                       <h5 className='font-semibold text-sm'> {currentUser?.firstName?.slice(0,1) +currentUser?.lastName?.slice(0,1)}</h5>
                    </div>
                    </Link>
                   :
                   <Link to={`/home/${group?.id}`}>
                    <div className='rounded-lg p-0.5 items-center justify-center flex border'>
                
                      <img 
                          src={currentUser?.img}
                          className="h-8 w-8 rounded-full"
                          onClick={()=>setGroup(currentUser)}
                        />
                    </div>
                    </Link>

              }
        
          </>

          }
          {team?.length >0 &&
          <>
            
                {team?.map((group)=>{
                  const isTeammate=group?.teammates?.some(e=>e?.id ===currentUser?.id)
                  console.log(group,"side nav")
                  return(
                    <>
                    {isTeammate&&
                        <Link to={`/home/${group?.id}`}>
                          <div className='rounded-lg p-0.5 items-center justify-center flex border'>
                              <img 
                                src={group?.img}
                                className="h-8 w-8 rounded-full"
                                onClick={()=>setGroup(group)}
                              />
                          </div>
                       </Link>
                    }
                    
                  </>
                  )
              })}
            </>
          }

        

             <div className='rounded-full h-10 w-10  flex justify-center items-center  ' style={{background: "linear-gradient(70.54deg, #281CF5 17.62%, #5DE4D7 94.09%)"}}>
               <Link to="/create-account">
                <img 
                    src={add}
                    />
               </Link>
               
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