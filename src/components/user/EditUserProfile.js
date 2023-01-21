import {
  CalendarMonth,
  CalendarMonthOutlined,
  Group,
  Groups,
} from "@mui/icons-material";
import { Avatar, Button, Divider, InputBase } from "@mui/material";
import React, { useState } from "react";

const EditUserProfile = () => {
    const [photo, setPhoto] = useState(null)
  return (
    <div className="bg-white shadow-lg rounded-[18px] px-2 py-2 md:px-[95px] pb-10  md:py-[36px]">
      <div className="lg:flex items-center">
        <div className=" flex-1 text-[#114369] font-[600] text-xl ">
          <div> Edit User Profile</div>
        </div>

        <div className="flex  mt-4 md:mt-0">
          <div className="mr-3">
            <Button
              sx={{
                bgcolor: "white",
                border: "1px solid #24A0FD",
                color: "#24A0FD",
                fontSize: "12px",
                width: { md: "105px", xs: "" },
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "white",
                  color: "#24A0FD",
                },
              }}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              sx={{
                bgcolor: "#24A0FD",
                color: "white",
                fontSize: "12px",
                width: "175px",
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
            >
              Save and Close
            </Button>
          </div>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Profile Picture{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div>
            <Avatar
              src={
                photo ? URL.createObjectURL(photo) : "/picture_placeholder.png"
              }
              variant="square"
              sx={{ width: "156px", height: "156px" }}
            />
            <input
              hidden
              type="file"
              id="hiddenfileinput"
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
            />
            <Button
              onClick={() => {
                document.getElementById("hiddenfileinput").click();
              }}
              sx={{
                bgcolor: "#24A0FD",
                mt: 1,
                border: "1px solid #24A0FD",
                color: "white",
                fontSize: "12px",
                width: "105px",
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
            >
              Upload photo
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Name{" "} (Required)
            <span className="text-black font-thin text-[10px] ">
              
            </span>
          </div>
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="First Name"
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Profile Description
            <span className="text-black font-thin text-[10px] ">
              
            </span>
          </div>
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%", lg:"800px" },
                py: 1,
              }}
              placeholder="Profile description here..."
              multiline
              rows={6}
            />
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
