import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";
import DashboardSidebar from "../layout/DashboardSidebar";
import LandingModal from "../molecules/Landing";
import CustomizedProgressBars from "../molecules/Progress";
import AddTeammates from "./AddTeammates";
import CollaborationOwnerView from "./CollaborationOwnerView";
import CommunicationSetting from "./CommunicationSettings";
import ContactGroups from "./ContactGroups";
import Contacts from "./Contacts";
import CreateCollaboration from "./CreateCollaboration";
import CreateCommunityProfile from "./createCommunityProfile";
import CreateNewContact from "./CreateNewContact";
import CreateNewEmail from "./CreateNewEmail";
import CreateNewTextMessage from "./CreateNewTextMessage";
import DirectMessages from "./DirectMessages";
import Discover from "./Discover";
import EditCollaboration from "./EditCollaboration";
import EditCommunityProfile from "./EditCommunityProfile";
import EditTeammates from "./EditTeammates";
import Email from "./Email";
import EmailSettings from "./EmailSettings";
import Landing from "./Landing";
import MyCollaborations from "./MyCollaborations";
import Notifications from "./Notifications";
import Teammates from "./Teammates";
import TextMessages from "./TextMessages";
import TextMessageSettings from "./TextMessageSettings";

const DashboardRoutes = () => {
  const [community, setCommunity] = useState({label:JSON.parse(localStorage.getItem("community"))?.name||null,value:JSON.parse(localStorage.getItem("community"))?._id|| null,});
  const [loader, setLoader] = useState(false)
  const [openLanding, setOpenLanding] = useState(false)
  let navigate = useNavigate();
  const [communities, setCommunities] = useState(
    JSON.parse(localStorage.getItem("user"))?.communities || null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  useEffect(()=> {
    window.scrollTo(0,0)
    if(!user){
      navigate('/auth/register')
    }
    else{
      // if ( !communities || !community.label || communities.length < 1 ) {
      //   let path = "/dashboard/create-community-profile";
      //   if (
      //     window.location.href ==
      //     "https://guzo-dev.vercel.app/dashboard/create-community-profile"
      //     ||  window.location.href ==
      //     "https://guzo-dev.vercel.app/dashboard/direct-messages"
        
      //   ) {} else{
      //   if(!community.label){
      //     setOpenLanding(true)  
      //   }
      //   }
      // }
    }
  },[navigate])



  useEffect(()=> {
    if(!community.label){
      console.log('hii')
      //setOpenLanding(true)
    }
  },[])

  

  

  return (
    <>
    <LandingModal open={openLanding} setOpen={setOpenLanding} community={community} setCommunity={setCommunity} />
      <DashboardHeader community={community} setCommunity={setCommunity} setLoader={setLoader} />
      <div className="lg:grid md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-[60px] md:gap-3 md:px-5 lg:px-[98px] md:py-4 lg:py-[33px]">
        <div className="hidden lg:block md:block">
          <DashboardSidebar community={community} setCommunity={setCommunity} setLoader={setLoader} />
        </div>

        {loader ? (
          <div className="flex justify-center mt-[50px]">
            <CustomizedProgressBars />
          </div>
        ) : (
          <div className="lg:col-span-3 md:col-span-2 ">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/edit-community-profile"
                element={<EditCommunityProfile getCommunity0={[]} community={community} setCommunity={setCommunity} />}
              />

              <Route
                path="/create-community-profile"
                element={<CreateCommunityProfile getCommunity0={[]} community={community} setCommunity={setCommunity} />}
              />
              <Route path="/my-collaborations" element={<MyCollaborations />} />
              <Route
                path="/create-collaboration"
                element={<CreateCollaboration community={community} />}
              />
              <Route
                path="/collaboration/:collaboration_id"
                element={<CollaborationOwnerView />}
              />
              <Route
                path="/edit-collaboration/:collaboration_id"
                element={<EditCollaboration />}
              />
              <Route path="/discover" element={<Discover />} />
              <Route path="/teammates" element={<Teammates />} />
              <Route path="/teammates/add" element={<AddTeammates />} />
              <Route path="/teammates/edit" element={<EditTeammates />} />
              <Route path="/direct-messages" element={<DirectMessages />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<ContactGroups />} />
              <Route
                path="/contacts/go-neighborhood/create-contact"
                element={<CreateNewContact />}
              />
              <Route path="/textmessages" element={<TextMessages />} />
              <Route
                path="/textmessages/create"
                element={<CreateNewTextMessage />}
              />
              <Route path="/email" element={<Email />} />
              <Route path="/email/create" element={<CreateNewEmail />} />
              <Route
                path="/communication-settings"
                element={<CommunicationSetting />}
              />
              <Route
                path="/communication-settings/email"
                element={<EmailSettings />}
              />
              <Route
                path="/communication-settings/text-message"
                element={<TextMessageSettings />}
              />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardRoutes;
