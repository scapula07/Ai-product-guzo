import { CalendarMonth, Dashboard, Language, MoreHoriz, People, Person } from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()
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
           onClick={()=> navigate('/dashboard/create-collaboration')}
          >
            Create Collaboration
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="mt-[30px] text-[12px] ">
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
            Partner Network
          </div>
        </div>

        {active === 0 && (
          <>
           <div className="bg-white shadow-lg shadow-gray-200 rounded-3xl p-4 " >
            <div className=" lg:ml-9 lg:flex items-center lg:space-x-[18rem] text-[17px] mb-4" >
                <div className="font-bold" >DeLuxe Theater</div>
                <div className="font-thin" >HCAS Art Exhibition</div>
            </div>

            <div className="lg:flex items-start space-y-5 lg:space-y-0 lg:space-x-8">
                <Avatar sx={{ width: {xs:'100%',sm:'240px'}, height:'180px',borderRadius:'1rem' }} variant='square' src='/wow.png' />

                <div className="text-[#114369]" >
                    <div className="font-bold" >Description</div>
                    <div className="font-thin mb-3" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed senectus duis diam Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed senectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed senectus duis diam Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </div>

                    <div className="font-bold">The Ask</div>
                    <div className="font-thin">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed senectus duis diam Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed senectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Sed senectus duis diam Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </div>
                </div>
            </div>
           </div>
          </>
        )}

        {active === 1 && (
          <>
            <div className=" bg-[#FAFAFA] p-5 ">


                <div className="font-bold text-[15px] my-4" >5th Ward CRC</div>

                <div> <span className="font-bold text-[#24A0FD] mr-3">
                     <Dashboard sx={{ fontSize: ''}} /> Category: 
                     </span>
                     <span>Organization Resource, Neighborhood Resource, Connector</span>  </div>

                <div className="flex items-start">
                    <Avatar variant="square" src='logo1.png' sx={{ height: '' , width:'' }}/>   
                    <div className=" font-thin " >
                    Organized in 1989, Fifth Ward Community Redevelopment Corporation (Fifth Ward CRC), a NeighborWorks America 
                    affiliate, is designed to foster holistic community development. Fifth Ward CRC seeks to enhance the quality of
                     life for individuals and families in the community, eliminate blight, attract investment and resources, encourage
                      commercial and business development, coordinate government and public service, and offer a sense of destination and
                       creative place-making. Discover the opportunity 
                    to build up and preserve 5th Ward to achieve a healthy and vibrant community for all..... see more.
                    </div>
                </div>


                <Divider sx={{ my: 3 }} />

                <div className="grid lg:grid-cols-4 gap-6">
                    <div className="flex flex-wrap items-center space-x-2">
                        <div className="font-bold text-[#24A0FD]" ><People sx={{ fontSize:''}} /> Members : </div> 
                         <div> 10,256 Members</div>
                    </div>

                    <div className="flex  items-center space-x-2    ">
                        <div className="font-bold text-[#24A0FD] flex items-center "><Language sx={{ fontSize:'', mr: 1}} /> Community Platform :</div> 
                         <div> Facebook, Intagram, Website, Email list, Text Message List</div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="font-bold text-[#24A0FD]"><CalendarMonth sx={{ fontSize:''}} /> Creation Date: </div> 
                         <div>12 Sep 2019</div>
                    </div>

                    <div className="flex items-center space-x-2 ">
                        <div className="font-bold text-[#24A0FD]"><Person sx={{ fontSize:''}}/> Owner : </div> 
                         <div>Alex Devis</div>
                    </div>
                </div>


                <div className="flex justify-end mt-2" >
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
                </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Discover;
