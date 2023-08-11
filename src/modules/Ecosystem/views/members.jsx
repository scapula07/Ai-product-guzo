import React ,{useEffect,useState} from 'react'
import cd from "../../assets/cd.png"
import gordon from "../../assets/gordon.png"
import head from "../../assets/head.png"
import philip from "../../assets/philip.png"
import {useRecoilValue} from "recoil"
import { groupState,userState } from '../../Recoil/globalstate'
import { ecosystemApi } from '../api'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom'
export default function EcoMembers() {
    const group =useRecoilValue(groupState)
    const currentUser=useRecoilValue(userState)
    let navigate = useNavigate();

  const [isLoading,setLoading]=useState(false)

    const [members,setMembers]=useState([])
    useEffect(()=>{
        const getAllMembers=async()=>{
            console.log("mmmm")
           const members=await ecosystemApi.getAllMembers(group?.id,currentUser)
           setMembers(members)
        }
        getAllMembers()
   },[group])

   const accept=async(id,member)=>{
    setLoading(true)
   
     try{
       
        const result =ecosystemApi.acceptMember(id,member)
        setLoading(false)
        navigate("/new/ecosystems")
     }catch(e){
        console.log(e)
        setLoading(false)
     }
     
   }

   console.log(isLoading,"loading")

  return (
       <div className='flex flex-col space-y-6 w-full'>
         <h5 className='font-semibold text-sm'>Pending Members</h5>
         {members.map((member)=>{
             return(
                <div className='flex flex-col bg-white rounded-lg w-full space-y-2'>
                        <div className='flex items-center py-6 px-2 rounded-lg w-full justify-between'>
                                <div className='flex items-center space-x-4'>
                                    <img 
                                        src={member?.img}
                                        className="w-14 h-14 rounded-full"
                                    />

                                    <div className='flex flex-col'>
                                        <h5 className='text-xl font-semibold'>{member?.name}</h5>
                                        <h5 className='text-sm '>{"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "}</h5>
                                    </div>
                               </div>

                            <div className='flex items-center space-x-4 justify-end w-1/4'>
                                <h5 className='text-slate-600 font-semibold text-lg'>Ignore</h5>
                                {isLoading===true&&
                             
                                    <ClipLoader 
                                        color={"rgba(62, 51, 221, 1)"}
                                       

                                    />
                                }
                                {!isLoading&&
                                    <button 
                                        style={{background: "rgba(236, 235, 254, 1)"}}
                                        className='text-blue-700 rounded-full px-8 py-1.5'
                                        onClick={()=>accept(group?.id,member)}
                                    
                                        > Accept
                                    </button>
                                 }

                            </div>
                          <div>
                        </div>
                     </div>
                     <div className='px-8 py-5'>
                            <div className='bg-slate-200 py-2 px-4 h-20 rounded-lg'>
                                <h5 className='text-xs'>Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate consectetur adipiscing... see more. </h5>


                            </div>
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