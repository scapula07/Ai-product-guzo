import { Person } from "@mui/icons-material";
import { Avatar, Button, InputBase } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

const Invite = () => {
  const navigate = useNavigate();
  return (
    <div className="grid lg:grid-cols-3 gap-7 w-full lg:px-[80px] px-2   ">
      <div className="mt-[44%]">
      <div className="flex justify-center">
          <img src="/guzo22.png" className="w-[20px] lg:w-[70px]" />
        </div>
        <div className="flex justify-center">
          <img src="/guzo-text.png" className="w-[20px] lg:w-[190px]" />
        </div>
      </div>
      <div className="col-span-2">
      <div className="bg-white lg:mt-[24%] h-full lg:h-fit px-[33px] py-[35px] rounded-[10px]">
        <div className="text-[24px] leading-[34px] font-bold">
        Invite others to join your team
        </div>
        <div className="mt-[20px]">
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

        <div className="flex justify-end  mt-3">
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
           Send
          </Button>
        </div>
        
      </div>

      <div className="flex justify-between mt-[5vh] px-4 mb-3">
          <div
            className="text-[15px] text-[#4335EF] cursor-pointer "
            onClick={() => navigate(-1)}
          >
            Back
          </div>
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
            Continue
          </Button>
        </div>

        </div>
    </div>
  );
};

export default Invite;
