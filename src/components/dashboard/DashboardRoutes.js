import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useNavigation } from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";
import DashboardSidebar from "../layout/DashboardSidebar";
import AddTeammates from "./AddTeammates";
import CollaborationOwnerView from "./CollaborationOwnerView";
import CommunicationSetting from "./CommunicationSettings";
import ContactGroups from "./ContactGroups";
import Contacts from "./Contacts";
import CreateCollaboration from "./CreateCollaboration";
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
  let navigate = useNavigate()
  const [community, setCommunity] = useState()
  const [loader, setLoader] = useState(true)

  const getCommunity = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/community/" + JSON.parse(localStorage.getItem("user"))._id)
      .then((res) => {
        if (
          !res.data
        ) {
          setLoader(false)
          navigate('/dashboard/edit-community-profile')
          return
        } else {
          setCommunity(res.data)
          setLoader(false)
          return
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCommunity()
  }, [])
  
  return (
    <>
      <DashboardHeader community={community} />
      <div className="lg:grid md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-[60px] md:gap-3 md:px-5 lg:px-[98px] md:py-4 lg:py-[33px]">
        <div className="hidden lg:block md:block">
        <DashboardSidebar community={community} />    
        </div>

        {loader ? (<div className="flex justify-center mt-[50px]" >
          <CircularProgress/>
        </div>): (
          <div className="lg:col-span-3 md:col-span-2 ">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/edit-community-profile' element={<EditCommunityProfile getCommunity0={getCommunity}/>} />
            <Route path='/my-collaborations' element={<MyCollaborations/>} />
            <Route path='/create-collaboration' element={<CreateCollaboration community={community} />} />
            <Route path='/collaboration/:collaboration_id' element={<CollaborationOwnerView />} />
            <Route path='/edit-collaboration/:collaboration_id' element={<EditCollaboration />} />
            <Route path='/discover' element={<Discover />} />
            <Route path='/teammates' element={<Teammates />} />
            <Route path='/teammates/add' element={<AddTeammates />} />
            <Route path='/teammates/edit' element={<EditTeammates />} />
            <Route path='/direct-messages' element={<DirectMessages />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/contacts/go-neighborhood' element={<ContactGroups />} />
            <Route path='/contacts/go-neighborhood/create-contact' element={<CreateNewContact />} />
            <Route path='/textmessages' element={<TextMessages />} />
            <Route path='/textmessages/create' element={<CreateNewTextMessage />} />
            <Route path='/email' element={<Email />} />
            <Route path='/email/create' element={<CreateNewEmail />} />
            <Route path='/communication-settings' element={<CommunicationSetting />} />
            <Route path='/communication-settings/email' element={<EmailSettings />} />
            <Route path='/communication-settings/text-message' element={<TextMessageSettings />} />
            <Route path='/notifications' element={<Notifications />} />
          </Routes> 
        </div>
        )}
      </div>
    </>
  );
};

export default DashboardRoutes;
