import { Circle, MoreHoriz, SearchOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import CreateContactGroupModal from "../molecules/CreateContactGroupModal";
import DeleteTeammateModal from "../molecules/DeleteTeammateModal";

const ContactGroups = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCreateContactGroupModal, setOpenCreateContactGroupModal] =
    useState(false);
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
      border: "0px transparent ",
      borderRadius: "2rem",
      width: "100%",
      boxShadow: "none",
      backgroundColor: "white",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "fit",
      },
    }),
  };

  const navigate = useNavigate()
  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
      <CreateContactGroupModal
        open={openCreateContactGroupModal}
        setOpen={setOpenCreateContactGroupModal}
      />
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div>
          <Button
            sx={{
              bgcolor: "white",
              color: "#24A0FD",
              border: "1px solid #24A0FD",
              fontSize: "14px",
              width: { sm: "fit", xs: "fit" },
              px: 3,
              textTransform: "none",
              borderRadius: "5px",
              mr: 5,
              ":hover": {
                bgcolor: "white",
                color: "#24A0FD",
              },
            }}
            onClick={()=>navigate('/dashboard/contacts')}
          >
            Back
          </Button>
        </div>
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Go Neighborhoods Contact Group
        </div>
        <div>
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
            onClick={()=>navigate('/dashboard/contacts/go-neighborhood/create-contact')}
          >
            Create New Contact Group
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="md:flex justify-center  md:space-x-4">
        <div className=" shadow-lg  rounded-[1rem] pt-1 mx-2 md:mx-0 ">
          <ReactSelect
            styles={style}
            placeholder="Sort By"
            options={cats}
            defaultOptions={cats}
            value={selectedCategory}
            menuPlacement="auto"
            menuPosition="fixed"
            noOptionsMessage={(opt) => {
              if (opt.inputValue === "") {
                return "Sort By";
              } else {
                return "no search results for " + opt.inputValue;
              }
            }}
            components={{
              IndicatorSeparator: () => null,
            }}
            onChange={(opt) => {
              setSelectedCategory(opt);
            }}
          />
        </div>

        <div className=" md:block lg:block mt-2 md:mt-0">
          <InputBase
            sx={{
              bgcolor: "#EBF1F5",
              borderRadius: "62px",
              px: 4,
              width: { sm: "400px", lg: "300px", xs: "300px" },
              py: "5px",
            }}
            placeholder="Search..."
            endAdornment={
              <SearchOutlined sx={{ fontWeight: "300", cursor: "pointer" }} />
            }
          />
        </div>
      </div>

      <div className="space-y-3 mt-7 mb-20">
        <div className="flex items-center">
          <Avatar
            variant="circular"
            src=""
            sx={{
              bgcolor: "blue",
              width: "45px",
              height: "45px",
            }}
          >
            C1
          </Avatar>

          <div className="font-semibold text-[14px] ml-3 flex-1">Contact#1</div>

          <div className="border-[1px] border-[#24A0FD] p-1 rounded-lg cursor-pointer">
            <MoreHoriz
              sx={{ color: "#24A0FD" }}
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
                  width: "140px",
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
                    right: { lg: "45%", xs: "10%" },
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
              <MenuItem sx={{ fontSize: "10px", px: "30%" }}>
                Edit Contact
              </MenuItem>

              <MenuItem sx={{ fontSize: "10px", px: "27%" }}>
                Share Contact
              </MenuItem>

              <Divider sx={{ mx: "6%", my: "1px" }} />
              <MenuItem sx={{ fontSize: "10px", px: "23%", color: "red" }}>
                Remove Contact
              </MenuItem>
            </Menu>
          </div>
        </div>

        <Divider />

        <div className="flex items-center">
          <Avatar
            variant="circular"
            src=""
            sx={{
              bgcolor: "green",
              width: "45px",
              height: "45px",
            }}
          >
            C2
          </Avatar>

          <div className="font-semibold text-[14px] ml-3 flex-1">Contact#2</div>

          <div className="border-[1px] border-[#24A0FD] p-1 rounded-lg cursor-pointer">
            <MoreHoriz
              sx={{ color: "#24A0FD" }}
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
                  width: "140px",
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
                    right: { lg: "45%", xs: "10%" },
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
              <MenuItem sx={{ fontSize: "10px", px: "30%" }}>
                Edit Contact
              </MenuItem>

              <MenuItem sx={{ fontSize: "10px", px: "27%" }}>
                Share Contact
              </MenuItem>

              <Divider sx={{ mx: "6%", my: "1px" }} />
              <MenuItem sx={{ fontSize: "10px", px: "23%", color: "red" }}>
                Remove Contact
              </MenuItem>
            </Menu>
          </div>
        </div>

        <Divider />
      </div>
    </div>
  );
};

export default ContactGroups;
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
