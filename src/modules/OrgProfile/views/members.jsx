import React ,{useEffect,useState} from 'react'
import { feedApi } from '../_api'
import { FiMessageSquare } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { messageApi } from '../_api/message'
import { useNavigate } from 'react-router-dom'
import eco from "../../assets/img3.png"
import org from "../../assets/img2.png"
import indiv from "../../assets/indiv.png"
import {MdArrowDropDown } from "react-icons/md"
import { db } from '../../Firebase'
import { doc, onSnapshot } from "firebase/firestore"
import SearchBar from '../components/searchbar'
import Fuse from "fuse.js"

export default function Members({group}) {
   const [members,setMembers]=useState([])
   const [areMembers,setAre]=useState("")
   const [searchQuery,setQuery]=useState("")


   useEffect(()=>{
    if(group?.id?.length >0){
        const ref =doc(db,"ecosystems",group?.id)
        const unsub = onSnapshot(ref, (doc) => {
          doc?.data()?.active?.length ===0&&setAre("No Members")
          doc?.data()?.active?.length  >0 &&setAre("")
        setMembers(doc?.data()?.active)
        });


     }
 },[group])

  const fuse =new Fuse([...members],{
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 2,
    location: 0,
    threshold: 0.2,
    distance: 100,
    useExtendedSearch: true,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
    keys:["name","display","firstName","lastName"]
  })

  const result=fuse.search(searchQuery)

  console.log(result,"members")

  return (
   <div className="w-full flex flex-col space-y-6">
          <SearchBar 
            setQuery={setQuery} 
            searchQuery={searchQuery} 
          />
       {result?.length ===0?
                      <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                      {members.map((member)=>{
                          return(
                            <ActiveMember 
                              member={member}
                              group={group}
                            />
                          )
                        })
          
                      }
                  
                </div>

                :
          <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
                {result.map((member)=>{
                    return(
                      <ActiveMember 
                        member={member?.item}
                        group={group}
                      />
                    )
                  })
    
                }
            
          </div>
       }

      <div className="w-full flex justify-center">
           
           {areMembers?.length===0&&members?.length ===0&&
             <div className='w-full flex justify-center py-10'>
                <ClipLoader 
                     color={"rgba(62, 51, 221, 1)"}
                     loading={true}
                 />
             </div>
             }
 
             {areMembers?.length >0&&
               <div className='w-full flex justify-center py-10'>
                   <h5 className="text-lg font-semibold">No members</h5>
               </div>
 
                   }
            </div>
      </div>
  )
}






function ActiveMember({member,group}) {
  console.log(group,"member")
  let navigate = useNavigate();
  const [isLoading,setLoading]=useState(false)
  const [isRemoving,setRemove]=useState(false)
  const [trigger,setTrigger]=useState(false)
  const [errorMsg, setErrorMsg] = useState(null)



  const removeMember=async()=>{
       setRemove(true)
       setErrorMsg(null)
      try{
          const response =await feedApi.removeMember(group,member)
          response&&setRemove(false)
          response&&setTrigger(false)
        }catch(e){
          console.log(e)
          setErrorMsg(e.message)
          
        }
  }


   const startConversation=async()=>{
      setLoading(true)
      try{
          const response=await messageApi.startConversation(member,group)
          console.log(response,"msg res")
          setLoading(false)
          response && navigate(`/messages/${group?.id}`)
          setLoading(false)
          

        }catch(e){
          console.log(e)
        }

      }
  return (

    <div className='flex flex-col bg-white py-4 px-4 rounded-lg'>
        {member?.type?.length >0?
            <div className='flex flex-col items-center space-y-3'>
                <img 
                    src={member?.img}
                    className="rounded-full w-32 h-32"
                />
                <h5 className=' text-center font-semibold '>{member?.name}</h5>
        
            </div>
           :
            <>
             <div className='flex flex-col items-center space-y-3'>
                {member?.img?.length >0?
                   <img 
                   src={member?.img}
                   className="rounded-full w-32 h-32"
                   />

                   :
                   <div className='rounded-full  w-32 h-32 items-center justify-center flex border'
                      >
                    <h5 className='font-semibold text-4xl'> {member?.firstName?.slice(0,1) + member?.lastName?.slice(0,1)}</h5>
                </div>

                 

                }
             
               {member?.firstName !=undefined?
                 <h5 className=' text-center font-semibold '>{member?.firstName + " " + member?.lastName}</h5>
                 :
                 <h5 className=' text-center font-semibold '>{member?.display}</h5>

               }
                        <h5 className='text-sm font-semibold text-slate-600'>
                      {member?.type=="eco"?
                                  <div className="flex items-center space-x-1">
                                  <img 
                                  src={eco}
                                  className="w-3 h-3"
                                  />
                                  <h5 className='text-xs'>Ecosystem</h5>

                              </div>
                            :
                            <>
                        {member?.type==="org"?
                           <div className="flex items-center space-x-1">
                                <img 
                                src={org}
                                className="w-3 h-3"
                                />
                              <h5 className='text-xs'>Organization</h5>
                             </div>
                             :
                             <div className="flex items-center space-x-1">
                                <img 
                                src={indiv}
                                className="w-3 h-3"
                                />
                              <h5 className='text-xs'>Individual</h5>
                             </div>

                              }
                            
                        </>
                  

                
                      }
                </h5>
   
             </div>
             
            </>

           

        }
        

        <div className='flex flex-col items-center space-y-3 py-4'>
      

            <div className='flex items-center space-x-3 py-2'> 
           
                {isLoading?
                      
                      <ClipLoader 
                          color={"rgba(62, 51, 221, 1)"}
                          loading={isLoading}
                      />
                      :
                     <h5 className='rounded-full p-2 items-center justify-center' style={{background: "rgba(236, 235, 254, 1)"}}>

                  
                      <FiMessageSquare 
                            className='text-blue-600 text-2xl '
                            onClick={startConversation}
                        />
                    
                  
                      </h5>
                  }
                    
                
                    <h5 className='rounded-full p-2 items-center justify-center relative ' style={{background: ` ${trigger?"white" :"rgba(236, 235, 254, 1)"}`}}>
                        
                        {!trigger&&
                        <BsThreeDots 
                            className='text-blue-600 text-2xl  '
                            onClick={()=>setTrigger(true)}
                        />
                        }
                        {trigger&&
                            <div className='absolute top-0 -mt-1'>
                              <div className='bg-rose-100 h-12 w-32 rounded-b-2xl rounded-tr-2xl px-4 py-2 flex items-center justify-between'>
                                  {isRemoving?
                            
                                      <ClipLoader 
                                          color={"rgba(62, 51, 221, 1)"}
                                          loading={true}
                                      />
                                      :
                                      <h5 className='text-rose-600 font-semibold '
                                        onClick={removeMember}
                                      >Remove</h5>
                                  }
                                  <MdArrowDropDown 
                                    className='text-3xl font-semibold text-slate-700'
                                    onClick={()=>setTrigger(false)}
                                  />

                              </div>


                            </div>

                        }

                    </h5>
            </div>
        </div>

    </div>
       
  )
}
