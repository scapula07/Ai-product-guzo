import { Button, CircularProgress, Divider, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorSnack from "../../components/molecules/ErrorSnack";
import CustomizedProgressBars from "../../components/molecules/Progress";

const Register1 = () => {
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [openErrorSnack, setOpenErrorSnack] = useState();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const register = async () => {
    setErrorMsg(null);
    if (user.email.length < 3) {
      setErrorMsg(" email is invalid ");
      setOpenErrorSnack(true);
      return;
    }
    if (user.password.length < 8) {
      setErrorMsg("password should be atleast 8 characters");
      setOpenErrorSnack(true);
      return;
    }

    if (user.password !== user.confirm_password) {
      setErrorMsg("passwords do not match");
      setOpenErrorSnack(true);
      return;
    }

    setLoader(true);
    console.log(user);
    

    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/user", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setTimeout(() => {
          setLoader(false);
          navigate("/new/auth/personal-profile");
        }, 1000);
      })
      .catch((err) => {
        setErrorMsg("user already exists");
        setLoader(false);
        console.log(err);
      });
  };
  //google signup function (non functional)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      /* global google */
      google.accounts.id.initialize({
        /* client_id: "177032038340-jul0gcjukdu8turooase19b1divjlc09.apps.googleusercontent.com", */
        client_id:
          "293518718374-t8n6cfcrlacah3n7v6c0dkmamvklikb8.apps.googleusercontent.com",
        callback: "",
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    } catch (error) {
      window.location.reload();
    }
  }, []);
  return (
    <>
      <ErrorSnack
        open={openErrorSnack}
        setOpen={setOpenErrorSnack}
        msg={errorMsg}
        duration={3000}
      />
      <div className="absolute top-5 left-5 ">
        <img rel="icon" src="/guzo22.png" className=" w-[20px] lg:w-[40px]" />
      </div>
      <div className="bg-white border-[rgba(130,122,247,0.3)] border-[1px] rounded-[11px] lg:w-[50vw] w-full px-2 lg:px-[100px] py-[50px] mt-[90px]">
        <div className="text-[20px] leading-[34px] font-semibold text-center flex  justify-center  items-center space-x-2">
          Sign up for Guzo.
        </div>

        <div className="space-y-[15px]">
          <div>
            <div className="text-[#5B5B5B] font-[500] text-[14px] ">Email</div>
            <InputBase
              sx={{
                border: "1px solid rgba(242,242,242,0.6)",
                pl: 1,
                width: "100%",
                borderRadius: "8px",
                mt: "4px",
                bgcolor: "rgba(242,242,242,0.6)",
                fontSize: "14px",
              }}
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              placeholder="Email"
            />
          </div>

          <div>
            <div className="text-[#5B5B5B] font-[500] text-[14px] ">
              Password
            </div>
            <InputBase
              type="password"
              sx={{
                border: "1px solid rgba(242,242,242,0.6)",
                pl: 1,
                width: "100%",
                borderRadius: "8px",
                mt: "4px",
                bgcolor: "rgba(242,242,242,0.6)",
                fontSize: "14px",
              }}
              placeholder="Password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>

          <div>
            <div className="text-[#5B5B5B] font-[500] text-[14px] ">
              Confirm Password
            </div>
            <InputBase
              type="password"
              sx={{
                border: "1px solid rgba(242,242,242,0.6)",
                pl: 1,
                width: "100%",
                borderRadius: "8px",
                mt: "4px",
                bgcolor: "rgba(242,242,242,0.6)",
                fontSize: "14px",
              }}
              placeholder="Confirm Password"
              value={user.confirm_password}
              onChange={(e) => {
                setUser({ ...user, confirm_password: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-[25px] mb-[35px]">
         {loader ? <div className="flex justify-center"><CustomizedProgressBars/></div> : (
           <Button
           sx={{
             backgroundColor: "#ECEBFE",
             color: "#4335EF",
             borderRadius: "22px",
             px: 5,
             fontSize: "15px",
             textTransform: "none",
           }}
           onClick={() => {
             register();
           }}
         >
           Sign up
         </Button>
         )}
        </div>

        <div className="flex justify-center">
          <Divider
            sx={{
              color: "red",
              border: "0.7px solid rgba(142,142,142,1)",
              width: "80%",
            }}
          />
        </div>

        <div className="flex justify-center mt-[35px]">
          <div className="grid lg:grid-cols-2 gap-4">
            <div id="signInDiv"></div>
            <div className="border-[1px] border-[#D3D3D3] px-3 py-1 md:text-[12px] text-[10px] cursor-pointer flex justify-center items-center space-x-2 ">
              <div>
                <img src="/ms.png" className="w-[12px] h-[12px]" />
              </div>
              <div>Sign up with Microsoft</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register1;
