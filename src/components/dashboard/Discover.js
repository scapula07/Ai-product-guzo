import {
  CalendarMonth,
  Dashboard,
  Language,
  MoreHoriz,
  People,
  Person,
} from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";

const Discover = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const [communities, setCommunities] = useState(null);
  const [users, setUsers] = useState(null);
  const open = Boolean(anchorEl);
  const [collaborations, setCollaborations] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCommunities = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    setLoader(true);
    axios
      .get(url + "/community")
      .then((res) => {
        // console.log(res.data);
        setCommunities(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const getCollaborations = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/collaboration/all-collabs")
      .then((res) => {
        console.log(res.data);
        setCollaborations(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCollaborations();
  }, []);

  useEffect(() => {
    getCommunities();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Discover
        </div>
        <div>
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "14px",
              width: { sm: "165px", xs: "fit" },
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
            onClick={() => navigate("/dashboard/create-collaboration")}
          >
            Create Collaboration
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      {loader ? (
        <div className="flex justify-center">
          {" "}
          <CustomizedProgressBars />{" "}
        </div>
      ) : (
        <div className="mt-[30px] text-[12px]  ">
          <div className="flex justify-center items-center text-[14px] space-x-[20px] mb-[20px] md:mb-[50px] ">
            <div
              className={
                active === 0
                  ? "bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1 "
                  : " bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer "
              }
              onClick={() => setActive(0)}
            >
              Collaboration Feed
            </div>
            <div
              className={
                active === 1
                  ? "bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1"
                  : " bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer "
              }
              onClick={() => setActive(1)}
            >
              Organizations
            </div>
          </div>
          <div className="h-[800px] overflow-y-auto">
            {active === 0 && (
              <div>
                {communities &&
                  collaborations &&
                  collaborations.length > 0 &&
                  collaborations.map((item, index) => (
                    <div
                      className="  rounded-3xl p-4 bg-[#FAFAFA] my-4 cursor-pointer "
                      key={index}
                      onClick={() => {
                        window.open(
                          "https://app.guzo.io/collaboration/" +
                            item._id,
                          "_blank"
                        );
                      }}
                    >
                      <div className="flex items-center font-bold space-x-3">
                        <Avatar
                          sx={{
                            width: { xs: "40px", sm: "40px" },
                            height: "40px",
                            borderRadius: "0.4rem",
                          }}
                          variant="square"
                          src={item.community.profile_picture}
                        />

                        <div className="">{item.community.name}</div>
                      </div>
                      <div className=" lg:flex  lg:space-x-[18rem] text-[17px] mt-3 mb-3 cursor-pointer">
                        <div className="font-bold">{item.title}</div>
                      </div>

                      <div className="lg:flex items-start space-y-5 lg:space-y-0 lg:space-x-8">
                        <Avatar
                          sx={{
                            width: { xs: "100%", sm: "300px" },
                            height: "250px",
                            borderRadius: "0.4rem",
                          }}
                          variant="square"
                          src={item.photo}
                        />

                        <div className="text-[#114369]">
                          <div className="font-bold">Description</div>
                          <div className="font-thin mb-3">
                            {item.description}
                          </div>

                          <div className="font-bold">Ask</div>
                          <div className="font-thin">{item.need}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {active === 1 && (
              <>
                {communities &&
                  communities.length > 0 &&
                  communities.map((item, index) => (
                    <div
                      className=" bg-[#FAFAFA] rounded-3xl my-5 p-5 "
                      key={index}
                    >
                      {/* <div> <span className="font-bold text-[#24A0FD] mr-3">
               <Dashboard sx={{ fontSize: ''}} /> Category: 
               </span>
               <span>Organization Resource, Neighborhood Resource, Connector</span>  </div> */}
                      <div className="flex justify-between">
                        <div>
                          <div className="font-bold text-[15px] my-4">
                            {item._doc.name}
                          </div>
                          <div className="flex items-start">
                            <div className=" font-thin ">
                              {item._doc.description}
                            </div>
                          </div>
                        </div>

                        <Avatar
                          variant="square"
                          src={item._doc.profile_picture}
                          sx={{ height: "100px", width: "100px" }}
                        />
                      </div>

                      <Divider sx={{ my: 3 }} />

                      <div className="grid lg:grid-cols-4 gap-6">
                        <div className="flex flex-wrap items-center space-x-2">
                          <div className="font-bold text-[#24A0FD]">
                            <People sx={{ fontSize: "" }} /> Teammates :{" "}
                          </div>
                          <div>{item.teammates?.length}</div>
                        </div>

                        {/* <div className="flex  items-center space-x-2    ">
                          <div className="font-bold text-[#24A0FD] flex items-center ">
                            <Language sx={{ fontSize: "", mr: 1 }} /> Community
                            Platform :
                          </div>
                          <div>
                            {" "}
                            Facebook, Intagram, Website, Email list, Text
                            Message List
                          </div>
                        </div> */}

                        <div className="flex items-center space-x-2">
                          <div className="font-bold text-[#24A0FD]">
                            <CalendarMonth sx={{ fontSize: "" }} /> Creation
                            Date:{" "}
                          </div>
                          <div>
                            {moment(item._doc.createdAt).format("D MMM YYYY")}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ">
                          <div className="font-bold text-[#24A0FD]">
                            <Person sx={{ fontSize: "" }} /> Owner :{" "}
                          </div>
                          <div>
                            {item.owner?.username
                              ? item.owner.username
                              : item.owner?.first_name +
                                " " +
                                item.owner?.last_name}
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex justify-end mt-2">
                        <Button
                          sx={{
                            bgcolor: "#24A0FD",
                            color: "white",
                            fontSize: "14px",
                            width: { sm: "fit", xs: "fit" },
                            textTransform: "none",
                            borderRadius: "5px",
                            ":hover": {
                              bgcolor: "#24A0FD",
                              color: "white",
                            },
                          }}
                        >
                          View
                        </Button>
                      </div> */}
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
