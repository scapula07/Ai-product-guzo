import { Drawer } from "@mui/material";
import React from "react";
import DashboardSidebar from "./DashboardSidebar";

const DashboardResponsive = ({ open, setOpen, community }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}  >
      <div className="w-[80vw]">
      <DashboardSidebar community={community} setOpen={setOpen}/>
      </div>
    </Drawer>
  );
};

export default DashboardResponsive;
