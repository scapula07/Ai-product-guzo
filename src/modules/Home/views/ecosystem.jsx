import React ,{useEffect,useState} from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import { Link } from 'react-router-dom'
import { ecosystemApi } from '../_api/ecosystem'
import {useRecoilValue} from "recoil"
import { groupState,userState } from '../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom'


export default function Ecosystems() {
    let navigate = useNavigate();
    const [ecosystems,setEco] =useState([])
    const currentUser =useRecoilValue(userState)
    const [isLoading,setLoading]=useState(false)
   

    useEffect(()=>{
        const getEcosytems=async()=>{
            const ecosystems=await ecosystemApi.getAllEcosystems()
            setEco(ecosystems)
             }
        getEcosytems()
       },[])
    //    console.log(ecosystems)

       const join=async(id)=>{
          setLoading(true)
          try{
            const result =await ecosystemApi.joinRequest(id,currentUser)
            setLoading(false)
            navigate("/new/connections/pending")
            

            }catch(e){
                console.log(e)
                setLoading(false)
            }
       }
  return (
    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
        {ecosystems?.length >0 &&ecosystems?.map((eco)=>{
            const result= eco?.pending?.find(e=>e?.user ===currentUser?.id)
            return(
                <div className='flex flex-col bg-white py-4 px-4'>
                    <div className='flex flex-col items-center space-y-3'>
                        <img 
                          src={eco?.img}
                          className="rounded-full w-32 h-32"
                        />
                        <h5 className=' text-center font-semibold '>{eco?.name}</h5>
                        <h5 className='text-sm font-semibold text-slate-600'>Ecosystem</h5>
                    </div>

                    <div className='flex flex-col items-center space-y-3 py-4'>
                        <p className=' text-center font-light text-sm'>
                        Worem ipsum dolor sit amet, consectetur adi...
                        </p>
                        {/* <Link to="/new/connections/pending">
                          <button className='bg-blue-600 rounded-full px-6 py-2 text-white text-xs font-semibold'
                           onClick={()=>join(eco?.id)}
                          >Join</button>
                        </Link> */}
                        {result===undefined?
                            <>
                            {isLoading?
                             
                                <ClipLoader 
                                    color={"rgba(62, 51, 221, 1)"}
                                    loading={isLoading}
                                />
                                :
                                <button className='bg-blue-600 rounded-full px-6 py-2 text-white text-xs font-semibold'
                                onClick={()=>join(eco?.id)}
                                >Join</button>
                            }
                            </>
                            :
                            <h5 className='rounded-full p-2 items-center justify-center text-blue-600 text-xs font-semibold' style={{background: "rgba(242, 242, 242, 1)"}}>
                               Pending...
                             </h5>


                        }

                      
                      
                      
                    </div>

                </div>
            )
        })

        }
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



// const ecosystems=[
//   {
//     name:"Common Desk",
//     img:eco1

//    },
//    {
//     name:"Fifth Ward CRC",
//     img:eco2

//    },
//    {
//     name:"Headway Idea Labs",
//     img:eco3

//    },
//    {
//     name:"Alvin-Manvel Area Chamber of Commerce",
//     img:eco5

//    }
// ]