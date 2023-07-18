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
import Connections from "./Connections";
import Active from "./Connections/views/active";
import Pending from "./Connections/views/pending";

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
                <Route path="/connections" element={<Connections/>} >
                     <Route path="" element={<Active/>} />
                     <Route path="pending" element={<Pending/>} />
                </Route>
    
            </Routes>
    </>
  );
};

export default NewRoutes;
