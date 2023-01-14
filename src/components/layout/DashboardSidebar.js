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

const DashboardSidebar = () => {
  return (
    <div className="bg-white px-[24px] py-[20px] space-y-[64px] lg:h-screen rounded-[18px] lg:shadow-lg">
      <div className="text-center text-[#114369] bg-[#D1DEE7] py-[21px] rounded-[16px]">
        Fifth Ward CRC
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
                <div className="cursor-pointer">
                  
                  <VisibilityOutlined sx={{ fontSize: "15px", mr: 1 }} />
                  Discover
                </div>
                <div className="cursor-pointer">
                  
                  <HandshakeOutlined sx={{ fontSize: "15px", mr: 1 }} /> My
                  Collaborations
                </div>
                <div className="cursor-pointer">
                  
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
                <div className="cursor-pointer">
                  
                  <Contacts sx={{ fontSize: "15px", mr: 1 }} />
                  Contacts
                </div>
                <div className="cursor-pointer">
                  
                  <ForumOutlined sx={{ fontSize: "15px", mr: 1 }} /> My
                  Text Message
                </div>
                <div className="cursor-pointer">
                  
                  <AlternateEmail sx={{ fontSize: "15px", mr: 1 }} /> Direct
                  Email
                </div>
                <div className="cursor-pointer">
                  
                  <Settings sx={{ fontSize: "15px", mr: 1 }} />
                  Communication Settings
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
              <Dashboard sx={{ mr: 2, color: "#0075FF" }} />
              <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                Dashboard
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ mt: -1 }}>
              <div className="text-left space-y-2 text-[13px] pl-3 font-[300] ">
                <div className="cursor-pointer">
                  
                  <AccountCircleOutlined sx={{ fontSize: "15px", mr: 1 }} />
                  Profile
                </div>
                <div className="cursor-pointer">
                  
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
