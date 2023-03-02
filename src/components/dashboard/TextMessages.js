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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

const TextMessages = () => {
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
      backgroundColor: "#EBF1F5",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "400px",
      },
    }),
  };
  const navigate = useNavigate()

  const [loader, setLoader] = useState(true)
  const [textMessages,setTextMessages] = useState(null)

  const getTextMessages = async() =>{
    setLoader(true)
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/contact/text-messages/"+JSON.parse(localStorage.getItem("user"))._id)
      .then((res) => {
       console.log(res.data)
       setTextMessages(res.data)
       setLoader(false)
       
      })

      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTextMessages()
  }, [])
  
  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Text Messages
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
            onClick={()=>navigate('/dashboard/textmessages/create')}
          >
            Create New Text Message
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="flex items-center justify-between">
        <div className="font-bold">Text Message Campaign List</div>

        <div className="flex space-x-4 items-center">
          {/* <div>
            <InputBase
              sx={{
                bgcolor: "#FAFAFA",
                border: "1px solid #E6E6E6",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "fit", xs: "100px" },
                py: "2px",
              }}
              placeholder="Search artists"
              startAdornment={<SearchOutlined />}
            />
          </div>

          <div className="text-[12px] border-[1px] border-[#E6E6E6] py-1 rounded-lg px-1 cursor-pointer ">
            <FilterAltOutlined /> <span className="hidden lg:inline">Filter</span>
          </div> */}
        </div>
      </div>

      <div className="mt-[30px] text-[12px]  ">
        <div className="md:w-[55vw] lg:w-full w-[85vw] overflow-x-auto">
          <div className="md:w-[850px] lg:w-full w-[1000px] ">
            <div className="grid grid-cols-11  items-center divide-x  bg-[#24A0FD] text-white  px-3 ">
              <div className="relative">
                <div className="text-left">id</div>
                <div className="absolute right-0 top-[-2px] ">
                  <KeyboardArrowDown
                    sx={{ color: "white", stroke: "#24A0FD", strokeWidth: 1 }}
                  />
                </div>
              </div>

              <div className="col-span-2   py-2 pl-4">Company Name</div>

              <div className="col-span-2 py-2 pl-4">From</div>

              <div className="relative col-span-2 py-2">
                <div className="text-left">Status</div>
                <div className="absolute right-2 top-[6px] ">
                  <KeyboardArrowDown
                    sx={{ color: "white", stroke: "#24A0FD", strokeWidth: 1 }}
                  />
                </div>
              </div>

              <div className="col-span-2 py-2 pl-4">Audience</div>

              {/* <div className="col-span-2 py-2 text-center">Action</div> */}
            </div>

           {textMessages && textMessages.map((item,index)=> (
             <div className="grid grid-cols-11  items-center divide-x  bg-[#EBF1F5] text-black  px-3 "
             key={index}
             >
             <div className="relative">
               <div className="text-center">1</div>
             </div>

             <div className="col-span-2 py-2 pl-4">{item.campaign_name}</div>

             <div className="col-span-2 py-2 pl-4">The Great Community </div>

             <div className="col-span-2 py-2 flex justify-center">
               {item.status === 'sent' && (
                <div className="bg-[#e3ffcd] text-[#73e57b] border-[1px] border-[#73e57e] text-center font-bold w-fit px-7 ">
                Sent
              </div>
               )}
             </div>

             <div className="col-span-2 py-2 text-center">{item.contacts.length}</div>
             {/* <div className="col-span-2 py-2 text-center ">
               <Button
                 sx={{
                   bgcolor: "#24A0FD",
                   color: "white",
                   fontSize: "10px",
                   width: { sm: "fit", xs: "fit" },
                   textTransform: "none",
                   px: 5,
                   borderRadius: "5px",
                   ":hover": {
                     bgcolor: "#24A0FD",
                     color: "white",
                   },
                 }}
               >
                 Manage
               </Button>
             </div> */}
           </div>
           ))}

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default TextMessages;
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
