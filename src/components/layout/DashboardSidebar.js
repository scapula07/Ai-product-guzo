import {
    AccountCircleOutlined,
    AlternateEmail,
  Campaign,
  Chat,
  ChatBubble,
  ChatBubbleOutline,
  ChatBubbleOutlined,
  Contacts,
  Dashboard,
  Edit,
  ExpandMore,
  ForumOutlined,
  Groups3Outlined,
  Handshake,
  HandshakeOutlined,
  Settings,
  Visibility,
  VisibilityOutlined,
  WifiTethering,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import ReactSelect from "react-select";

const DashboardSidebar = ({community,setOpen, setCommunity, setLoader}) => {
  const [communities, setCommunities] = useState(
    JSON.parse(localStorage.getItem("user"))?.communities || null
  );
  const [selectedCommunity, setSelectedCommunity] = useState({label:JSON.parse(localStorage.getItem("community"))?.name||community?.name||null,value:JSON.parse(localStorage.getItem("community"))?._id||community?._id|| null,})
  const navigate = useNavigate()
  const style = {
    control: (base) => ({
      ...base,
      border: "0px solid gray",
      width: "100%",
      boxShadow: "none",
      backgroundColor: "#D1DEE7",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "1000px",
      },
      "@media (min-width:1200px)": {
        width: "210px",
      },
    }),
  };

  const getCommunity = async (comm_id) => {
    let url = process.env.REACT_APP_BACKEND_URL;
    setLoader(true)
    axios
      .get(url + "/community/get-community-by-id/" + comm_id)
      .then((res) => {
        setLoader(false)
        if (
          res.data &&
          Object.keys(res.data).length === 0 &&
          Object.getPrototypeOf(res.data) === Object.prototype
        ) {
          setCommunity(null);
          setLoader(false)
        } else {
          console.log(res.data);
          let community = res.data;
          localStorage.setItem("community", JSON.stringify(community));

          setCommunity({label: community?.name, value: community?._id});
          setLoader(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=> {
    setSelectedCommunity(community)
 },[community])


  return (
    <div className="bg-white px-[24px] py-[20px] space-y-[64px] lg:h-screen rounded-[18px] lg:shadow-lg">
      <div className="text-center text-[#114369] bg-[#D1DEE7] py-[21px] rounded-[16px]"
      onClick={()=> {
        //navigate('/dashboard/edit-community-profile')
        //setOpen(false)
      }}
      >

        <div className=" flex justify-center ">
            <ReactSelect
              styles={style}
              placeholder="Select community..."
              options={communities && communities.map((item,index)=> ({label:item.name,value:item.id}))}
              value={selectedCommunity}
              menuPlacement="auto"
              menuPosition="fixed"
              noOptionsMessage={(opt) => {
                if (opt.inputValue === "") {
                  return "type a category";
                } else {
                  return "no search results for " + opt.inputValue;
                }
              }}
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(opt) => {
                setSelectedCommunity(opt);
                getCommunity(opt.value)
              }}
            />
          </div>
      </div>

      

      <div className="text-center  bg-[#EBF1F5] py-[15px] rounded-[16px]">

        
        <div>

          
          <Accordion
            sx={{ bgcolor: "transparent" }}
            elevation={0}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <HandshakeOutlined sx={{ mr: 2, color: "#0075FF" }} />
              <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                Collaboration
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ mt: -1 }}>
              <div className="text-left space-y-2 text-[13px] pl-3 font-[300] ">

              <div className={window.location.pathname.match('/dashboard/create-community-profile/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                onClick={()=>{
                   navigate('/dashboard/create-community-profile')
                   setOpen(false)
                  }}
                >
                  
                  <Campaign sx={{ fontSize: "15px", mr: 1 }} />
                  Create Organization 
                </div>

                <div className={window.location.pathname.match('/dashboard/edit-community-profil/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                onClick={()=>{
                  navigate('/dashboard/edit-community-profile')
                  setOpen(false)
                }}
                >
                  
                  <Edit sx={{ fontSize: "15px", mr: 1 }} />
                  Edit Organization 
                </div>



                <div className={window.location.pathname.match('/dashboard/discover/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                onClick={()=> navigate('/dashboard/discover')}
                >
                  
                  <VisibilityOutlined sx={{ fontSize: "15px", mr: 1 }} />
                  Discover 
                </div>
                <div className={window.location.pathname.match('/dashboard/my-collaborations/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                 onClick={()=> {navigate('/dashboard/my-collaborations')
                 setOpen(false)
                }}
                >
                  
                  <HandshakeOutlined sx={{ fontSize: "15px", mr: 1 }} /> My
                  Collaborations
                </div>
                <div className={window.location.pathname.match('/dashboard/direct-messages/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                 onClick={()=> navigate('/dashboard/direct-messages')}
                >
                  
                  <ChatBubbleOutline sx={{ fontSize: "15px", mr: 1 }} /> Direct
                  Messages
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <Accordion
            sx={{ bgcolor: "transparent" }}
            elevation={0}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <WifiTethering sx={{ mr: 2, color: "#0075FF" }} />
              <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                Communication
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ mt: -1 }}>
              <div className="text-left space-y-2 text-[13px] pl-3 font-[300] ">
                <div className={window.location.pathname.match('/dashboard/contacts/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                 onClick={()=> navigate('/dashboard/contacts')}
                >
                  
                  <Contacts sx={{ fontSize: "15px", mr: 1 }} />
                  Contacts
                </div>
                <div className={window.location.pathname.match('/dashboard/textmessages/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                onClick={()=>navigate('/dashboard/textmessages')}
                >
                  
                  <ForumOutlined sx={{ fontSize: "15px", mr: 1 }} /> My
                  Text Message
                </div>
                <div className={window.location.pathname.match('/dashboard/email/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                
                onClick={()=>navigate('/dashboard/email')}
                >
                  
                  <AlternateEmail sx={{ fontSize: "15px", mr: 1 }} /> Direct
                  Email
                </div>
                {/* <div className={window.location.pathname.match('/dashboard/communication-settings/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
               onClick={()=>navigate('/dashboard/communication-settings')} 
                >
                  
                  <Settings sx={{ fontSize: "15px", mr: 1 }} />
                  Communication Settings
                </div> */}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <Accordion
            sx={{ bgcolor: "transparent" }}
            elevation={0}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Dashboard sx={{ mr: 2, color: "#0075FF" }} />
              <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                Dashboard
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ mt: -1 }}>
              <div className="text-left space-y-2 text-[13px] pl-3 font-[300] ">
                {/* <div className={window.location.pathname.match('/user/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                 onClick={()=>navigate('/user')} 
                >
                  
                  <AccountCircleOutlined sx={{ fontSize: "15px", mr: 1 }} />
                  Profile
                </div> */}
                <div className={window.location.pathname.match('/dashboard/teammates/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}  onClick={()=>navigate('/dashboard/teammates')} >
                  
                  <Groups3Outlined sx={{ fontSize: "15px", mr: 1 }} />
                  Teammates
                </div>


               
               
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
