import React ,{useState,useRef} from 'react'
import "./edit.css"
import {AiOutlineClose } from "react-icons/ai"
import guzo from "../assets/guzoLogo.png"
import { useRecoilValue } from 'recoil'
import { groupState } from '../Recoil/globalstate'
import { profileApi } from './api'

export default function EditProfile() {
     
    const group =useRecoilValue(groupState)
    const [trigger,setTrigger]=useState(false)
    const [url,setUrl]=useState("")
    const [profile,setUpdate]=useState(group)
     console.log(profile,"profileeee")
    const hiddenFileInput = useRef()

    const handleClick = event => {
            hiddenFileInput.current.click()
        }

        const handleCoverChange = async(e)=> {
            const dir = e.target.files[0]
            console.log(dir,"dir")
            if (dir) {
            setUpdate({
                ...profile,
            cover: URL.createObjectURL(dir)
                })
            }
       
    
        }
        const handlePhotoChange = async(e)=> {
            const dir = e.target.files[0]
            console.log(dir,"dir")
            if (dir) {
            setUrl({
                img: URL.createObjectURL(dir)
                })
            }
       
    
        }

    const editApi=async()=>{
         try{
            const response =await profileApi.edit()
          }catch(e){
            console.log(e)
          }
      }
  
  return (
      <>
        <div className='w-full flex justify-end'>
            <button 
                className=' border rounded-full py-1 px-8 text-sm font-semibold' 
                style={{borderColor: "rgba(40, 28, 245, 1)"}}
                onClick={()=>setTrigger(true)}
            >
                Edit profile
                </button>


        </div>
    

        <Modal trigger={trigger}  cname="w-full py-2 h-full  px-4 rounded-lg overflow-y-scroll " >
               <div className='w-full flex justify-end px-6 py-2'>
                    <AiOutlineClose 
                    onClick={()=>setTrigger(false)}
                    className="text-xl"
                 />

              </div>

              <div className='h-full'>
                    <div className='w-full h-full'>
                        <div className='flex  h-full w-full justify-center  items-center space-x-20'>
                            
                            <img 
                            src={guzo}
                            className="w-1/7"
                            />

                            <div className='w-3/5 h-full py-6 px-6 overflow-y-scroll no-scrollbar bg-white'>

                                <div className='flex flex-col w-full'>
                                     <h5 className='text-xl font-semibold'>Edit  profile...</h5>

                                     <div className='flex flex-col items-center w-full py-8 space-y-14'>
                                       { [
                                         {
                                            name:"Profile photo",
                                            change:handlePhotoChange

                                          },
                                          {
                                            name:"Cover photo",
                                            change:handleCoverChange

                                          }

                                        ].map((upload)=>{
                                             return(
                                                <div className='flex flex-col w-full space-y-3'>
                                                     <h5 className='text-sm font-semibold w-full '>{upload?.name}</h5>

                                                     <div className='flex flex-col items-center w-full space-y-4'>

                                                        <div className='rounded-full h-56 w-56 flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}
                                                         >
                                                            <h5 className='text-sm font-light'>No {upload?.name} *</h5> 
                                                            <input 
                                                               type="file"
                                                               className='hidden'
                                                               ref={hiddenFileInput}
                                                               onChange={upload?.change}
                                                            />

                                                        </div>

                                                        <div className='flex items-center space-x-6'>
                                                             <button
                                                                style={{background: "rgba(236, 235, 254, 1)"}}
                                                                className='text-blue-700 rounded-full px-8 py-1.5'
                                                                onClick={handleClick}
                                                                
                                                               
                                                                >
                                                                Edit
                                                             </button>
                                                             <button
                                                               className='text-white bg-black rounded-full px-8 py-1.5'
                                                               >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </div>


                                                </div>
                                             )
                                        })
                                      }

                                     </div>

                                     <Forms />


                                </div>




                            </div>

                        </div>
                          

                     </div>







              </div>


       </Modal>

      </>
    )
}




const Forms=()=>{
    return(
        <div children="py-6">
            {[1,2].map(()=>{
                 return(
              <div className='flex flex-col w-full '>  

                       <label className='text-sm text-slate-600 font-semibold'>Ecosystem Space Name*</label>
                        <input 
                            placeholder='Ecosystem Space Name'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            // name="ecoName"
                            // value={ecoName}
                            // onChange={(e)=>setName(e.target.value)}
                        />
    
                        <h5 className='font-light text-slate-500 text-sm '>This email will NOT be shared on the organization profile. This email will be used for all Guzo correspondence.</h5>
    
                 </div>
                 )
              })

            }
        
        </div>
    )
}

function Modal({children ,cname,trigger,onClose}) {
    return (
      <div>
            { trigger?
              <div className="edit-overlay-style">
                  <div className={`modal-upload ${cname}`}>
                     {children}
                  </div> 
                  
              </div>
           : <div></div>
              
              }
  
      </div>
    )
  }