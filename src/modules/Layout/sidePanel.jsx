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
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc,where } from 'firebase/firestore'
import { db } from '../Firebase'

export default function SidePanel() {

  const isUpdate=useRecoilValue(updateUserState)
  const [group,setGroup]=useRecoilState(groupState)
  const currentUser =useRecoilValue(userState)
  const organizations=currentUser?.organizations
  const ecosystems=currentUser?.ecosystems
  const [team,setTeam]=useState([])
  const { id} = useParams();
   console.log(id,"iddd")
    console.log(currentUser,"userr current")
   useEffect(()=>{
      if(currentUser?.id?.length >0){
        const unsub = onSnapshot(doc(db, "users",currentUser?.id), (doc) => {
          console.log("Current data: ", doc.data());
          const concatenatedArray = [...doc.data()?.ecosystems, ...doc.data()?.organizations].concat(team);
        
          const uniqueMap = new Map();


        for (const obj of concatenatedArray) {
          if (obj?.id) {

            const propertyValue = obj[obj?.id];
            if (!uniqueMap.has(propertyValue)) {
              uniqueMap.set(propertyValue, obj);
            }
          } else {
          
            const stringifiedObj = JSON.stringify(obj);
            if (!uniqueMap.has(stringifiedObj)) {
              uniqueMap.set(stringifiedObj, obj);
            }
          }
        }


         const uniqueArray = Array.from(uniqueMap.values());

 

          setTeam(uniqueArray)
         });

      }

  
     },[currentUser])

   const isGroup= organizations?.length >0 || ecosystems?.length >0

     useEffect(()=>{
      const isGroup= organizations?.length >0 || ecosystems?.length >0
 
       isGroup&&setTeam([...organizations,...ecosystems])
   
      
       isGroup&&setGroup([...organizations,...ecosystems].find(group=>group?.id===id))
       
    
      },[currentUser,isUpdate])
 
    
    //  group?.id?.length ==undefined&&!isGroup&&setGroup(team[0])
    const isTeammate=team?.some((group)=>group?.teammates?.some(e=>e?.id ===currentUser?.id) )
    console.log(!isTeammate,"teammm ate")
    // if(!isGroup){
    //   currentUser?.id?.length>0&&setGroup(currentUser)
    // }else if(isTeammate ===false){
    //   currentUser?.id?.length>0&&setGroup(currentUser)

    // }

    // if(!isGroup){
      
    //   // const isTeammate=team?.some((group)=>group?.teammates?.some(e=>e?.id ===currentUser?.id) )
    //   currentUser?.id?.length>0&&setGroup(currentUser)
    // }else{
     
    //   currentUser?.id?.length>0&&!isGroup&&setGroup(currentUser)
    // }


     console.log(team,"iiiisssss")
          



      const currentPath = window.location.pathname;
      
    console.log(group,"team ppppp")
  console.log(currentUser,"user current lllll")
  return (
    <div className='lg:px-4 py-8 '>
      <div className='flex flex-col space-y-4 items-center'>
          {currentUser?.display?.length >0&&
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
                  const isTeammateGroup=group?.teammates?.some(e=>e?.id ===currentUser?.id)
                  console.log(currentUser,"iddd")
                  console.log(isTeammateGroup,"side nav")
                  return(
                    <>
                    {isTeammateGroup==true&&
                        <Link to={`/home/${group?.id}`}>
                          {/* <div className='rounded-lg p-0.5 items-center justify-center flex border'>
                              <img 
                                src={group?.img}
                                className="h-8 w-8 rounded-full"
                                onClick={()=>setGroup(group)}
                              />
                          </div> */}
                          <TeamTile 
                            group={group}
                            setGroup={setGroup}
                          />
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




const TeamTile=({group,setGroup})=>{
  const [img,setImg]=useState("")
  useEffect(()=>{
    const collectionName= group?.type=="eco"?"ecosystems":"organizations"
    const unsub = onSnapshot(doc(db,collectionName,group?.id), (doc) => {
      console.log("Current data: ", doc.data()?.img);
      setImg(doc.data()?.img)
    });
  
  
    
  },[])
     

   return(
    <div className='rounded-lg p-0.5 items-center justify-center flex border'>
        <img 
          src={img}
          className="h-8 w-8 rounded-full"
          onClick={()=>setGroup(group)}
        />
   </div>

   )
}