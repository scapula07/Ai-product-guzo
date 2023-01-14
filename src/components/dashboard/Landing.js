import {
  Dashboard,
  KeyboardArrowDown,
  Launch,
  Link,
} from "@mui/icons-material";
import { Avatar, Button, Divider } from "@mui/material";
import React from "react";
import CollaborationCard from "../molecules/CollaborationCard";

const Landing = () => {
  return (
    <div className="bg-white py-[20px] px-[30px] md:rounded-[18px] shadow-lg ">
      <div className="flex items-center">
        <div className="flex flex-1 text-[#114369] font-[600] text-xl ">
          Fifth Ward CRC
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

      <div className="lg:flex items-center lg:space-x-4 space-y-2 lg:space-y-0 ">
        <Avatar
          variant="square"
          sx={{ width: {lg:"120px", xs:'100%'}, height: {lg:"120px", xs:'190px', sm:'290px'}, borderRadius: "8px" }}
          src="/logo1.png"
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

      <div className="flex items-center mt-6 text-sm font-[300] space-x-6">
        <div>
          <Dashboard
            sx={{
              color: "#24A0FD",
              fontSize: "",
              position: "relative",
              bottom: 1,
            }}
          />
          <span className="text-[#24A0FD] font-[500]">Category: </span>{" "}
          <span>Community Resource</span>
        </div>

        <div>
          <span className="text-[#24A0FD] font-[500]">#Tags: </span>{" "}
          <span> Neighborhood Resource, Connector</span>
        </div>
      </div>

      <div className="mt-[30px] text-[12px]  ">
        <div className="font-bold mb-2 text-sm">Audience Channels</div>
        <div className="md:w-[55vw] lg:w-full w-[85vw] overflow-x-auto" >
        <div className="md:w-[850px] lg:w-full w-[1000px] ">
          <div className="grid grid-cols-9  items-center divide-x  bg-[#24A0FD] text-white  px-3 ">
            <div className="relative">
              <div className="text-center">#</div>
              <div className="absolute right-0 top-[-2px] ">
                <KeyboardArrowDown
                  sx={{ color: "white", stroke: "#24A0FD", strokeWidth: 1 }}
                />
              </div>
            </div>

            <div className="col-span-2 py-2 pl-4">Digital Channel</div>

            <div className="col-span-2 py-2 pl-4">Size</div>

            <div className="relative col-span-2 py-2">
              <div className="text-center">Platform link</div>
              <div className="absolute right-2 top-[6px] ">
                <Link
                  sx={{ color: "white", stroke: "#24A0FD", strokeWidth: 1 }}
                />
              </div>
            </div>

            <div className="col-span-2 py-2 text-center">Verified</div>
          </div>

          <div className="grid grid-cols-9  items-center divide-x  bg-[#EBF1F5] text-black  px-3 ">
            <div className="relative">
              <div className="text-center">1</div>
            </div>

            <div className="col-span-2 py-2 pl-4">Facebook</div>

            <div className="col-span-2 py-2 pl-4">10,000</div>

            <div className="col-span-2 py-2">
              <span className="flex justify-center space-x-[2px]">
                {" "}
                <Launch
                  sx={{ fontSize: "", position: "relative", top: 2 }}
                />{" "}
                https://www.facebook....
              </span>
            </div>

            <div className="col-span-2 py-2 text-center">Yes</div>
          </div>

          <div className="grid grid-cols-9  items-center divide-x   text-black  px-3 ">
            <div className="relative">
              <div className="text-center">2</div>
            </div>

            <div className="col-span-2 py-2 pl-4">Instagram</div>

            <div className="col-span-2 py-2 pl-4">3,500</div>

            <div className="col-span-2 py-2">
              <span className="flex justify-center space-x-[2px]">
                {" "}
                <Launch
                  sx={{ fontSize: "", position: "relative", top: 2 }}
                />{" "}
                https://www.instagram....
              </span>
            </div>

            <div className="col-span-2 py-2 text-center">Yes</div>
          </div>

          <div className="grid grid-cols-9  items-center divide-x  bg-[#EBF1F5] text-black  px-3 ">
            <div className="relative">
              <div className="text-center">3</div>
            </div>

            <div className="col-span-2 py-2 pl-4">Website</div>

            <div className="col-span-2 py-2 pl-4">n/a</div>

            <div className="col-span-2 py-2">
              <span className="flex justify-center space-x-[2px]">
                {" "}
                <Launch
                  sx={{ fontSize: "", position: "relative", top: 2 }}
                />{" "}
                https://www.thendka....
              </span>
            </div>

            <div className="col-span-2 py-2 text-center">No</div>
          </div>
        </div>
        </div>
      </div>

      <div className="mt-[30px] text-[12px] ">
        <div className="font-bold mb-2 text-sm ">
          Available Collaboration{" "}
          <span className="text-[#24A0FD] font-[300] ">(See All)</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-1 lg:gap-[48px]">
          <CollaborationCard />
          <CollaborationCard />
          <CollaborationCard />
        </div>
      </div>
    </div>
  );
};

export default Landing;
