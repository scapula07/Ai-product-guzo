import { Button } from "@mui/material";
import React from "react";

const ThankYouCard = () => {
  return (
    <div className="flex justify-center md:mt-[20vw]">
      <div className="bg-white lg:w-[70vw] md:rounded-[20px] md:shadow-lg py-[30px] px-[40px]  ">
        <div className="text-[#114369] font-bold text-[16px] text-center" >Thank you for using Guzo.  Join up today!</div>

        <div className="mt-10 flex justify-center " >
            <img src='/logo.png'/>
        </div>


        <div className="text-[#114369] font-bold text-[12px] mt-2" >
        Start collaborating with your community today!
        </div>


        <div className="text-center  text-[19px] font-bold space-x-4 md:flex justify-center mt-4 text-[#114369] ">
      

          <Button
              sx={{
                bgcolor: "#24A0FD",
                border: "1px solid #24A0FD",
                color: "white",
                fontSize: "12px",
                width: { md: "fit", xs: "fit" },
                px: 2,
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
              
            >
             Sign in
            </Button>

            <Button
              sx={{
                bgcolor: "white",
                border: "1px solid #24A0FD",
                color: "#24A0FD",
                fontSize: "12px",
                width: { md: "fit", xs: "fit" },
                px: 2,
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "white",
                  color: "#24A0FD",
                },
              }}
              
            >
              Join Today!
            </Button>

            
      
        </div>
      </div>
    </div>
  );
};

export default ThankYouCard;
