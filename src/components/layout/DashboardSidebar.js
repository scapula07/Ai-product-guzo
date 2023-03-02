import {
    AccountCircleOutlined,
    AlternateEmail,
  Chat,
  ChatBubble,
  ChatBubbleOutline,
  ChatBubbleOutlined,
  Contacts,
  Dashboard,
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
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const DashboardSidebar = ({community,setOpen}) => {
  const navigate = useNavigate()
  console.log(community)
  return (
    <div className="bg-white px-[24px] py-[20px] space-y-[64px] lg:h-screen rounded-[18px] lg:shadow-lg">
      <div className="text-center text-[#114369] bg-[#D1DEE7] py-[21px] rounded-[16px]"
      onClick={()=> {
        navigate('/dashboard/edit-community-profile')
        setOpen(false)
      }}
      >
        {community?.name}
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
                <div className={window.location.pathname.match('/dashboard/discover/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                onClick={()=> navigate('/dashboard/discover')}
                >
                  
                  <VisibilityOutlined sx={{ fontSize: "15px", mr: 1 }} />
                  Discover 
                </div>
                <div className={window.location.pathname.match('/dashboard/my-collaborations/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                 onClick={()=> navigate('/dashboard/my-collaborations')}
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
                <div className={window.location.pathname.match('/user/*') ?"cursor-pointer text-blue-500": "cursor-pointer"}
                 onClick={()=>navigate('/user')} 
                >
                  
                  <AccountCircleOutlined sx={{ fontSize: "15px", mr: 1 }} />
                  Profile
                </div>
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
