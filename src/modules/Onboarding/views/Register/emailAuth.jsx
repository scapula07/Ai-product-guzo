import React,{useState,useEffect} from 'react'
import {MdLocationPin} from "react-icons/md"
import { Link } from 'react-router-dom'
import { authApi } from '../../_api/auth'
import { useNavigate } from "react-router-dom";
import {useRecoilValue} from "recoil"
import { accountTypeState } from '../../../Recoil/globalstate'
import ClipLoader from "react-spinners/ClipLoader";
import {BsFillEyeFill,BsFillEyeSlashFill} from "react-icons/bs"
import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import ReactSelect from "react-select";
import axios from "axios"

export default function EmailAuth() {
    let navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null)
    const account =useRecoilValue(accountTypeState)
    console.log(account,"email")

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [firstName,setFirst]=useState("")
    const [lastName,setLast]=useState("")
    const [isLoading,setLoader]=useState(false)
    const [view,setView]=useState(false)
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

      console.log(country,"countryyyy")

    const signUpWithEmail=async()=>{
       
        setErrorMsg(null)
        console.log(country,"country")
        if (country?.length < 3) {
          setErrorMsg(' Location is invalid ');
          setLoader(false);
          return;
        }

        if (firstName.length < 3) {
          setErrorMsg( 'first name is invalid ');
          setLoader(false);
          return;
        }
    
        if (lastName.length < 3) {
          setErrorMsg( 'last name is invalid' );
          setLoader(false);
          return;
        }
    
        if (email.length < 3) {
          setErrorMsg(' email is invalid ');
          setLoader(false);
          return;
        }
        if (country?.label?.length < 3) {
          setErrorMsg(' Location is invalid ');
          setLoader(false);
          return;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setErrorMsg( "email is invalid" );
            setLoader(false);
        }
    
        if (password.length < 8) {
          setErrorMsg( "password should be atleast 8 characters" );
          setLoader(false);
          return;
        }
      
        const payload={
            email,
            firstName,
            lastName,
            img:"",
            location:country?.label,
            organizations:[],
            ecosystems:[],
            pending:[]

          }
          setLoader(true)
          try{
             
             const user =await authApi.register(email,password,payload)
             console.log(user,"user")
             let route=""
             if(account==="Organization"){
                route="org"
             }else if(account==="Ecosystem"){
                route="ecosystem"
             }
             setLoader(true)
               localStorage.clear();
               localStorage.setItem('user',JSON.stringify(user));

             user?.id.length >0&& navigate(`/create-profile/${route}`)

            }catch(e){
                console.log(e.message.FirebaseError,"emaillll")
                setErrorMsg(e.message);
                setLoader(false);
            }
   


        }

  return (
    <div className='w-full flex justify-center  '>
            <div className='w-4/5 flex bg-white rounded-lg  border flex-col  space-y-8 py-8' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                 <h5 className='text-xl font-semibold text-center'>Sign up with Email</h5>
                 <div className='px-10 py-1'>
                    {errorMsg && (
                    //   <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                    <Alert severity="error">{errorMsg}</Alert>
                     )}

                 </div>
                 

                    <div className='flex flex-col w-full px-10 space-y-4'>
                        <div className='flex items-center w-full space-x-4'>
                            <div className='flex flex-col w-1/2 space-y-2'>
                                <label className='text-sm text-slate-700'>First Name</label>
                                <input 
                                    placeholder='First Name'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e)=>setFirst(e.target.value)}

                                />

                            </div>
                            <div className='flex flex-col w-1/2 space-y-2'>
                                <label className='text-sm text-slate-700'>Last Name</label>
                                    <input 
                                        placeholder='Last Name'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none  '
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e)=>setLast(e.target.value)}
                                    />

                            </div>

                        </div>
                        <div className='flex flex-col w-full space-y-4'>
                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Email</label>
                                    <input 
                                        placeholder='Email'
                                        className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Password</label>
                                    <div className='flex items-center justify-between   w-full rounded-md text-sm outline-none'
                                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                     >
                                            <input 
                                                placeholder='Password'
                                                className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                                name="password"
                                                type={view?"text":"password"}
                                                value={password}
                                                onChange={(e)=>setPassword(e.target.value)}
                                            />

                                            {/* {view?
                                                <BsFillEyeSlashFill 
                                                className='text-slate-500 text-xl'
                                                onClick={()=>setView(false)}
                                                />
                                                :

                                                <BsFillEyeFill
                                                    className='text-slate-500 text-xl'
                                                    onClick={()=>setView(true)}
                                              />
                                               
                                            } */}

                                    </div>


                            </div>

                            <div className='flex flex-col w-full space-y-2'>
                                    <label className='text-sm text-slate-700'>Location</label>
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
                                            
                                            /> */}

                                   <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] w-full">
                                        <ReactSelect
                                            styles={style}
                                            placeholder='Neighborhood, City, or Zip'
                                            options={
                                            countries &&
                                            countries?.map((item, index) => ({
                                                label: item?.country + "," + item?.iso3,
                                                // value: item?.country,
                                                // cities: item?.cities,
                                            }))
                                            }
                                            value={country}
                                            menuPlacement="auto"
                                            menuPosition="fixed"
                                            noOptionsMessage={(opt) => {
                                            if (opt?.inputValue === "") {
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
                                            // setSelectedCity({label:opt?.cities[0], value :opt?.cities[0]})
                                            }}
                                        />
                                    </div>
                                    </div>
                                 


                                

                            </div>



                        </div>

                    </div>
                      

                      <div className='flex flex-col items-center space-y-3'>
                          {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                             :
                            <button className='text-blue-700 rounded-full px-16 py-1.5'
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                onClick={signUpWithEmail}
                            
                                >
                                Next
                            </button>
                           


                        }

                          <p className='text-sm text-center font-semibold w-3/5'>
                             By signing up, you agree to 

                             <span className='text-blue-700 underline'> Terms of Service</span>, 
                             <span className='text-blue-700 underline'>Privacy Policy</span>, and 
                             <span className='text-blue-700 underline'> Cookie Policy</span>.
                          </p>

                      </div>

                      <div className='flex flex-col space-y-4 items-center w-full'>
                            <h5 className='h-0.5  w-1/3 text-black border '></h5>
                            <div className='flex flex-col space-y-2 items-center w-full'>
                            <h5>Already have an account?</h5>
                            <Link to="/register/login">
                                <button className='border border-blue-700 text-blue-700 rounded-full px-10 py-1'>Sign in</button>
                            </Link>
        
                            </div>
                     </div>
               
 
            </div>

    </div>
  )
}


