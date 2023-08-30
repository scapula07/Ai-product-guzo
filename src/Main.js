import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ResetPassword from "./components/authentication/ResetPassword";
import CollaborationRoutes from "./components/collaboration/CollaborationRoutes";
import CreateCommunityProfile from "./components/dashboard/createCommunityProfile";
import CreateCommunityProfileForCapture from "./components/dashboard/createCommunityProfileForCapture";
import DashboardRoutes from "./components/dashboard/DashboardRoutes";
import ThankYouCard from "./components/molecules/ThankYouCard";
import JoinCommunity from "./components/user/JoinCommunity";
import UserRoutes from "./components/user/UserRoutes";
import NewRoutes from "./modules/Routes";

const Main = () => {
  return (
    <BrowserRouter >
      <Routes >
        <Route path="/*"  element={<NewRoutes />} />
        {/* <Route path="/dashboard/*"  element={<DashboardRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />


        <Route path="/collaboration/*" element={<CollaborationRoutes />} />
        <Route path='/collaboration/finish'  element={<ThankYouCard/>} />

        <Route path="/" element={<Register />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

        <Route path="/join-community/:token" element={<JoinCommunity />} /> */}


      </Routes>
    </BrowserRouter>
  );
};

export default Main;
