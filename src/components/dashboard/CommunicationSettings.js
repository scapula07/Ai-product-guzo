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

const CommunicationSetting = () => {
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
          Communication Settings
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="w-full cursor-pointer hover:opacity-70" >
          <div className="bg-[#24A0FD] w-full h-[140px] rounded-lg " />
          <div className="text-center "> Text Message Settings</div>
        </div>

        <div className="w-full cursor-pointer hover:opacity-70" >
          <div className="bg-[#F9A0A0] w-full h-[140px] rounded-lg " />
          <div className="text-center "> Email Settings</div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationSetting;
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
