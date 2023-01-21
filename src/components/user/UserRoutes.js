import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";
import AccountSettings from "./AccountSettings";
import EditUserProfile from "./EditUserProfile";
import UserProfile from "./UserProfile";

const UserRoutes = () => {
  return (
    <>
      <DashboardHeader />
      <div className="lg:grid md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-[60px] md:gap-3 md:px-5 lg:px-[98px] md:py-4 lg:py-[33px]">
        <div className="lg:col-span-4 md:col-span-3 ">
          <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditUserProfile />} />
            <Route path="/account-settings" element={<AccountSettings />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserRoutes;
