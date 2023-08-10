import React ,{useEffect,useState} from 'react'
import eco1 from  "../../assets/eco1.png"
import eco2 from  "../../assets/eco2.png"
import eco3 from  "../../assets/eco3.png"
import eco4 from  "../../assets/eco4.png"
import eco5 from  "../../assets/orgcover.png"
import { Link } from 'react-router-dom'
import { ecosystemApi } from '../_api/ecosystem'





export default function Ecosystems() {
    const [ecosystems,setEco] =useState([])

    useEffect(()=>{
        const getEcosytems=async()=>{
            const ecosystems =await ecosystemApi.getAllEcosystems()
            setEco(ecosystems,"hh")

        }
        getEcosytems()
       },[])
  return (
    <div className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full'>
        {ecosystems?.length >0 &&ecosystems?.map((eco)=>{
            console.log(eco)
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
                        <Link to="/new/connections/pending">
                          <button className='bg-blue-600 rounded-full px-6 py-2 text-white text-xs font-semibold'>Join</button>
                        </Link>
                      
                    </div>

                </div>
            )
        })

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