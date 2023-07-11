import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./authentication/Index";
import Invite from "./authentication/Invite";
import Share from "./authentication/Share";


const NewRoutes = () => {


  

  

  return (
    <>
            <Routes>
              <Route path="/auth/*" element={<Index/>} />
              <Route path="/share" element={<Share/>} />
              <Route path="/invite" element={<Invite/>} />
            </Routes>
    </>
  );
};

export default NewRoutes;
