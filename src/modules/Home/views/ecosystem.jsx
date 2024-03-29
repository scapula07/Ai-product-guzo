import React ,{useEffect,useState} from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import { Link } from 'react-router-dom'
import { ecosystemApi } from '../_api/ecosystem'
import { notificationApi } from '../_api/notification'
import {useRecoilValue} from "recoil"
import { groupState,userState } from '../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom'
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import { db } from '../../Firebase'
import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc } from 'firebase/firestore'
import ecoImg from "../../assets/ecoIcon.jpeg"
import SearchBar from '../components/searchbar'
import Fuse from "fuse.js"


export default function Ecosystems() {
  
    const [ecosystems,setEco] =useState([])
    const currentUser =useRecoilValue(userState)
    const group =useRecoilValue(groupState)
    const [searchQuery,setQuery]=useState("")

   

    useEffect(()=>{
        // const getEcosytems=async()=>{
        //     const ecosystems=await ecosystemApi.getAllEcosystems()
        //     console.log(ecosystems,"eccccc")
        //     setEco(ecosystems)
        //      }
        // getEcosytems()
        const q = query(collection(db, "ecosystems"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ecosystems = []
            querySnapshot.forEach((doc) => {
                  ecosystems.push({ ...doc.data(), id: doc.id })
    
            });


            setEco(ecosystems)
    

       
          });
       },[])

       
        
       const fuse =new Fuse([...ecosystems],{
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
         keys:["name","type"]
       })

      const result=fuse.search(searchQuery)

      console.log(result,"result rerrr")
      
  return (

    <div className='flex flex-col w-full space-y-6'>
          <div className='py-4'>
              <SearchBar 
                setQuery={setQuery} 
                searchQuery={searchQuery} 
              />
          </div>
         

      <>
           {result?.length ===0?

           
                <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>

                    
                    {ecosystems?.length >0 &&ecosystems?.filter((e)=>e?.id !== group?.id)?.map((eco,)=>{

                        const isPending= eco?.pending?.some(e=>e?.id ===group?.id)
                        
                        const isMember= eco?.active?.some(e=>e?.id ===group?.id) 
                        // const isMember= eco?.active?.some(e=>e?.id ===group?.id) || eco?.creator ===group?.id;

                        return(
                        
                            <EcosystemCard 
                                eco={eco}
                                isPending={isPending}
                                currentUser={currentUser}
                                group={group}
                                isMember={isMember}

                            />

                        
                        )
                        })

                         }


                </div>

                   :

                   <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>

                            {result?.length >0 &&result?.filter((e)=>e?.id !== group?.id)?.map((eco,)=>{

                            const isPending= eco?.item?.pending?.some(e=>e?.id ===group?.id)

                            const isMember= eco?.item?.active?.some(e=>e?.id ===group?.id) 
                            // const isMember= eco?.active?.some(e=>e?.id ===group?.id) || eco?.creator ===group?.id;

                            return(

                                <EcosystemCard 
                                    eco={eco?.item}
                                    isPending={isPending}
                                    currentUser={currentUser}
                                    group={group}
                                    isMember={isMember}

                                />


                            )
                            })

                            }


                   </div>

              }
         </>

         {ecosystems?.length ===0&&
            <div className='w-full flex justify-center py-10'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
            </div>
            }

      </div>
  )
}

const EcosystemCard=({eco,isPending,currentUser,isMember,group})=>{
    const [errorMsg, setErrorMsg] = useState(null)
    let navigate = useNavigate();
    const [isLoading,setLoading]=useState(false)

     const join=async(id)=>{
        setLoading(true)
        try{
          const result =await ecosystemApi.joinRequest(id,currentUser,group)
          result&&setLoading(false)
     
        //   result&&navigate(`/connections/${group?.id}/pending`)

        //  const response =await notificationApi.sendNotification(currentUser?.accessToken,currentUser?.notificationToken)
          

          }catch(e){
              console.log(e)
              setLoading(false)
              setErrorMsg(e)
          }
     }
    return(
        <div className='flex flex-col bg-white py-4 px-4'>
        <div className='flex flex-col items-center space-y-3'>
            <Link  to={`/eco-profile/${eco?.id}`}
                    state={{
                     eco,
                     account:group
                  }}
                  >
                <img 
                src={eco?.img}
                className="rounded-full w-32 h-32"
                />
           </Link>
            <h5 className=' text-center font-semibold '>{eco?.name}</h5>
             <div className="flex items-center space-x-1">
                    <img 
                    src={ecoImg}
                    className="w-2.5 h-3"
                    />
                    <h5 className='text-xs'>Ecosystem</h5>

                </div>
                </div>

        <div className='flex flex-col items-center space-y-3 py-4'>
     
            {!isPending?
      
                <>
                {isLoading?
                 
                    <ClipLoader 
                        color={"rgba(62, 51, 221, 1)"}
                        loading={isLoading}
                    />
                    :
                    <>
                       {isMember?
                           ""
                           :
                            <button className='bg-blue-600 rounded-full px-6 py-2 text-white text-xs font-semibold'
                            onClick={()=>join(eco?.id)}
                            >Join</button>
                       }
                      
                    </>
                  }
                </>
                 :
                <h5 className='rounded-full p-2 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(242, 242, 242, 1)"}}>
                         Pending...
                </h5>
                   



            }

          
          
          
        </div>
        {/* <Snackbar open={true} autoHideDuration={1000}   anchorOrigin={{ vertical:"top", horizontal:"center"}}>
            <Alert onClose={""} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
         </Snackbar> */}

    </div>

    )
}