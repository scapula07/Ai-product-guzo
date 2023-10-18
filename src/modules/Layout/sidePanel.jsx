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
import { useNavigate } from 'react-router-dom'

export default function SidePanel() {

   const navigate =useNavigate()
  const isUpdate=useRecoilValue(updateUserState)
  const [group,setGroup]=useRecoilState(groupState)
  const currentUser =useRecoilValue(userState)
  const organizations=currentUser?.organizations
  const ecosystems=currentUser?.ecosystems
  const individual=currentUser?.individual
  const [team,setTeam]=useState([])
  const { id} = useParams();
   console.log(id,"iddd")
    console.log(currentUser,"userr current")

    useEffect(()=>{
      if(currentUser?.id?.length >0){
       
        const unsub = onSnapshot(doc(db, "users",currentUser?.id), (doc) => {
          setTeam([])
          console.log("Current data: ", doc.data());
          // const group= [ ...doc.data()?.organizations,...doc.data()?.ecosystems]
          // const group= [doc.data()?.individual,...doc.data()?.organizations,...doc.data()?.ecosystems]
          // setTeam(group)
          if(doc.data()?.individual?.id?.length >0){
            console.log("top")
             const group= [doc.data()?.individual,...doc.data()?.organizations,...doc.data()?.ecosystems]
            setTeam(group)
           
    
           }else{
            console.log("bottom")
            const group= [...doc.data()?.organizations,...doc.data()?.ecosystems]
            setTeam(group)
           
    
    
           }

         
         });

      }

  
     },[currentUser])

     

   const isGroup= organizations?.length >0 || ecosystems?.length >0 || individual?.id?.length >0
   console.log(isGroup,"isGroupp new")

     useEffect(()=>{
      const isGroup= organizations?.length >0 || ecosystems?.length >0 || individual?.id?.length >0
 
      //  isGroup&&setTeam([individual,...organizations,...ecosystems])
       if(individual?.id?.length >0){
        console.log("top")
        isGroup&&setTeam([individual,...organizations,...ecosystems])
        isGroup&&setGroup([individual,...organizations,...ecosystems].find(group=>group?.id===id))
       

       }else{
        console.log("bottom")
        isGroup&&setTeam([...organizations,...ecosystems])
        isGroup&&setGroup([...organizations,...ecosystems].find(group=>group?.id===id))
       


       }
    
       
      // if(currentUser?.display?.length != undefined && isGroup==true){
      //   console.log(currentUser?.id,"if block 1111")
      //   isGroup&&setGroup([currentUser,...organizations,...ecosystems].find(group=>group?.id===id))
      // }else if(currentUser?.display?.length != undefined && isGroup==false){
      //    console.log(currentUser?.id,"if block 222")
      //    setGroup([currentUser].find(group=>group?.id===id))
      // }else{
      //   console.log(currentUser?.id,"if block 33")
      //   isGroup&&setGroup([...organizations,...ecosystems].find(group=>group?.id===id))
      // }
    
      },[currentUser,isUpdate])
 


       


      const currentPath = window.location.pathname;
      
    console.log(team,"team ppppp")
  console.log(currentUser,"user current lllll")
  return (
    <div className='lg:px-4 py-8  h-full overflow-y-scroll no-scrollbar'>
      <div className='flex flex-col space-y-4 items-center overflow-y-scroll no-scrollbar'>
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
                  const isTeammateGroup=group?.teammates?.some(e=>e?.id ===currentUser?.id) || group?.display?.length > 0
                  console.log(currentUser,"iddd")
                  console.log(isTeammateGroup,"side nav")
                  return(
                  //   <>
                  //   {isTeammateGroup==true&&
                  //       <Link to={`/home/${group?.id}`}>
                  //         {/* <div className='rounded-lg p-0.5 items-center justify-center flex border'>
                  //             <img 
                  //               src={group?.img}
                  //               className="h-8 w-8 rounded-full"
                  //               onClick={()=>setGroup(group)}
                  //             />
                  //         </div> */}
                  //         <TeamTile 
                  //           group={group}
                  //           setGroup={setGroup}
                  //         />
                  //      </Link>
                  //   }

                    
                  // </>
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
 
   
       
      let collectionName="individuals"

      if(group?.type?.length >0){
        collectionName= group?.type=="eco"?"ecosystems":"organizations"

      }
      console.log(group?.id,collectionName,"iddddddddddddddd")
      const unsub = onSnapshot(doc(db,collectionName,group?.id), (doc) => {
        console.log("Current data: ",doc.data(), doc.data()?.img)    
        setImg(doc.data()?.img)
        });

     
  
  
    
  },[])
     
    console.log(img,"imgggggggg")
   return(
    <div className='rounded-lg p-0.5 items-center justify-center flex border'>
        <img 
          src={img}
          className="h-8 w-8 rounded-full"
          onClick={()=>setGroup({...group,img:img})}
        />
   </div>

   )
}