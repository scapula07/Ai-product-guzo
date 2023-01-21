import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";
import CollaborationScreen from "./CollaborationScreen";
import ContactCapture from "./ContactCapture";

const CollaborationRoutes = () => {
  return (
    <>
      <DashboardHeader />
      <div className="lg:grid md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-[60px] md:gap-3 md:px-5 lg:px-[98px] md:py-4 lg:py-[33px]">
        <div className="lg:col-span-4 md:col-span-3 ">
          <Routes>
            <Route path="/" element={<CollaborationScreen />} />
            <Route path="/contact-capture" element={<ContactCapture />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default CollaborationRoutes;
