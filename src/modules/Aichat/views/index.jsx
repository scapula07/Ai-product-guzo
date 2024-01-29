import React,{useState} from 'react'
import NewLayout from '../../Layout/layout'
import { aiAPi } from '../api'
import { ClipLoader } from 'react-spinners'
import { useNavigate} from 'react-router-dom';


export default function AiChat() {
     const navigate = useNavigate();
       const [text,setText]=useState("")
       const [loading,setLoading]=useState(false)

       
       const getKeywords=async()=>{
            setLoading(true)
          try{
                const res=await aiAPi.keywords(text)
                console.log(res?.data,"res")
                navigate("/resources", { state:res?.data});

                setText("")
                setLoading(false)

            }catch(e){
               setLoading(false)
                console.log(e)
            }
       }
  return (
    <NewLayout>
             <div className='w-full flex justify-center'>
                  <div className='w-1/2 bg-white  rounded-lg flex flex-col py-6 px-10 space-y-10'>
                        <div className='flex w-full justify-center'>
                             <h5 className='text-2xl font-semibold'>What resources do you need to grow your business? </h5>

                        </div>
                        <div className='flex flex-col w-full px-8 space-y-4'>
                             <textarea
                                className='rounded-lg px-3 py-4 h-44'
                                style={{background: "#D9D9D9"}}
                                value={text}
                                onChange={(e)=>setText(e.target.value)}
                              />
                              <p className='text-sm font-light text-slate-500 '>Your answers will help us provide relevant resources you can communicate with and will help your community leaders connect you to the right resources</p>
                            
                        </div>
                        
                        <div className='flex w-full justify-end'>
                           {!loading?
                             <button
                                  style={{background: "rgba(236, 235, 254, 1)"}}
                                  className='text-blue-700 rounded-full px-8 text-sm py-1.5'
                                  onClick={getKeywords}
                                  > 
                                

                                
                                      Submit
                               </button>
                                 :
                                 <ClipLoader 
                                   color='blue'
                                 />
                                 }
                            
                        </div>


                  </div>

             </div>

    </NewLayout>

  )
}
