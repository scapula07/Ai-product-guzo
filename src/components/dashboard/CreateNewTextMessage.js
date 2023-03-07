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
  CircularProgress,
  Divider,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

const CreateNewTextMessage = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contactGroupLoader, setContactGroupLoader] = useState(true)
  const [senderPhoneNumbers, setSenderPhoneNumbers] = useState([
   {
    label:"+18337952227",
    value: "+18337952227"
   }
  ])

  const [sender, setSender] = useState(null)
  const [message, setMessage] = useState("")
  const [name, setName]  = useState("")
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
  const navigate = useNavigate()

  const [contactGroups,setContactGroups] = useState(null)
  const [loader, setLoader] = useState(false)


  const getContactGroups = async() =>{
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/contact/"+JSON.parse(localStorage.getItem("community"))._id)
      .then((res) => {
       console.log(res.data)
       setContactGroups(res.data)
       setContactGroupLoader(false)
       
      })

      .catch((err) => {
        console.log(err);
      });
  }

  const sendTextMessage = async() =>{
    setLoader(true)
    let url = process.env.REACT_APP_BACKEND_URL;
    console.log(sender,
      message,
      selectedCategory)
    axios
      .post(url + "/contact/send-message/",{
          sender:sender.value,
          message,
          contact_group : selectedCategory,
          campaign_name : name,
          user_id: JSON.parse(localStorage.getItem("user"))._id,
          community_id: JSON.parse(localStorage.getItem("community"))._id

      })
      .then((res) => {
       console.log(res.data)
       setLoader(false)
       setName("")
       setSender("")
       setMessage("")
       setSelectedCategory(null)
       
      })

      .catch((err) => {
        console.log(err);
        setLoader(false)
      });
  }
  useEffect(() => {
    getContactGroups()
  
    
  }, [])
  
  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Create New Text Messages
        </div>
        <div className="lg:space-x-4 ">
          <Button
            sx={{
              bgcolor: "white",
              color: "#24A0FD",
              fontSize: "14px",
              border: "1px solid #24A0FD",
              width: { sm: "fit", xs: "fit" },
              textTransform: "none",
              px: 3,
              mx: {xs: 1 , lg:0},
              borderRadius: "5px",
              ":hover": {
                bgcolor: "white",
                color: "#24A0FD",
              },
            }}
            onClick={()=>navigate('/dashboard/textmessages')}
          >
            Cancel
          </Button>

          <Button
            sx={{
              bgcolor: "white",
              color: "#24A0FD",
              fontSize: "14px",
              border: "1px solid #24A0FD",
              width: { sm: "fit", xs: "fit" },
              textTransform: "none",
              borderRadius: "5px",
              px: 3,
              mx: {xs: 1 , lg:0},
              ":hover": {
                bgcolor: "white",
                color: "#24A0FD",
              },
            }}
          >
            Save as Draft
          </Button>
          {loader ? (<CircularProgress/>): (
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

            onClick={sendTextMessage}
          >
            Save and Send
          </Button>
          )}
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="space-y-2 mt-4">
        <div className="text-[#114369] font-semibold text-[14px] ">
          Name your campaign
          <span className="text-black font-thin text-[10px] "></span>
        </div>
        <div>
          <InputBase
            sx={{
              bgcolor: "#EBF1F5",
              pl: 3,
              fontSize: "14px",
              borderRadius: "8px",
              width: { md: "800px", xs: "100%" },
              py: 1,
            }}
            placeholder="Fifth Ward CommUNITY Message"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <div className="text-[#114369] font-semibold text-[14px] ">
         Build your campaign
          <span className="text-black font-thin text-[10px] "></span>
        </div>
        
        <div className="bg-[#EBF1F5] px-4 py-3 rounded-[5px] space-y-2">
            <div className="text-[14px]" > To{" "} <span className="text-black font-thin text-[12px] ">(Select your recipient Group(s)) </span></div>
           {contactGroupLoader ? (

            <CircularProgress/>
           )
            : (
              <ReactSelect
              styles={style}
              placeholder="Select your contact groups(s)"
              options={contactGroups.map((item,index)=> ({label: item.name, value: item._id,contact_length: item.contacts.length,contacts: item.contacts}))}
            defaultOptions={contactGroups.map((item,index)=> ({label: item.name, value: item._id,contact_length: item.contacts.length,contacts: item.contacts}))}
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
                console.log(opt)
                setSelectedCategory(opt);
              }}
            />
            )
           }

          <div className="text-[10px] font-semibold"  >Audience Size: {selectedCategory?.contact_length ? selectedCategory.contact_length : 0} </div>
        </div>


        <div className="bg-[#EBF1F5] px-4 py-3 rounded-[5px] space-y-2">
            <div  className="text-[14px]"> From{" "} <span className="text-black font-thin text-[12px] ">(Sender Details) </span></div>
            <ReactSelect
            styles={style}
            placeholder="Select a phone number"
            options={senderPhoneNumbers}
            defaultOptions={senderPhoneNumbers}
            value={sender}
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
              setSender(opt);
            }}
          />

        </div>



        <div className="bg-[#EBF1F5] px-4 py-3 rounded-[5px] space-y-2">
            <div  className="text-[14px]"> Message{" "} <span className="text-black font-thin text-[12px] ">(Your SMS Content)  </span></div>
            <InputBase
            sx={{
              bgcolor: "white",
              pl: 3,
              fontSize: "14px",
              borderRadius: "8px",
              width: { md: "800px", xs: "100%" },
              py: 1,
            }}
            multiline
            rows={5}
            placeholder="Your SMS Message here..."
            value={message}
            onChange={(e)=> {
              setMessage(e.target.value)
            }}
          />

          <div className="text-[10px] font-semibold flex space-x-6"  >
            <div>Character Count : {message ? message.length : 0}</div>
            {/* <div> Number of message : 1</div> */}
            <div>Credits Used : 0</div>
          </div>
        </div>


        {/* <div className="bg-[#EBF1F5] px-4 py-3 rounded-[5px] space-y-2">
            <div  className="text-[14px]"> Schedule your Text Message Campaign </div>
            <ReactSelect
            styles={style}
            placeholder="Send now or select your date/time"
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

      </div>
    </div>
  );
};

export default CreateNewTextMessage;
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
