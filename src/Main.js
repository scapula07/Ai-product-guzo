import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CollaborationRoutes from "./components/collaboration/CollaborationRoutes";
import DashboardRoutes from "./components/dashboard/DashboardRoutes";
import ThankYouCard from "./components/molecules/ThankYouCard";
import UserRoutes from "./components/user/UserRoutes";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />

        <Route path="/collaboration/*" element={<CollaborationRoutes />} />
        <Route path='/collaboration/finish'  element={<ThankYouCard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
