import { Alert, Avatar, Button, Divider, Fade, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";
// import FadeIn from 'react-fade-in';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const collaboration_id = urlParams.get('collaboration_id')
  const loggedInUser =  JSON.parse(localStorage.getItem('user'))
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const [loader,setLoader] = useState(false)
  const [msg,setMsg] = useState("")
  useEffect(() => {
    if(loggedInUser){
      if(collaboration_id){
        navigate("/collaboration/contact-capture/"+collaboration_id)
      }else{
        navigate('/dashboard/discover')
      }
    }
  }, [])
  

  const [user, setUser] = useState({
    email: "",
    collaboration_id
  }) 

   const forgotPassword = async() => {
    setLoader(true)
    setError(false)
    setAlert(false)
     let url = process.env.REACT_APP_BACKEND_URL
     axios
     .post(url+"/user/forgot-password", user)
     .then((res) => {
       console.log(res.data)
      if(res.data.msg){
        setMsg(res.data.msg)
        setAlert(true)
      }else{
        setError(true)
      }
       setLoader(false)
     })
     .catch((err) => {
       console.log(err);
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
            // <FadeIn>
            // <Alert severity="error">Some error occured try again!</Alert>
            // </FadeIn>
            <Alert severity="error">Some error occured try again!</Alert>
         )}
          
         {alert && (
            // <FadeIn>
            // <Alert severity="success">{msg}</Alert>
            // </FadeIn>
            <Alert severity="success">{msg}</Alert>
         )}
            


            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                E-mail
                
              </div>
              <div>
                <InputBase
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
              onClick={forgotPassword}
            >
            Send me password reset link
            </Button>
            )}
            </div>
          </div>




        
          </div>
         
      </div>
    </div>
  );
};

export default ForgotPassword;
