import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./authentication/Index";
import Invite from "./authentication/Invite";
import Share from "./authentication/Share";
import Profile from "./OrgProfile";
import Home from "./Home/views";
import Feeds from "./Home/views/feed";
import Ecosystems from "./Home/views/ecosystem";

const NewRoutes = () => {


  

  

  return (
    <>
            <Routes>
                <Route path="/auth/*" element={<Index/>} />
                <Route path="/share" element={<Share/>} />
                <Route path="/invite" element={<Invite/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/" element={<Home/>} >
                    <Route path="" element={<Feeds/>} />
                    <Route path="ecosystems" element={<Ecosystems/>} />
                </Route>
            </Routes>
    </>
  );
};

export default NewRoutes;
