import { Person } from "@mui/icons-material";
import { Avatar, Button, InputBase } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

const Share = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState(
    "www.guzo.io/organization/" +
      JSON.parse(localStorage.getItem("active_organization"))?._id || JSON.parse(localStorage.getItem("active_ecosystem"))?._id
  );
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
      <div className="bg-white lg:mt-[24%] h-full lg:h-fit col-span-2 px-[33px] py-[35px] rounded-[10px]">
        <div className="text-[24px] leading-[34px] font-bold">
          Share your Guzo Profile.
        </div>
        <div className="text-[16px] leading-[34px] font-semibold  ">
          Share the link below to take people to your organization profile.
        </div>
        <div className="mt-[20px]">
          <div className="text-[#5B5B5B] font-[500] text-[14px] ">
            Network URL Link
          </div>
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
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-center  mt-3">
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
            Copy Link
          </Button>
        </div>

        <div className="flex justify-center  mt-3">
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
              navigate("/new/invite");
            }}
          >
            Continue to Guzo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Share;
