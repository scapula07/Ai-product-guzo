import { Drawer } from "@mui/material";
import React from "react";
import DashboardSidebar from "./DashboardSidebar";

const DashboardResponsive = ({ open, setOpen }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}  >
      <div className="w-[80vw]">
      <DashboardSidebar />
      </div>
    </Drawer>
  );
};

export default DashboardResponsive;
