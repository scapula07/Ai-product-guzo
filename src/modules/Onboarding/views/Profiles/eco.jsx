import React,{useState,useRef} from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {MdLocationPin} from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { createProfile } from '../../_api/createProfile'


export default function Eco({currentUser}) {
    console.log(currentUser,"indiv")
    let navigate = useNavigate();

    const [ecoName,setName]=useState("")
    const [ecoEmail,setEmail]=useState("")
    const [phoneNum,setNum]=useState("")
    const [ecoLocation,setLocation]=useState("")
    const [tags,setTags]=useState([])




    const [file,setFile]=useState()
    const [url,setUrl]=useState("")

    const hiddenFileInput = useRef()

    const handleClick = event => {
         hiddenFileInput.current.click()
     }

      const handleChange = async(e)=> {
          const dir = e.target.files[0]
          console.log(dir,"dir")
          if (dir) {
            setUrl({
                src: URL.createObjectURL(dir)
              })
          }
         setFile(dir)
    
      }


      const create=async()=>{
        try{
            const payload={
                creator:currentUser?.id,
                eco_name:ecoName,
                eco_email:ecoEmail,
                eco_location:ecoLocation,

            }
            const result =await createProfile.createEcoProfile(payload,file,currentUser)

          }catch(e){
            console.log(e)
          }

    //    navigate(`/new/profile`)
           
        }


  return (
    <div className='w-full flex flex-col  space-y-6 h-full' style={{background: "rgba(242, 242, 242, 0.6)"}}>
    <div className='w-full flex bg-white rounded-lg  border flex-col  space-y-8 py-4' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
        <div className='flex flex-col items-center w-full space-y-10'>
            <h5 className='text-xl font-semibold'>Create your ecosystem profile...</h5>

             {url?.length ==0&&
                        <div className='rounded-full h-44 w-44 flex flex-col justify-center items-center' style={{background: "rgba(242, 242, 242, 0.6)"}}
                            onClick={handleClick}
                            >
                            <h5 className='text-sm font-light'>Upload Profile Photo*</h5> 
                            <h5 className='text-xs font-light'>(Acceptable: jpeg, png)</h5>

                            <input
                                type="file"
                                className='hidden'
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                />
                            </div>
                            }
                            { url?.src?.length > 0&&
                                <div className='rounded-full h-44 w-44'>
                                    <img
                                    src={url?.src}
                                    className='w-full h-full rounded-full'
                                    />
                                </div>
                            
                    }

        </div>


         <div className='flex flex-col w-full px-10'>  

                <label className='text-sm text-slate-600 font-semibold'>Ecosystem Space Name*</label>
                    <input 
                        placeholder='Ecosystem Space Name'
                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        name="ecoName"
                        value={ecoName}
                        onChange={(e)=>setName(e.target.value)}
                    />

                    <h5 className='font-light text-slate-500 text-sm '>This email will NOT be shared on the organization profile. This email will be used for all Guzo correspondence.</h5>

          </div>



         <div className='flex flex-col w-full px-10'>  
             <label className='text-sm text-slate-600 font-semibold'>Ecosystem Contact Email*</label>
             <div className='flex items-center space-x-4 px-4 rounded-md'
                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                    >
                    <AiOutlineMail
                        className="text-slate-500 font-semibold text-lg "
                    />
                    <input 
                        placeholder='Email'
                        className=' py-2  w-full rounded-md text-sm outline-none'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        name="ecoEmail"
                        value={ecoEmail}
                        onChange={(e)=>setEmail(e.target.value)}
                
                    />
                 </div>
                <h5 className='font-light text-slate-500 text-sm '>This email will NOT be shared on the ecosystem profile. This email will be used for all Guzo correspondence.</h5>

           </div>

          <div className='flex flex-col w-full px-10'>  

              <label className='text-sm text-slate-600 font-semibold'>Contact Phone Number*</label>
                    <div className='flex items-center space-x-4 px-4 rounded-md'
                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                    >
                    <AiOutlineMail
                        className="text-slate-500 font-semibold text-lg "
                    />
                    <input 
                        placeholder='Neighborhood, City, or Zip'
                        className=' py-2  w-full rounded-md text-sm outline-none'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        name="phoneNum"
                        value={phoneNum}
                        onChange={(e)=>setNum(e.target.value)}
                
                
                    />
                 </div>

               <h5 className='font-light text-slate-500 text-sm '>This phone number will NOT be shared on the organization profile. This phone number is for Guzo organization verification.</h5>

          </div>


          <div className='flex flex-col w-full space-y-2 px-10'>
                <label className='text-sm text-slate-700'>Ecosystem Location*</label>
                <div className='flex items-center space-x-4 px-4 rounded-md'
                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                >
                    <MdLocationPin 
                    className="text-slate-500 font-semibold text-lg "
                    />
                        <input 
                            placeholder='Neighborhood, City, or Zip'
                            className=' py-2  w-full rounded-md text-sm outline-none'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            name="ecoLocation"
                            value={ecoLocation}
                            onChange={(e)=>setLocation(e.target.value)}
                        
                        />
                </div>

                <h5 className='font-light text-slate-500 text-sm '>Where is your ecosystem headquartered?</h5>
                            

           </div>



            <div className='flex flex-col w-full px-10'>  

                <label className='text-sm text-slate-600 font-semibold'>Descriptive Tags</label>
                    <input 
                        placeholder='Add tags separated by a comma...'
                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                    />

                    <h5 className='font-light text-slate-500 text-sm '>Tags help Guzo curate relevant connections and opportunities.</h5>

           </div>
    </div>
    
    <div className='flex  items-center w-full justify-between'>
        <h5 style={{color: "rgba(37, 31, 134, 1)"}}>Back</h5>
         <button className='px-6 py-2 text-blue-600 rounded-full' style={{background: "rgba(237, 237, 237, 1)"}}
           onClick={create}
         > Continue</button>
                    
    </div>


</div>
  )
}
