import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";
import CollaborationScreen from "./CollaborationScreen";
import ContactCapture from "./ContactCapture";

const CollaborationRoutes = () => {
  return (
    <>
     <div className="flex justify-center  mt-4">
          <img
            src="/logo.png"
            className="lg:w-[172px] lg:h-[64px] w-[50px] h-[20px] cursor-pointer relative top-1 left-5 "
          />
        </div>
      <div className="lg:grid md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-[60px] md:gap-3 md:px-5 lg:px-[98px] md:py-4 lg:py-[33px]">
        <div className="lg:col-span-4 md:col-span-3 ">
          <Routes>
            <Route path="/:collaboration_id" element={<CollaborationScreen />} />
            <Route path="/contact-capture/:collaboration_id" element={<ContactCapture />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default CollaborationRoutes;
