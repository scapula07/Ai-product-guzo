import { MoreHoriz } from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const CollaborationOwnerView = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
       <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
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
              mr: 3,
              ":hover": {
                bgcolor: "white",
                color: "#24A0FD",
              },
            }}
          >
            Back
          </Button>
          Juneteenth Festival
        </div>
        <div>
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "14px",
              width: {sm:"165px", xs:'fit'},
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
          >
            Edit Collaboration
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
            Collaboration
          </div>
          <div
            className={
              active === 1
                ? "bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1"
                : " bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer "
            }
            onClick={() => setActive(1)}
          >
            Request Responses
          </div>
        </div>

        <div className="md:grid grid-cols-5 md:gap-4">
          <div className="md:col-span-2">
            <div className="md:shadow-lg py-[18px] px-[17px]">
              <div>
                {" "}
                <Avatar
                  variant="square"
                  src="/logo2.png"
                  sx={{ width: "100%", height: "180px" }}
                />
              </div>
              <div className="text-center font-[500] mt-[15px]">
                Juneteenth Festival
              </div>
              <div className="text-[14px] font-bold mt-[6px] text-center text-[#114369] ">
                The Time
              </div>

              <div className="flex justify-between mt-2 text-[12px]  text-[#114369] font-semibold ">
                <div>December 22, 2023 </div>
                <div>7:00PM</div>
              </div>

              <div className="flex justify-between mt-2 text-[12px]  text-[#114369] font-semibold">
                <div>December 22, 2023 </div>
                <div>7:00PM</div>
              </div>

              <div className="text-[14px] font-bold mt-[6px] text-center text-[#114369] ">
                The Location
              </div>

              <div className=" mt-2 text-[12px]  text-[#114369]  font-semibold ">
                <div>DeLuxe Theater </div>
                <div> 3303 Lyons Avenue</div>
                <div>Houston, TX 77020</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 bg-white md:shadow-lg shadow-gray-400 p-3 md:rounded-[20px] ">
            <div className="text-center  text-[14px] font-bold flex justify-center mt-4 text-[#114369] ">
              Description
            </div>

            <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
              Lorem ipsum dolor sit amet, consectetur at amet, consectetur
              adipiscing elit. Sed senectus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed senectus duis diam Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed senectus. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed senectus
              duis diam Lorem ipsum dolor sit amet,
            </div>

            <div className="text-center  text-[14px] font-bold flex justify-center mt-4 text-[#114369] ">
              The Need
            </div>

            <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
              Lorem ipsum dolor sit amet, consectetur at amet, consectetur
              adipiscing elit. Sed senectus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed senectus duis diam Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed senectus. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed senectus
              duis diam Lorem ipsum dolor sit amet,
            </div>

            <div className="text-center  text-[14px] font-bold flex justify-center mt-4 text-[#114369] ">
              Support Links
            </div>

            <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
              Check out a sample marketing assest that we are sharing with Fifth
              Ward community members.
              <div className="underline text-[#24A0FD]">Canva Link.</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[#114369] text-[14px] font-semibold mt-9 mb-5">
            Collaboration Partners
          </div>
          <div className="md:flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <Avatar src="/logo3.png" sx={{ width: "53px", height: "53px" }} />

              <div>
                <div className="text-black text-[14px] font-bold">PNC Bank</div>
                <div className="text-black text-[10px] font-thin   ">
                  The PNC Financial Services Group, Inc. is an American bank
                  holding company and financial services corporation based in
                  Pittsburgh, Pennsylvania.
                </div>
              </div>
            </div>

            <div className="flex  items-center space-x-2 md:space-x-5">
              <div className=" md:mt-0  ">
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
                >
                  Direct Message
                </Button>
              </div>

              <div>
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
                  <MoreHoriz 
                   id="basic-button"
                   aria-controls={open ? "basic-menu" : undefined}
                   aria-haspopup="true"
                   aria-expanded={open ? "true" : undefined}
                   onClick={handleClick}
                  />
                  <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 2,
                sx: {
                  overflow: "visible",
                  width: "220px",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: { lg: "45%", xs: "45%" },
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "center", vertical: "top" }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <MenuItem sx={{ fontSize: "13px", px: "35%" }}>
               Send Email
              </MenuItem>
              <MenuItem sx={{ fontSize: "13px", px: "24%" }}>
                Send Text Message
              </MenuItem>
              <Divider sx={{ mx: "6%", my: "1px" }} />
              <MenuItem sx={{ fontSize: "13px", px: "12%", color: "red" }}>
                Remove From Collaboration
              </MenuItem>
            </Menu>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationOwnerView;
