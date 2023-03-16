import {
  Dashboard,
  KeyboardArrowDown,
  Launch,
  Link,
} from "@mui/icons-material";
import { Avatar, Button, CircularProgress, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollaborationCard from "../molecules/CollaborationCard";
import CustomizedProgressBars from "../molecules/Progress";

const MyCollaborations = () => {
  const [active, setActive] = useState(0);
  const [loader, setLoader] = useState(false);
  const [collaborations, setCollaborations] = useState(null);

  const getCollaborations = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(
        url +
          "/collaboration/collaborations/" +
          JSON.parse(localStorage.getItem("community"))._id
      )
      .then((res) => {
        console.log(res.data)
        setCollaborations(res.data);
        setLoader(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    getCollaborations();
  }, []);
  

  // useEffect(() => {
  //   if (active === 1) {
  //     setCollaborations([1, 2]);
  //   } else {
  //     setCollaborations([1, 2, 3, 4, 5, 6]);
  //   }
  // }, [active]);

  const navigate = useNavigate();

  return (
    <div className="bg-white py-[20px] px-[30px] md:rounded-[18px] shadow-lg ">
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="flex flex-1 text-[#114369] font-[600] text-xl ">
          My Collaborations
        </div>
        <div>
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "14px",
              width: "165px",
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
            onClick={() => navigate("/dashboard/create-collaboration")}
            className="transition ease-in-out delay-100  hover:-translate-y-0.5 hover:scale-200  duration-300"
          >
            Create Collaboration
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      {loader ? (
        <div className="flex justify-center mt-[50px]">
          {" "}
          <CircularProgress />{" "}
        </div>
      ) : (
        <div className="mt-[30px] text-[12px] ">
          {/* <div className="flex items-center text-[14px] space-x-[20px] mb-[20px] md:mb-[50px] ">
            <div
              className={
                active === 0
                  ? "bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1 "
                  : " bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer "
              }
              onClick={() => setActive(0)}
            >
              My Collaborations
            </div>
            <div
              className={
                active === 1
                  ? "bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1"
                  : " bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer "
              }
              onClick={() => setActive(1)}
            >
              Archived
            </div>
          </div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-1 lg:gap-[48px]">
            {collaborations && collaborations.map((item, index) => (
              <CollaborationCard key={index} collaboration={item} index={index} />
            ))}
          </div>
        </div>
      )}


      {!collaborations && (<CustomizedProgressBars/>)}

      {collaborations && collaborations.length < 1 && 'You dont have any collaborations yet'}
    </div>
  );
};

export default MyCollaborations;
