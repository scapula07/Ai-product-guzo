import { Avatar, Button, Divider, InputBase } from "@mui/material";
import React from "react";

const Register = () => {
  return (
    <div className="md:flex justify-center md:mt-[2vw] mt-[4vw] ">
      <div>
        <div className="flex justify-center">
          <img src="/logo.png" className="w-[140px] h-[50px]" />
        </div>
        <div className="bg-white mt-5 lg:w-[40vw] md:w-[70vw]  shadow-lg md:px-20 px-4 py-10 rounded-lg">
          <div className="font-bold text-[16px] text-center ">Sign up</div>

          <div className="flex justify-center space-x-3 mt-5">
            <div className="border-[1px] border-[#D3D3D3] px-3 w-fit  md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
                <div><img src='/google.png' className="w-[12px] h-[12px]" /></div>
             <div> Sign up with Google</div> 
            </div>

            <div className="border-[1px] border-[#D3D3D3] px-3 py-1 md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
            <div><img src='/ms.png' className="w-[12px] h-[12px]" /></div>
              <div>Sign up with Microsoft</div>
            </div>
          </div>

          <div className="flex item-center justify-center mt-5">
            <Divider sx={{ width: "150px" }} />
            <span className="relative bottom-3 mx-4 text-[12px] ">Or</span>
            <Divider sx={{ width: "150px" }} />
          </div>

          <div className="mt-4">
            <div className="text-[12px] font-bold ">Sign up using Email</div>

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                User name
                
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
                  placeholder="your username"
                />
              </div>
            </div>


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
                />
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                Password
                
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
                  placeholder="Your password"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4" >
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
          >
          Sign-up
          </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
