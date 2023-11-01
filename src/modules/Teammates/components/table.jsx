import React,{useState} from 'react'
import {BsThreeDots} from "react-icons/bs"
import {MdDelete} from "react-icons/md"
import Modal from '../../Modal'
import {AiOutlineClose } from "react-icons/ai"
import { ClipLoader,BeatLoader } from 'react-spinners'
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { teamApi } from '../_api/team'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function Table({teams,group,currentUser}) {
  console.log(teams,"teammam")
  const [trigger,setTrigger]=useState(false)





   let count=0
    return(
     <>
     <table class="table-auto w-full border-separate border-spacing-0.5">
     <thead className='py-2' style={{background: "linear-gradient(0deg, #DFDDFB, #DFDDFB),linear-gradient(0deg, #F2F2F2, #F2F2F2)"}}>
       <tr >
         {group?.owners?.includes(currentUser?.id)?
            ["Name",
             "Email",
             "Role",
                ""
              ].map((text)=>{
                return(
                 <th className='py-1 text-sm '>{text}</th>
               )
             })
             :
             [ "Name",
               "Email",
              "Role",

             
              ].map((text)=>{
                return(
                 <th className='py-1 text-sm '>{text}</th>
               )
             })
             
 
         }
 
       </tr>
     </thead>
     <tbody className='bg-white w-full'>
          {teams?.teammates?.map((team)=>{
               count++
             return(
                    <AdminTableRow
                      team={team}
                      currentUser={currentUser}
                      group={group}
                      setTrigger={setTrigger}
                     />
                 )
                })
              }
         { teams?.invitees?.map((team)=>{
          count++
           return(
            < PendingTableRow 
                  team={team}
                  currentUser={currentUser}
                  group={group}
             />
           )
          })
        }
 
     </tbody>
   </table>


       <Modal trigger={trigger}  cname="w-1/4 py-2   px-4 rounded-lg ">
             <div className='w-full flex justify-end px-6 py-2'>
                <AiOutlineClose 
                   onClick={()=>setTrigger(false)}
                />
              </div>

                <div className='flex flex-col space-y-4 py-4 px-4 w-full items-center'>


                       <div className='flex juster-center text-center font-semibold text-sm w-full'>
                           You need atleast one owner before deleting or changing role.Please pick an owner!!

                       </div>
                 
                       <button className='text-blue-700 rounded-full px-4 py-1 text-sm'
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             onClick={()=>setTrigger(false)}
                         
                            >
                             Cancel
                
                        </button>
                        

                  </div>

          
         
         </Modal>


   </>


    )
 }
 


 const AdminTableRow=({team,group,currentUser,setTrigger})=>{
       


        const [errorMsg, setErrorMsg] = useState(null)
        const [isLoading,setLoader]=useState(false)
        const [changing,setChange]=useState(false)
        const [isDeleting,setDelete]=useState(false)
        const [role,setRole]=useState("")
        const [role2,setRole2]=useState("")
        const navigate =useNavigate()

        const removeTeammmate= async (teammate)=>{
          console.log(teammate,"teammatedhheh")
          try{

            setLoader(true)

            const response =await teamApi.deletTeammate(group,teammate)
            response&&setLoader(false)

            }catch(e){
               console.log(e)
               setLoader(false)


               setErrorMsg(e.message)
              }
          }
          
          const removeOwner= async (teammate)=>{
              console.log(teammate,"teammatedhheh")
              if(group?.owners?.length ==1){
         
                  setTrigger(true)
             
                   return 
              }
              try{
  
              setDelete(true)
  
              const response =await teamApi.deletTeammate(group,teammate)
              response&&setDelete(false)

                if(currentUser?.id ===teammate?.id){
                   console.log("Currrent")
                  
                  response&&localStorage.clear();
                  response&&navigate("/register/login")
                }
  
                }catch(e){
                 console.log(e)
                 setDelete(false)
                 setErrorMsg(e.message)
                }
            }

           const changeRole= async (teammate,e)=>{
                console.log(e.target.value,teammate,"teammatedhheh")
                 if(group?.owners?.length ===1&&e.target.value==="admin"){
                     setRole2("Owner")
                     setRole("Admin")
                     setTrigger(true)
                     return
                   }

              if(group?.owners?.includes(teammate)&&e.target.value==="owner"){
                    setRole("Owner")
                    setRole2("Admin")
               
                    return
                    }
                try{
           
                  setChange(true)
                 
                  console.log("out here")
      
                 const response =await teamApi.changeRole(group,teammate,e.target.value)
                  response&&setChange(false)
      
                 }catch(e){
                  console.log(e)
                  setChange(false)
                  setErrorMsg(e.message)
                }
           }


           useEffect(()=>{
            group?.id?.length >0&&group?.owners?.includes(team?.id)?setRole("Owner") :setRole("Admin")
            group?.id?.length >0&&group?.owners?.includes(team?.id)?setRole2("Admin") :setRole2("Owner")

           },[group])


           console.log(role,"role ")
    return(
              <tr className='py-2 text-sm font-light '>
              {team?.type?.length>0?
                <td className='bg-white text-center text-xs w-1/4 font-semibold' >{team?.name}</td>
                  :
                <td className='bg-white text-center text-xs w-1/4 font-semibold'>{team?.firstName?.length != undefined? team?.firstName + " " + team?.lastName :team?.display }</td>

              }
            
            <td className='bg-white text-center w-1/4 font-semibold'>{team?.email }</td>
              <td className='bg-white text-center w-1/5 py-2 px-8' >
                <h5 className='bg-white flex items-center justify-center  p-2 w-full'
                  >
                    <h5 className='py-1.5 px-4 text-xs font-semibold rounded-full ' style={{background: `${group?.owners?.includes(team?.id)?"rgba(85, 207, 196, 1)":"rgba(169, 163, 249, 1)"}`}}>

              
                          {group?.owners?.includes(currentUser?.id) ?
                               <>
                                   {changing? 
                                     <BeatLoader 
                                         color={"white"}
                                         loading={true}
                                         size={7}
                                      />
                                      :


                                 
                                    <select className='border-0 outline-none'
                                        style={{background: `${group?.owners?.includes(team?.id) ?"rgba(85, 207, 196, 1)":"rgba(169, 163, 249, 1)"}`}}
                                        onChange={(e)=>changeRole(team?.id,e)}

                                    >
                                      <option value={group?.owners?.includes(team?.id)?"owner":"admin"}> 
                                          {role}
                                         {/* {group?.owners?.includes(team?.id)  ?
                                          "Owner"
                                            :
                                          "Admin"
                                          } */}

                                      </option>
                                        <option value={group?.owners?.includes(team?.id)?"admin":"owner"}> 
                                          {role2}
                                             {/* {group?.owners?.includes(team?.id)  ?
                                                "Admin"
                                                 :
                                                "Owner"
                                                } */}

                                        </option>
                                      </select>
                                       }
                                    </>
                                     :

                                    <>
                                     {group?.owners?.includes(team?.id) ?
                                     "Owner"
                                        :
                                     "Admin"
                                    }

                                    </>
                            
                                
                                }
                    </h5>
                </h5>
              </td>
              {group?.owners?.includes(currentUser?.id)&&
                <td className='bg-white text-center  w-1/5 font-semibold text-2xl px-8 '>
                      {group?.owners?.includes(team?.id) ?
                           <h5 className='bg-white flex items-center justify-center  p-2 w-full'
  

                                >
                                  {isDeleting?
                      
                                      <ClipLoader 
                                          color={"rgba(62, 51, 221, 1)"}
                                          loading={isDeleting}
                                      />
                                      :
                                      <span  className='bg-red-600  flex items-center justify-center rounded-full p-2 w-7 h-7'
                                        onClick={()=>removeOwner(team)}
                                        >
    
                                      <MdDelete 
                                      className='text-white text-sm'
                                  
                                    
                                      /> 
    
    
                                </span>
                                }
                              
    
                            </h5>

                            :
                          <h5 className='bg-white flex items-center justify-center  p-2 w-full'
                      
                  
                                 >
                              {isLoading?
                  
                                  <ClipLoader 
                                      color={"rgba(62, 51, 221, 1)"}
                                      loading={isLoading}
                                  />
                                  :
                                <span  className='bg-red-600  flex items-center justify-center rounded-full p-2 w-7 h-7'
                                  onClick={()=>removeTeammmate(team)}
                                  >

                                  <MdDelete 
                                  className='text-white text-sm'
                              
                                
                                  /> 


                            </span>
                            }
                          

                        </h5>
                  }
                </td>
              }
            
          </tr>

    )
 }





 const PendingTableRow=({team,group,currentUser})=>{
        const [errorMsg, setErrorMsg] = useState(null)
        const [isLoading,setLoader]=useState(false)
        const removeInvitee= async (teammate)=>{
          try{
            setLoader(true)

            const response =await teamApi.removePendingTeammate(group,teammate)
            response&&setLoader(false)

          }catch(e){
            console.log(e)
            setErrorMsg(e.message)
          }
      }
    return(
      <tr className='py-6 text-sm font-light '>
      {team?.type?.length>0?
         <td className='bg-white text-center text-xs font-semibold w-1/4'>{team?.name}</td>
           :
         <td className='bg-white text-center text-xs font-semibold w-1/4'>{team?.name }</td>

       }
    
     <td className='bg-white text-center w-1/4 font-semibold'>{team?.email }</td>
      <td className='bg-white text-center w-1/5 py-2 px-8' >
        <h5 className='bg-white flex items-center justify-center  p-2 w-full'
          >
         <h5 className='py-1.5 px-4 text-xs font-semibold rounded-full ' style={{background: "rgba(252, 229, 67, 1)"}}>Pending</h5> 
         </h5>
      </td>
       {group?.owners?.includes(currentUser?.id)&&
          <td className='bg-white text-center w-1/5 font-semibold text-2xl'>
              
               <h5 className='bg-white flex items-center justify-center  p-2 w-full'
              
                  >
                 {isLoading?
                  
                  <ClipLoader 
                      color={"rgba(62, 51, 221, 1)"}
                      loading={isLoading}
                  />
                  :
                <span  className='bg-red-600  flex items-center justify-center rounded-full p-2 w-7 h-7'
                  onClick={()=>removeInvitee(team)}
                  >

                  <MdDelete 
                  className='text-white text-sm'
              
                
                  /> 


                 </span>
              }


              </h5>
         </td>
       }
     
  </tr>
    )
 }