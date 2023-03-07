import { Circle, MoreHoriz, SearchOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import DeleteTeammateModal from "../molecules/DeleteTeammateModal";
import moment from 'moment'

const Teammates = () => {
  const [community, setCommunity] = useState(JSON.parse(localStorage.getItem("community")) || null)
  const [loader, setLoader ] = useState()
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [users, setUsers] = useState(null)
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

  const getAllUsers = async () => {
    setLoader(true)
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/user")
      .then((res) => {
        setUsers(res.data)
       setLoader(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers()
  }, [])
  
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
        {/* <div className=" shadow-lg  rounded-[2rem] pt-1 mx-2 md:mx-0 ">
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
        </div> */}

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

      {loader ? (
        <div className="flex items-center"> 
        <CircularProgress sx={{ color: '#24A0FD' }} />
        </div>
      ): (
        <div className="mt-[5vw] space-y-[5vw] md:space-y-[15px] ">
       

       {users && users.map((item,index)=> 
      {
        
        if(item.communities.find(e=> e.id == community._id)){
          return(
            <div className="flex items-end" key={index}>
            <Avatar
              variant="square"
              sx={{ width: "90", height: "90", borderRadius: "5px" }}
            >{item.username.substr(0,1)}</Avatar>
   
            <div className="ml-6  flex-1">
              <div className=" font-bold text-[14px]  ">
                {item.username}
                {/* <div className=" md:hidden font-thin text-[12px]"> Owner </div> */}
              </div>
              <div className="flex items-center justify-between md:w-[40vw] w-[50vw] ">
                <div className=" md:block font-thin text-[12px]">
                  {" "}
                  {community.user_id === item._id ? 'Owner' : 'Admin'}{" "}
                </div>
                {/* <div className="font-thin text-[12px]"> {moment(item.createdAt).format("D, m, Y")} </div> */}
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
          )
        }
      }
       )}
      </div>
      )}
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
