import {
  Circle,
  Notifications,
  NotificationsActiveSharp,
  NotificationsOutlined,
  Search,
  SearchOutlined,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Badge,
  Divider,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardResponsive from "./DashboardResponsive";

const DashboardHeader = ({ community, setCommunity, setLoader }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between lg:px-[97px] px-2 py-1 lg:py-[21px] ">
        <div className="md:hidden">
          <MenuIcon onClick={() => setOpenSideMenu(true)} />
          <DashboardResponsive
            open={openSideMenu}
            setOpen={setOpenSideMenu}
            community={community}
            setCommunity={setCommunity}
            setLoader={setLoader}
          />
        </div>
        <div className="">
          <img
            src="/logo.png"
            className="lg:w-[172px] lg:h-[64px] w-[50px] h-[20px] cursor-pointer "
          />
        </div>
        <div className="hidden md:block lg:block">
          <InputBase
            sx={{
              bgcolor: "white",
              borderRadius: "62px",
              px: 4,
              width: { sm: "400px", lg: "570px", xs: "300px" },
              py: "10px",
            }}
            placeholder="Search..."
            endAdornment={
              <SearchOutlined sx={{ fontWeight: "300", cursor: "pointer" }} />
            }
          />
        </div>

        <div className="flex items-center  lg:space-x-[83px] space-x-3   ">
          {/* <div>
            <div className="relative cursor-pointer">
              <NotificationsOutlined
              onClick={()=> navigate('/dashboard/notifications')}
                sx={{
                  fontSize: { lg: "50px", xs: "25px" },
                  strokeWidth: "1px",
                  stroke: "#EBF1F5",
                  strokeWidth: 1,
                }}
              />
              <div className="absolute bottom-4 lg:bottom-7 lg:left-9 left-4 lg:text-sm text-[10px] bg-[#24A0FD] text-white px-[5px] rounded-full ">
                5
              </div>
            </div>
          </div> */}
          <div>
            <Avatar
              sx={{
                border: "1px solid black",
                width: { lg: "54px", xs: "34px" },
                height: { lg: "54px", xs: "34px" },
                cursor: "pointer",
                bgcolor: '#24A0FD',
                fontSize:{lg:'22px',xs:'14px'}
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              // src={JSON.parse(localStorage.getItem("user"))?.picture}
            >
              {JSON.parse(localStorage.getItem("user"))?.username
                ? JSON.parse(localStorage.getItem("user"))?.username.substr(
                    0,
                    1
                  )
                : JSON.parse(localStorage.getItem("user"))?.first_name?.substr(
                    0,
                    1
                  ) +
                  JSON.parse(localStorage.getItem("user"))?.last_name?.substr(
                    0,
                    1
                  )}
            </Avatar>
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
                  width: "190px",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  bgcolor:'rgb(249,250,251)',
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
                    right: { lg: "45%", xs: "3%" },
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
              {/* <MenuItem sx={{ fontSize: "13px", px: "25%" }}>
                View Profile
              </MenuItem>
              <MenuItem sx={{ fontSize: "13px", px: "14%" }}>
                Account Settings
              </MenuItem> */}
              {/* <Divider sx={{ mx: "6%", my: "1px" }} /> */}

              <div className="justify-center flex bg-white relative bottom-[6px] py-3">
              
              <div className="bg-[#24A0FD] text-white p-3 rounded-full px-4 text-[20px] z-50">
              {JSON.parse(localStorage.getItem("user"))?.username
                ? JSON.parse(localStorage.getItem("user"))?.username.substr(
                    0,
                    1
                  )
                : JSON.parse(localStorage.getItem("user"))?.first_name?.substr(
                    0,
                    1
                  ) +
                  JSON.parse(localStorage.getItem("user"))?.last_name?.substr(
                    0,
                    1
                  )}
              </div>


              </div>

              <div className="bg-gray-50 relative bottom-3 text-black text-[15px] py-3 space-y-1 -z-10">
                <div className=" text-center  ">
                  {JSON.parse(localStorage.getItem("user"))?.first_name +" "+
                  JSON.parse(localStorage.getItem("user"))?.last_name}
                </div>

                <div className=" text-center text-[12px] ">
                  {JSON.parse(localStorage.getItem("user"))?.email}
                </div>


                <div className=" text-center text-[12px] ">
                  <Circle sx={{ color:'green', fontSize:'7px'}}/> {JSON.parse(localStorage.getItem("community"))?.name}
                  <br/>
                  <span className="text-[9px]">(Active Community)</span>
                </div>

              </div>
              <MenuItem
                sx={{ fontSize: "13px", px: "35%", color: "red" }}
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("community");
                  setTimeout(() => {
                    navigate("/auth/login");
                  }, 2000);
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-4 md:hidden lg:hidden">
        <InputBase
          sx={{
            bgcolor: "white",
            borderRadius: "62px",
            px: 4,
            width: { sm: "400px", lg: "570px", xs: "300px" },
            py: "6px",
          }}
          placeholder="Search..."
          endAdornment={
            <SearchOutlined sx={{ fontWeight: "300", cursor: "pointer" }} />
          }
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
