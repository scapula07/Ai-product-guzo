import React,{useState} from 'react'
import {BsThreeDots} from "react-icons/bs"
import {MdDelete} from "react-icons/md"
import Modal from '../../Modal'
import {AiOutlineClose } from "react-icons/ai"
import { ClipLoader } from 'react-spinners'
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { teamApi } from '../_api/team'

export default function Table({teams,group,currentUser}) {
  console.log(teams,"teammam")
  const [trigger,setTrigger]=useState(false)





   let count=0
    return(
     <>
     <table class="table-auto w-full border-separate border-spacing-0.5">
     <thead className='py-2' style={{background: "linear-gradient(0deg, #DFDDFB, #DFDDFB),linear-gradient(0deg, #F2F2F2, #F2F2F2)"}}>
       <tr >
         {group?.creator==currentUser?.id?
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




   </>
    )
 }
 


 const AdminTableRow=({team,group,currentUser})=>{
       console.log(team,"teamm")
        const [errorMsg, setErrorMsg] = useState(null)
        const [isLoading,setLoader]=useState(false)
        const removeTeammmate= async (teammate)=>{
          try{
            setLoader(true)

            const response =await teamApi.deletTeammate(group,teammate)
            response&&setLoader(false)

          }catch(e){
            console.log(e)
            setErrorMsg(e.message)
          }
      }
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
                  <h5 className='py-1.5 px-4 text-xs font-semibold rounded-full ' style={{background: `${group?.creator==team?.id?"rgba(85, 207, 196, 1)":"rgba(169, 163, 249, 1)"}`}}>
              
                    {group?.creator==team?.id ?"Owner":"Admin"}
                </h5>
                </h5>
              </td>
              {group?.creator==currentUser?.id&&
                <td className='bg-white text-center  w-1/5 font-semibold text-2xl px-8 '>
                      {group?.creator==team?.id?
                        <span >...</span>

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
       {group?.creator==currentUser?.id&&
          <td className='bg-white text-center w-1/5 font-semibold text-2xl'>
              
               <h5 className='bg-white flex items-center justify-center  p-2 w-full'
              
                  >
                <span  className='bg-red-600  flex items-center justify-center rounded-full p-2 w-7 h-7'
                       
                >
                      <MdDelete 
                      className='text-white text-sm'
                 
                      /> 


                </span>
                

              </h5>
         </td>
       }
     
  </tr>
    )
 }