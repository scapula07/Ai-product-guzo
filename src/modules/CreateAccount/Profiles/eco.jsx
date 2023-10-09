import React,{useState,useRef,useEffect} from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {MdLocationPin} from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { createProfile } from '../_api/createProfile'
import ClipLoader from "react-spinners/ClipLoader";
import { useOutletContext } from 'react-router-dom'
import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import ReactSelect from "react-select";
import axios from "axios"
import { BsFlag } from 'react-icons/bs'
import { formatPhoneNumber } from '../../Utils/formatPhoneNumber'
import { countryCode } from '../../Utils/countrydialingcodes';


export default function EcoAccount({currentUser}) {
    console.log(currentUser,"indiv")
    let navigate = useNavigate();

    const [user]= useOutletContext();

    console.log(user,"user")

    const [ecoName,setName]=useState("")
    const [ecoEmail,setEmail]=useState("")
    const [phoneNum,setNum]=useState("")
    const [ecoLocation,setLocation]=useState("")
    const [tags,setTags]=useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading,setLoader]=useState(false)


    const [file,setFile]=useState()
    const [url,setUrl]=useState("")

    const hiddenFileInput = useRef()

    const [country, setSelectedCountry] = useState("");
    const [city, setSelectedCity] = useState();
    const [countries, setCountries] = useState([]);


    useEffect(() => {
        getCountries();
      }, []);
    
      async function getCountries() {
        await axios
          .get("https://countriesnow.space/api/v0.1/countries/")
          .then((response) => {
            setCountries(response?.data?.data);
          });
      }
     
      const style = {
        control: (base) => ({
          ...base,
          border: "0px solid rgba(242,242,242,0.6)",
          width: "100%",
          boxShadow: "none",
          backgroundColor: "rgba(242,242,242,0.6)",
          fontSize: "14px",
          "@media (min-width:600px)": {
            width: "100%",
          },
          "@media (min-width:1200px)": {
            width: "100%",
          },
        }),
      };

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
        setLoader(true)
        setErrorMsg(null)
         
        if (ecoName?.length < 3) {
            setErrorMsg( 'Ecosystem name is required ');
            setLoader(false);
            return;
          }
      
          if (ecoEmail?.length < 3) {
            setErrorMsg( 'Email is required' );
            setLoader(false);
            return;
          }
      
          if (phoneNum?.length < 3) {
            setErrorMsg(' Contact Phone number is required');
            setLoader(false);
            return;
          }
  
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(ecoEmail)){
              setErrorMsg( "E-mail is invalid" );
              setLoader(false);
          }
      
          if (country?.length < 3) {
            setErrorMsg( "Location is required" );
            setLoader(false);
            return;
          }
          
          if (url?.length ===0) {
              setErrorMsg( 'Image is required');
              setLoader(false);
              return;
            }
  
        try{
            const payload={
                creator:user?.id,
                name:ecoName,
                email:ecoEmail,
                location:country?.label?.length != undefined ?country?.label :"" ,
                memberships:[],
                invitees:[],
                connections:[]


            }
            // const result =await createProfile.createEcoProfile(payload,file,user)
            // localStorage.clear();
            // result?.id?.length>0&&localStorage.setItem('user',JSON.stringify(result));
            // console.log(result,"result")
            // setLoader(false)
            // result?.id?.length>0&& navigate(`/home/${result?.id}`)
            const result =await createProfile.createEcoProfile(payload,file,user)
            localStorage.clear();
            result?.id?.length>0&&localStorage.setItem('user',JSON.stringify(result));
            console.log(result,"result")
             setLoader(false)
            console.log(result?.ecosystems[0]?.id) 
            // result?.id?.length>0&& navigate(`/home/${result?.id}`)
            result?.id?.length>0&& navigate(`/home/${result?.ecosystems[0]?.id}`)
          }catch(e){
            console.log(e)
            if(e.message==="TypeError: Cannot read properties of undefined (reading 'indexOf')"){
              navigate(`/register/login`)
            }
            setLoader(false)
            setErrorMsg(e.message)
          }

   
           
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
                                <div className='rounded-full h-44 w-44'
                                   onClick={handleClick}
                                   >
                                    <img
                                    src={url?.src}
                                    className='w-full h-full rounded-full'
                                    />
                                          <input
                                            type="file"
                                            className='hidden'
                                            ref={hiddenFileInput}
                                            onChange={handleChange}
                                            />
                                </div>
                            
                    }

        </div>


         <div className='flex flex-col w-full px-10'>  
                    <div className='px-6 py-8'>
                            {errorMsg && (
                            // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                            <Alert severity="error">{errorMsg}</Alert>
                            )}

                        </div>

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
                        {country?.label?.length != undefined?
                              <h5 className='text-sm'>+{countryCode(country?.iso)}</h5>
                                :
                                <BsFlag
                                className="text-slate-500 font-semibold text-lg "
                              />

                          }
                    <input 
                        placeholder='(201) 555-0123'
                        className=' py-2  w-full rounded-md text-sm outline-none'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        name="phoneNum"
                        value={phoneNum}
                        onChange={(e)=>setNum(formatPhoneNumber(e.target.value))}
                
                
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
                        {/* <input 
                            placeholder='Neighborhood, City, or Zip'
                            className=' py-2  w-full rounded-md text-sm outline-none'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            name="ecoLocation"
                            value={ecoLocation}
                            onChange={(e)=>setLocation(e.target.value)}
                        
                        /> */}
                                                           <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] w-full">
                                        <ReactSelect
                                            styles={style}
                                            placeholder='Neighborhood, City, or Zip'
                                            options={
                                            countries &&
                                            countries?.map((item, index) => ({
                                                label: item?.country + "," + item?.iso3,
                                                value: item?.country,
                                                cities: item?.cities,
                                                iso:item?.iso3
                                            }))
                                            }
                                            value={country}
                                            menuPlacement="auto"
                                            menuPosition="fixed"
                                            noOptionsMessage={(opt) => {
                                            if (opt.inputValue === "") {
                                                return "Select your country";
                                            } else {
                                                return "no search results for " + opt?.inputValue;
                                            }
                                            }}
                                            components={{
                                            IndicatorSeparator: () => null,
                                            }}
                                            onChange={(opt) => {
                                            setSelectedCountry(opt);
                                            setSelectedCity({label:opt?.cities[0], value :opt?.cities[0]})
                                            }}
                                        />
                                    </div>

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
   
          <h5 style={{color: "rgba(37, 31, 134, 1)"}}
           onClick={()=>window.history.go(-1)}
            >Back</h5>
                     {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                                          :
                            <button className='px-6 py-2 text-blue-600 rounded-full' 
                            style={{background: "rgba(237, 237, 237, 1)"}}
                            onClick={create}
                            > Continue</button>
                          }
                    
    </div>


</div>
  )
}
