import {
    Circle,
    Filter,
    FilterAlt,
    FilterAltOutlined,
    KeyboardArrowDown,
    Launch,
    MoreHoriz,
    SearchOutlined,
  } from "@mui/icons-material";
  import {
    Avatar,
    Button,
    Divider,
    InputBase,
    Menu,
    MenuItem,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import ReactSelect from "react-select";
  
  const Notifications = () => {
    const [active, setActive] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openSideMenu, setOpenSideMenu] = React.useState(false);
    const open = Boolean(anchorEl);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const style = {
      control: (base) => ({
        ...base,
        border: "0px #EBF1F5 ",
        borderRadius: "10px",
        paddingTop: 2,
        paddingBottom: 2,
        width: "100%",
        boxShadow: "none",
        backgroundColor: "white",
        fontSize: "14px",
        "@media (min-width:600px)": {
          width: "400px",
        },
      }),
    };
    return (
      <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
        <div className="md:flex space-y-2 md:space-y-0 items-center">
          <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
           Notifications
          </div>
        </div>
  
        <Divider sx={{ my: 3 }} />
  
        <div className="space-y-3">
              <div className="flex items-center">
                <Avatar
                  variant="circular"
                  src="/logo3.png"
                  sx={{
                    bgcolor: "",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  G
                </Avatar>

                <div className="font-semibold text-[14px] ml-3 flex-1">
                 <div>LISC</div>
                 <div className="font-thin text-[12px]" >Fifth Ward CRC is connected to LISC</div>
                </div>

                <div className=" p-1 rounded-lg cursor-pointer">
                <Button
              sx={{
                bgcolor: "#24A0FD",
                color: "white",
                fontSize: "14px",
                width: { sm: "fit", xs: "fit" },
                textTransform: "none",
                borderRadius: "5px",
                px: 3,
                mx: {xs: 1 , lg:0},
                mt: {xs: 2 , lg:0},
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
            >Message
            </Button>
                </div>
              </div>
              <Divider/>

             
            </div>
      </div>
    );
  };
  
  export default Notifications;
  const cats = [
    {
      label: "category 1",
      value: 1,
    },
    {
      label: "category 2",
      value: 2,
    },
  ];
  