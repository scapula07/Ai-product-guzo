import React from 'react'
import dm1 from "../../assets/feedorg.png"
import dm2 from "../../assets/orgcover.png"
import {BsThreeDots} from "react-icons/bs"
import { useEffect ,useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import ecoImg from "../../assets/ecoIcon.jpeg"
import org from "../../assets/orgIcon.jpeg"
import indiv from "../../assets/indivIcon.jpeg"
import SearchBar from './saarch'
import Fuse from "fuse.js"
import { userState,groupState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'

export default function Dmcontacts({conversations,setCurrentChat,currentChat, currentUser,receiverInfo,setReceiver,areContacts}) {
  const [searchQuery,setQuery]=useState("")
  const [allContacts,setContacts]=useState([])

  const fuse =allContacts?.length >0?new Fuse([...allContacts],{
      keys:["name","display"]
    }) :new Fuse([],{
      keys:["name","display"]
    }) 

  const result=fuse.search(searchQuery)

   useEffect(( )=>{
      const contacts=[]
      conversations?.length >0 && conversations?.map(conv => contacts?.push(conv?.info))
      conversations?.length >0 && setReceiver(conversations[0]?.info?.find(info => info?.id != currentUser?.id))
      conversations?.length >0 && setCurrentChat(conversations[0]);

       setContacts(contacts[0])

      console.log(contacts,"contcvcv")
    },[conversations?.length])
    
   console.log(allContacts,"dmmmm")
   console.log(conversations,"dmmmm cpnvvv")
   console.log(result,"resultttt")
   return (
    <div className='w-full flex flex-col bg-white space-y-6 overflow-y-scroll no-scrollbar h-full relative'>
         <SearchBar 
            setQuery={setQuery} 
             searchQuery={searchQuery} 
        />

        {result?.length ==0?


                <div className='w-full flex flex-col space-y-6 overflow-y-scroll bg-white no-scrollbar h-full'>

                        {conversations?.map((conv)=>{
                            
                          
                            const contact =conv?.info?.find(info => info?.id != currentUser?.id);
                            console.log(contact,"contact dmmm")
                            return(
                              <Contact 
                                  conv={conv}
                                  contact={contact}
                                  setCurrentChat={setCurrentChat}
                                  currentChat={currentChat}
                                  receiverInfo={receiverInfo}
                                  setReceiver={setReceiver}

                              />
                              
                            )
                        })

                        }

                  </div>
                  :

                <div className='w-full flex flex-col space-y-6 overflow-y-scroll no-scrollbar h-full'>

                { result?.map((conv)=>{
                    
                    
                    
                    const contact =conv?.item?.info?.find(info => info?.id != currentUser?.id);
                    console.log(contact,"contact dmmm")
                    return(
                      <Contact 
                          conv={conv?.item}
                          contact={conv?.item}
                          setCurrentChat={setCurrentChat}
                          currentChat={currentChat}
                          receiverInfo={receiverInfo}
                          setReceiver={setReceiver}

                      />
                      
                    )
                })

                }

            </div>

           }

          {conversations?.length ===0&&areContacts?.length ==0&&
            <div className='w-full flex justify-center items-start py-10 absolute top-0'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
            </div>
            }
          
          {conversations?.length ===0&&areContacts?.length >0&&
            <div className='w-full flex justify-center items-start py-10 absolute top-0'>
              <h5 className="text-sm">No contacts</h5>
            </div>
            }

    </div>
  )
}


const Contact=({contact,setCurrentChat,currentChat,receiverInfo,setReceiver,conv})=>{
  console.log(contact,"ccc")
  const currentUser=useRecoilValue(groupState)
  return(
        <div className='flex hover:bg-slate-100  space-x-4 px-4 border-b py-2 rounded-md ' 
             onClick={()=>setCurrentChat(conv) || setReceiver(contact) }
          >
           <div className='flex items-center space-x-2'>
                {conv?.unseen&&conv?.lastSender !=currentUser?.id&&
                  <span className='bg-red-500 lg:h-2 lg:w-8 h-1 w-1 rounded-full'></span>
                }
                  <img 
                    className="rounded-full h-10 w-10"
                      src={contact?.img}
                  />

          </div>
     

        <div className='flex justify-between items-center w-full'>
          {contact?.type?.length>0?
              <div className='flex flex-col'>
                <h5 className='font-semibold text-sm'>{contact?.name}</h5>
                {contact?.type=="eco"?
             <div className="flex items-center space-x-1">
             <img 
             src={ecoImg}
             className="w-2.5 h-3"
             />
             <h5 className='text-xs'>Ecosystem</h5>

            </div>
                  :
                <>
                  {contact?.type==="org"?
                      <div className="flex items-center space-x-1">
                          <img 
                          src={org}
                          className="w-2.5 h-3"
                          />
                        <h5 className='text-xs'>Organization</h5>
                        </div>
                        :
                        <div className="flex items-center space-x-1">
                          <img 
                          src={indiv}
                          className="w-2.5 h-3"
                          />
                        <h5 className='text-xs'>Individual</h5>
                        </div>

                        }
                      
                  </>
            

          
                }
               
              </div>
              :
              <div className='flex flex-col'>
                {contact?.firstName !==undefined? 
                   <h5 className='font-semibold text-sm'>{contact?.firstName + " " +contact?.lastName}</h5>
                     :
                   <h5 className='font-semibold text-sm'>{contact?.display}</h5>


                }
                
                {contact?.type=="eco"?
             <div className="flex items-center space-x-1">
             <img 
             src={ecoImg}
             className="w-2.5 h-3"
             />
             <h5 className='text-xs'>Ecosystem</h5>

         </div>
        :
       <>
        {contact?.type==="org"?
            <div className="flex items-center space-x-1">
                 <img 
                 src={org}
                 className="w-2.5 h-3"
                 />
               <h5 className='text-xs'>Organization</h5>
              </div>
              :
              <div className="flex items-center space-x-1">
                 <img 
                 src={indiv}
                 className="w-2.5 h-3"
                 />
               <h5 className='text-xs'>Individual</h5>
              </div>

               }
             
         </>
   

 
       }
            </div>

        

          }
       
           
            {/* <BsThreeDots /> */}
        </div>
    
    </div>
  )
}