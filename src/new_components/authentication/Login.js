import { Button, Divider, InputBase } from "@mui/material";
import React, { useEffect } from "react";

const Login = () => {


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
    <div className="absolute top-5 left-5 ">
          <img rel="icon" src="/guzo22.png" className=" w-[20px] lg:w-[40px]" />
        </div>

        <div className="bg-white border-[rgba(130,122,247,0.3)] border-[1px] rounded-[11px]  lg:w-[50vw] w-full px-2 lg:px-[100px] py-[50px] mt-[90px]">
      <div className="text-[20px] leading-[34px] font-semibold text-center flex  justify-center  items-center space-x-2">
      Login to Guzo
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
            placeholder="Email"
          />
        </div>

        <div>
          <div className="text-[#5B5B5B] font-[500] text-[14px] ">Password</div>
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
            placeholder="Email"
          />
        </div>

       
      </div>

      <div className="flex justify-center mt-[25px] mb-[35px]">
        <Button
          sx={{
            backgroundColor: "#ECEBFE",
            color: "#4335EF",
            borderRadius: "22px",
            px: 5,
            fontSize: "15px",
            textTransform: "none",
          }}
        >
          Login
        </Button>
      </div>

      <div className="flex justify-center">
      <Divider sx={{ color:'red', border:'0.7px solid rgba(142,142,142,1)', width:'80%'}} />
      </div>

      <div className="flex justify-center mt-[35px]">
      <div className="grid lg:grid-cols-2 gap-4" >
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

export default Login;
