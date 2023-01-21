import {
  CalendarMonth,
  CalendarMonthOutlined,
  Group,
  Groups,
} from "@mui/icons-material";
import { Avatar, Button, Divider } from "@mui/material";
import React from "react";

const UserProfile = () => {
  return (
    <div className="bg-white shadow-lg rounded-[18px] px-2 py-2 md:px-[95px] pb-10  md:py-[36px]">
      <div className="flex items-center">
        <div className="flex flex-1 text-[#114369] font-[600] text-xl ">
          Philip Burke
        </div>
        <div>
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "14px",
              width: "125px",
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="lg:flex items-start lg:space-x-4 space-y-2 lg:space-y-0 ">
        <Avatar
          variant="square"
          sx={{
            width: { lg: "120px", xs: "100%" },
            height: { lg: "120px", xs: "190px", sm: "290px" },
            borderRadius: "8px",
          }}
          src="/user.png"
        />

        <div className="text-sm font-[300] leading-[30px]">
          Organized in 1989, Fifth Ward Community Redevelopment Corporation
          (Fifth Ward CRC), a NeighborWorks America affiliate, is designed to
          foster holistic community development. Fifth Ward CRC seeks to enhance
          the quality of life for individuals and families in the
          <span className="text-[#24A0FD] font-[500] cursor-pointer">
            ...See More
          </span>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="md:flex space-y-3 md:space-y-0 items-center mt-6 text-sm font-[300] justify-between">
        <div>
          <div className="flex">
            <div className="text-[#24A0FD] font-[500]">
              {" "}
              <Groups
                sx={{
                  color: "#24A0FD",
                  fontSize: "20px",
                  position: "relative",
                  bottom: 1,
                  mr: 1,
                }}
              />
              Groups:{" "}
            </div>{" "}
            <div className="ml-1 flex md:block">
              <div>5th Ward Bank,</div>
              <div>5th Ward CRC</div>
            </div>
          </div>
        </div>

        <div>
          <CalendarMonthOutlined
            sx={{
              color: "#24A0FD",
              fontSize: "18px",
              position: "relative",
              bottom: 1,
            }}
          />
          <span className="text-[#24A0FD] font-[500]">Creation Date: </span>{" "}
          <span>Community Resource</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
