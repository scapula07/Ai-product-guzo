import { SettingsSystemDaydreamSharp } from "@mui/icons-material";
import { Avatar, Button, Divider, InputBase, Alert } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";
import FadeIn from "react-fade-in";
import jwtDecode from "jwt-decode";

const JoinCommunity = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loader, setLoader] = useState(false)
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [msg,setMsg] = useState(null)
  const { token } = useParams();
  const [errorMsg, setErrorMsg] = useState()
  useEffect(() => {
    if (loggedInUser) {
      setStep(2);
    }
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    setLoader(true)
    axios
      .post(url + "/user/login", user)
      .then((res) => {
        console.log(res.data);
        if (res.data.code) {
         setErrorMsg(res.data.msg)
            setLoader(false)
        } else {
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(res.data));
          setStep(2);
          setLoader(false)
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false)
      });
  };




  const googleLogin = async (response) => {
    setLoader(true);
    setErrorMsg(null)
    var user_object = jwtDecode(response.credential);
    let url = process.env.REACT_APP_BACKEND_URL;
    let user = {
      email: user_object.email,
    };
    axios
      .post(url + "/user/login-with-google", user)
      .then((res) => {
        console.log(res.data);
        if (res.data.code) {
          setErrorMsg(res.data.msg)
          setLoader(false);
        } else {
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(res.data));
            setLoader(false);
            setStep(2);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false)
      });
  };

  const register = async () => {
    setLoader(true);
    setErrorMsg(null)

    if (user.first_name.length < 3) {
      setErrorMsg( 'first name is invalid ');
      setLoader(false);
      return;
    }

    if (user.last_name.length < 3) {
      setErrorMsg( 'last name is invalid' );
      setLoader(false);
      return;
    }

    if (user.email.length < 3) {
      setErrorMsg(' email is invalid ');
      setLoader(false);
      return;
    }

    if (user.password.length < 8) {
    setErrorMsg( "password should be atleast 8 characters" );
      setLoader(false);
      return;
    }

    let url = process.env.REACT_APP_BACKEND_URL;
    setLoader(true)
    axios
      .post(url + "/user", user)
      .then((res) => {
        console.log(res.data);
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
        setStep(2);
        setLoader(false)
      })
      .catch((err) => {
        setErrorMsg( "user already exists");;
        console.log(err);
        setLoader(false)
      });
  };


  const registerfromgoogle = async (response) => {
    setErrorMsg(null)
    var user_object = jwtDecode(response.credential);
    console.log(user_object)
    let url = process.env.REACT_APP_BACKEND_URL;
    let data = {
      email : user_object.email,
      password: user_object.aud,
      picture: user_object.picture,
      first_name: user_object.family_name,
      last_name : user_object.given_name
    }
    axios
      .post(url + "/user/register-with-google", data)
      .then((res) => {
        console.log(res.data);
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
          setLoader(false);
          setStep(2);
      })
      .catch((err) => {
        setErrorMsg(" user already exists" );
        setLoader(false);
        console.log(err);
      });
  };

  const acceptInvite = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    let user = JSON.parse(localStorage.getItem('user'))
    let d = jwtDecode(token)
    console.log(d)
    if(user.email !== d.data.reciever ){
      setMsg('Email on invite does not match user email address, please log out from the account in session')
      return
    }


    axios
      .get(url + "/team/accept-invite/" + token)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          if(res.data.error.message){
            setMsg(res.data.error.message);
          }else{
            setMsg('Email on invite does not match user email address')
          }
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem('community_idd', d.data.community_id)
          setTimeout(() => {
            navigate("/dashboard/discover");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    /* global google */
    google.accounts.id.initialize({
      /* client_id: "177032038340-jul0gcjukdu8turooase19b1divjlc09.apps.googleusercontent.com", */
      
      client_id:
        "293518718374-t8n6cfcrlacah3n7v6c0dkmamvklikb8.apps.googleusercontent.com",
      callback: googleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    /* global google */
    google.accounts.id.initialize({
      /* client_id: "177032038340-jul0gcjukdu8turooase19b1divjlc09.apps.googleusercontent.com", */
      
      client_id:
        "293518718374-t8n6cfcrlacah3n7v6c0dkmamvklikb8.apps.googleusercontent.com",
      callback: registerfromgoogle,
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="md:flex justify-center md:mt-[2vw] mt-[4vw] ">
      {step === 0 && (
        <div>
          <div className="flex justify-center">
            <img src="/logo.png" className="w-[140px] h-[50px]" />
          </div>
          <div className="bg-white mt-5 lg:w-[40vw] md:w-[70vw]  shadow-lg md:px-20 px-4 py-10 rounded-lg">
            <div className="font-bold text-[16px] text-center text-[#114369]">
              Login to your account
            </div>

            {errorMsg && (
            <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
          )}

            <div className="mt-4">
              
              {/* <div className="text-[12px] font-bold ">Sign up using Email</div> */}

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
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                    value={user.email}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <div className="text-[#114369] font-normal text-[14px] ">
                  Password
                </div>
                <div>
                  <InputBase
                    type="password"
                    sx={{
                      bgcolor: "#EBF1F5",
                      pl: 3,
                      fontSize: "14px",
                      borderRadius: "8px",
                      width: "100%",
                      py: "3px",
                    }}
                    placeholder="Your password"
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                    value={user.password}
                  />
                </div>
              </div>

              <div className="mt-4 text-[#24A0FD] underline text-[12px] cursor-pointer ">
                I forgot my password
              </div>

              
              <div className="flex justify-end mt-4">
                {loader ? <div className="flex justify-end">  <CustomizedProgressBars/></div>  : (
                  <Button
                  sx={{
                    bgcolor: "#24A0FD",
                    color: "white",
                    fontSize: "14px",
                    width: { sm: "fit", xs: "fit" },
                    textTransform: "none",
                    borderRadius: "5px",
                    px: 3,
                    mx: { xs: 1, lg: 0 },
                    mt: { xs: 2, lg: 0 },
                    ":hover": {
                      bgcolor: "#24A0FD",
                      color: "white",
                    },
                  }}
                  onClick={login}
                >
                  Login
                </Button>
                )}
              </div>
            </div>

            <Divider sx={{ my: 4 }} />

            <div className="my-4 text-[12px] text-center">
              Or <span className="underline text-[#24A0FD] text-xs font-bold cursor-pointer " onClick={()=>{
                setStep(1)
              }}  >Register</span>
            </div>

            <div className="flex justify-center space-x-3 mt-5">
            <div>
              <div id="signInDiv"></div>
            </div>
              {/* <div className="border-[1px] border-[#D3D3D3] px-3 w-fit  md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
                <div>
                  <img src="/google.png" className="w-[12px] h-[12px]" />
                </div>
                <div> Sign up with Google</div>
              </div>

              <div className="border-[1px] border-[#D3D3D3] px-3 py-1 md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
                <div>
                  <img src="/ms.png" className="w-[12px] h-[12px]" />
                </div>
                <div>Sign up with Microsoft</div>
              </div> */}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <div className="flex justify-center">
            <img src="/logo.png" className="w-[140px] h-[50px]" />
          </div>
          <div className="bg-white mt-5 lg:w-[40vw] md:w-[70vw]  shadow-lg md:px-20 px-4 py-10 rounded-lg">
            <div className="font-bold text-[16px] text-center ">Sign up</div>

            <div className="flex justify-center space-x-3 mt-5">
            <div>
              <div id="signUpDiv"></div>
            </div>
              {/* <div className="border-[1px] border-[#D3D3D3] px-3 w-fit  md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
                <div>
                  <img src="/google.png" className="w-[12px] h-[12px]" />
                </div>
                <div> Sign up with Google</div>
              </div>

              <div className="border-[1px] border-[#D3D3D3] px-3 py-1 md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
                <div>
                  <img src="/ms.png" className="w-[12px] h-[12px]" />
                </div>
                <div>Sign up with Microsoft</div>
              </div> */}
            </div>

            <div className="flex item-center justify-center mt-5">
              <Divider sx={{ width: "150px" }} />
              <span className="relative bottom-3 mx-4 text-[12px] ">Or</span>
              <Divider sx={{ width: "150px" }} />
            </div>

            {errorMsg && (
            <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
          )}


            <div className="mt-4">
              {/* <div className="text-[12px] font-bold ">Sign up using Email</div> */}

              <div className="space-y-2 mt-2">
                <div className="text-[#114369] font-normal text-[14px] ">
                  First Name
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
                    placeholder="your first name"
                    onChange={(e) => {
                      setUser({ ...user, first_name: e.target.value });
                    }}
                    value={user.first_name}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <div className="text-[#114369] font-normal text-[14px] ">
                  Last Name
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
                    placeholder="your last name"
                    onChange={(e) => {
                      setUser({ ...user, last_name: e.target.value });
                    }}
                    value={user.last_name}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-2">
                <div className="text-[#114369] font-normal text-[14px] ">
                  E-mail
                </div>
                <div>
                  <InputBase
                    type="email"
                    sx={{
                      bgcolor: "#EBF1F5",
                      pl: 3,
                      fontSize: "14px",
                      borderRadius: "8px",
                      width: "100%",
                      py: "3px",
                    }}
                    placeholder="your email"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                    value={user.email}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <div className="text-[#114369] font-normal text-[14px] ">
                  Password
                </div>
                <div>
                  <InputBase
                    type="password"
                    sx={{
                      bgcolor: "#EBF1F5",
                      pl: 3,
                      fontSize: "14px",
                      borderRadius: "8px",
                      width: "100%",
                      py: "3px",
                    }}
                    placeholder="Your password"
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                    value={user.password}
                  />
                </div>
              </div>

              =

             <div className='text-xs' >
                have an account ?,
             <span className="underline text-[#24A0FD] text-xs font-bold cursor-pointer" onClick={()=>{
                setStep(0)
              }}  >Login</span>
                 </div>

              <div className="flex justify-end mt-4">
              {loader ?<div className="flex justify-end">  <CustomizedProgressBars/></div> : (
                <Button
                  onClick={register}
                  sx={{
                    bgcolor: "#24A0FD",
                    color: "white",
                    fontSize: "14px",
                    width: { sm: "fit", xs: "fit" },
                    textTransform: "none",
                    borderRadius: "5px",
                    px: 3,
                    mx: { xs: 1, lg: 0 },
                    mt: { xs: 2, lg: 0 },
                    ":hover": {
                      bgcolor: "#24A0FD",
                      color: "white",
                    },
                  }}
                >
                  Sign-up
                </Button>
              )}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
         <div className="text-red-500 text-xs font-semibold text-center mb-4" >  { msg && (
          
          <div> <div>{msg} </div>
           <Button
                  onClick={()=>{
                    localStorage.clear()
                    window.location.reload()
                  }}
                  sx={{
                    bgcolor: "#24A0FD",
                    color: "white",
                    fontSize: "14px",
                    width: { sm: "fit", xs: "fit" },
                    textTransform: "none",
                    borderRadius: "5px",
                    px: 3,
                    mx: { xs: 1, lg: 0 },
                    mt: { xs: 2, lg: 0 },
                    mb: 5,
                    ":hover": {
                      bgcolor: "#24A0FD",
                      color: "white",
                    },
                  }}
                >
                  logout
                </Button>
          </div>)} </div>
         <div className="flex justify-center">
           
           <Button
             onClick={acceptInvite}
             sx={{
               bgcolor: "#24A0FD",
               color: "white",
               fontSize: "14px",
               width: { sm: "fit", xs: "fit" },
               textTransform: "none",
               borderRadius: "5px",
               px: 3,
               mx: { xs: 1, lg: 0 },
               mt: { xs: 2, lg: 0 },
               ":hover": {
                 bgcolor: "#24A0FD",
                 color: "white",
               },
             }}
           >
             Accept Invite
           </Button>
         </div>
        </div>
       
      )}
    </div>
  );
};

export default JoinCommunity;
