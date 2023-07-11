import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import AccountSelection from "./AccountSelection";
import EcosystemProfile from "./EcosystemProfile";
import Login from "./Login";
import OrganizationProfile from "./OrganizationProfile";
import PersonalProfile from "./PersonalProfile";
import Register1 from "./Register1";

const Index = () => {
  return (
    <div>
      <div>
        <div className="flex justify-center  ">
         <Routes>
            <Route path="/register" element={<Register1 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal-profile" element={<PersonalProfile />} />
            <Route path="/organization-profile" element={<OrganizationProfile />} />
            <Route path="/ecosystem-profile" element={<EcosystemProfile />} />
            <Route path="/account-selection" element={<AccountSelection />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Index;
