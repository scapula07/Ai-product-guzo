import { Alert, Avatar, Button, Divider, Fade, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";
import FadeIn from 'react-fade-in';
import jwtDecode from "jwt-decode";


const ResetPassword = () => {
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const collaboration_id = urlParams.get('collaboration_id')
  const loggedInUser =  JSON.parse(localStorage.getItem('user'))
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const [loader,setLoader] = useState(false)
  const [msg,setMsg] = useState("")
  const {token} = useParams()
  const [errorMsg,setErrorMsg] = useState("")
  
  useEffect(() => {
    if(loggedInUser){
      if(collaboration_id){
        navigate("/collaboration/contact-capture/"+collaboration_id)
      }else{
        navigate('/dashboard/discover')
      }
    }
  }, [])

  const [decoded, setDecoded] = useState(null)

  useEffect(()=> {
    let d = jwtDecode(token)
        setDecoded(jwtDecode(token))
        setUser({...user,email: d.data.email})
  },[token])

 
  

  const [user, setUser] = useState({
    confirm_password: "",
    password:"",
    token,
   
  }) 

   const resetPassword = async() => {
    setLoader(true)
    setError(false)
    setAlert(false)

    if(user.confirm_password !== user.password){
        setErrorMsg('confirm password does not match')
        setError(true)
        setLoader(false)
        return
    }
     let url = process.env.REACT_APP_BACKEND_URL
     axios
     .post(url+"/user/reset-password", user)
     .then((res) => {
       console.log(res.data)
      if(res.data.msg){
        setMsg(res.data.msg)
        setAlert(true)
        setTimeout(()=> {
            if(res.data.collaboration_id){
                navigate('/auth/login?collaboration_id='+res.data.collaboration_id)
            }else{
                navigate('/auth/login')
            }
        },2000)
      }else{
        setErrorMsg('some error occured!')
        setError(true)
      }
       setLoader(false)
     })
     .catch((err) => {
       console.log(err);
       setErrorMsg('some error occured!')
       setLoader(false)
       setError(true)
     });
        
   }
  return (
    <div className="md:flex justify-center md:mt-[2vw] mt-[4vw] ">
      <div>
        <div className="flex justify-center">
          <img src="/logo.png" className="w-[140px] h-[50px]" />
        </div>
        <div className="bg-white mt-5 lg:w-[40vw] md:w-[70vw]  shadow-lg md:px-20 px-4 py-10 rounded-lg">
          <div className="font-bold text-[16px] text-center text-[#114369]">Forgot Password</div>

        

          <div className="mt-4">
          {error && (
            <FadeIn>
            <Alert severity="error">{errorMsg}</Alert>
            </FadeIn>
         )}
          
         {alert && (
            <FadeIn>
            <Alert severity="success">{msg}</Alert>
            </FadeIn>
         )}
            


            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                E-mail
                
              </div>
              <div>
                <InputBase
                disabled
                  sx={{
                    bgcolor: "#EBF1F5",
                    pl: 3,
                    fontSize: "14px",
                    borderRadius: "8px",
                    width: "100%",
                    py: "3px",
                  }}
                  placeholder="your email"
                  onChange={(e)=>{
                    setUser(
                      { ...user,
                       email : e.target.value
                      }
                    )
                  }}
                  value={user.email}
                />
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
               New Password
                
              </div>
              <div>
                <InputBase
                 type='password'
                  sx={{
                    bgcolor: "#EBF1F5",
                    pl: 3,
                    fontSize: "14px",
                    borderRadius: "8px",
                    width: "100%",
                    py: "3px",
                  }}
                  placeholder="your password"
                  onChange={(e)=>{
                    setUser(
                      { ...user,
                       confirm_password : e.target.value
                      }
                    )
                  }}
                  value={user.confirm_password}
                />
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                Confirm password
                
              </div>
              <div>
                <InputBase
                type='password'
                  sx={{
                    bgcolor: "#EBF1F5",
                    pl: 3,
                    fontSize: "14px",
                    borderRadius: "8px",
                    width: "100%",
                    py: "3px",
                  }}
                  placeholder="confirm your password"
                  onChange={(e)=>{
                    setUser(
                      { ...user,
                       password : e.target.value
                      }
                    )
                  }}
                  value={user.password}
                />
              </div>
            </div>

            

            {/* <div className="mt-4 text-[#24A0FD] underline text-[12px] cursor-pointer ">
            I forgot my password 
            <span className="mx-1">or</span>
             <span className="" onClick={()=> {
              if(collaboration_id){
                navigate('/auth/register?collaboration_id='+collaboration_id)
              }else{
                navigate('/auth/register')
              }
             }} >register</span>
            </div> */}

            <div className="my-3 text-red-600 text-xs " id='info' > </div>

            <div className="flex justify-end mt-4" >
            {loader ? (
              <div className="flex" > <div className="flex-1 flex" /> <CustomizedProgressBars/> </div>
            ): (
              <Button
              sx={{
                bgcolor: "#24A0FD",
                color: "white",
                fontSize: "14px",
                width: { sm: "fit", xs: "fit" },
                textTransform: "none",
                borderRadius: "5px",
                px: 3,
                mx: {xs: 1 , lg:0},
                mt: {xs: 2 , lg:0},
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
              onClick={resetPassword}
            >
            Reset Password
            </Button>
            )}
            </div>
          </div>




        
          </div>
         
      </div>
    </div>
  );
};

export default ResetPassword;
