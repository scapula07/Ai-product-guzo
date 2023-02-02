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
import DeleteTeammateModal from "../molecules/DeleteTeammateModal";

const Teammates = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteTeammateModal, setOpenDeleteTeammateModal] =
    React.useState(false);
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
      borderRadius: "20rem",
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
      <DeleteTeammateModal
        open={openDeleteTeammateModal}
        setOpen={setOpenDeleteTeammateModal}
      />
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Teammates
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
            onClick={()=>navigate('/dashboard/teammates/add')} 
          >
            Add Teammates
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="md:flex justify-center  md:space-x-4">
        <div className=" shadow-lg  rounded-[2rem] pt-1 mx-2 md:mx-0 ">
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

      <div className="mt-[5vw] space-y-[5vw] md:space-y-[15px] ">
        <div className="flex items-end">
          <Avatar
            variant="square"
            src="/woman.png"
            sx={{ width: "90", height: "90", borderRadius: "5px" }}
          />

          <div className="ml-6  flex-1">
            <div className=" font-bold text-[14px]  ">
              Kathy Payton ,
              <div className=" md:hidden font-thin text-[12px]"> Owner </div>
            </div>
            <div className="flex items-center justify-between md:w-[40vw] w-[50vw] ">
              <div className="hidden md:block font-thin text-[12px]">
                {" "}
                Owner{" "}
              </div>
              <div className="font-thin text-[12px]"> 24, Nov 2022 </div>
              <div className=" font-bold text-[10px] bg-[#EBF1F5] w-fit text-[#818181] px-4 py-[2px] rounded-md border-[#818181] border-[1px] ">
                {" "}
                Pending{" "}
              </div>
            </div>
          </div>

          <div>
            <div
              className="border-[1px] border-[#24A0FD] p-1 rounded-lg cursor-pointer"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHoriz sx={{ color: "#24A0FD" }} />
            </div>
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
              <MenuItem sx={{ fontSize: "10px", px: "15%" }}>
                Edit Teammate Status
              </MenuItem>

              <Divider sx={{ mx: "6%", my: "1px" }} />
              <MenuItem
                sx={{ fontSize: "10px", px: "25%", color: "red" }}
                onClick={() => setOpenDeleteTeammateModal(true)}
              >
                Delete teammate
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="flex items-end">
          <Avatar
            variant="square"
            src="/woman.png"
            sx={{ width: "90", height: "90", borderRadius: "5px" }}
          />

          <div className="ml-6  flex-1">
            <div className=" font-bold text-[14px]  ">
              Kathy Payton ,
              <div className=" md:hidden font-thin text-[12px]"> Owner </div>
            </div>
            <div className="flex items-center justify-between md:w-[40vw] w-[50vw] ">
              <div className="hidden md:block font-thin text-[12px]">
                {" "}
                Owner{" "}
              </div>
              <div className="font-thin text-[12px]"> 24, Nov 2022 </div>
              <div className=" font-bold text-[10px] bg-[#B9F6CA] w-fit text-[#2d7e57] px-4 py-[2px] rounded-md border-[#00C853] border-[1px] ">
                {" "}
                Connected{" "}
              </div>
            </div>
          </div>

          <div>
            <div className="border-[1px] border-[#24A0FD] p-1 rounded-lg">
              <MoreHoriz sx={{ color: "#24A0FD" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teammates;
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
