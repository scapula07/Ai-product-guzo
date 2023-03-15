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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ErrorSnack from "../molecules/ErrorSnack";
import SuccessSnackbar from "../molecules/SuccessSnackbar";

const AddTeammates = () => {
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [email, setEmail] = useState("")
  const [msg, setMsg] =useState("")
  const [loader, setLoader] = useState(false)
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

  const addTeammate = async() => {
    let url = process.env.REACT_APP_BACKEND_URL;
    if(email.length < 1){
      return
    }
    setLoader(true)
    axios
      .post(url + "/team/send-invite/",{
        community_id: JSON.parse(localStorage.getItem("community"))._id,
        community_name : JSON.parse(localStorage.getItem("community")).name,
        reciever: email
      })
      .then((res) => {
       console.log(res.data)
       setLoader(false)
      if(res.data.msg !== 'sent'){
        setMsg(res.data.msg)
        setOpenErrorSnack(true)
      }else{
        setOpenSuccessSnack(true)
        setEmail("")
        setTimeout(() => {
          navigate('/dashboard/teammates')
        }, 2000);
      }

      
       
      })

      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
       <SuccessSnackbar msg={'Invite sent successfully'} duration='10000' 
      open={openSuccessSnack} setOpen={setOpenSuccessSnack}  />
      <ErrorSnack msg={msg} duration='10000' 
      open={openErrorSnack} setOpen={setOpenErrorSnack}  />
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
         Add Teammate
        </div>
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
            onClick={()=>navigate('/dashboard/teammates')} 
          >
            Cancel
          </Button>
         {loader ? (
          <CircularProgress sx={{ position: 'relative', top: 3}} />

         ): (
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
          onClick={addTeammate}
        >
          Invite and Close
        </Button>
         )}
        </div>
      </div>

      <Divider sx={{ my: 3 }} />


      {/* <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Name{" "} <span className="text-black font-thin text-[12px] ">(Required)</span>
            <span className="text-black font-thin text-[10px] ">
              
            </span>
          </div>
          <div className="md:flex items-center md:space-x-2 space-y-2 md:space-y-0 ">
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="First Name"
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Last Name"
            />
          </div>
          </div>
        </div> */}


        <div className="space-y-2 mt-4">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Email{" "} <span className="text-black font-thin text-[12px] ">(Required)</span>
            <span className="text-black font-thin text-[10px] ">
              
            </span>
          </div>
          <div>
            <InputBase
            value={email}
            onChange={(e)=> {
              setEmail(e.target.value)
            }}
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "800px", xs: "100%" },
                py: 1,
              }}
              placeholder="Add your teammates email here to send the invite..."
            />
          </div>

         
          </div>


          {/* <div className="space-y-2 mt-4">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Teammate Role{" "} <span className="text-black font-thin text-[12px] ">(Required)</span>
            <span className="text-black font-thin text-[10px] ">
              
            </span>
          </div>
          <div className="  pt-1 mx-2 md:mx-0 ">
          <ReactSelect
            styles={style}
            placeholder="Select Role"
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

         
          </div> */}
    </div>
  );
};

export default AddTeammates;
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
