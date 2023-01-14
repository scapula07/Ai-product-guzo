import { Avatar, Button } from '@mui/material'
import React from 'react'

const CollaborationCard = () => {
  return (
    <div className="shadow-lg py-[18px] px-[17px]">
    <div>
      {" "}
      <Avatar
        variant="square"
        src="/logo2.png"
        sx={{ width: "100%", height: "180px" }}
      />
    </div>
    <div className="text-center font-[500] mt-[15px]">Juneteenth Festival</div>
    <div className="text-xs font-[300] mt-[6px] text-center ">(Public)</div>
    <div className="mt-[10px]">
      <Button
        sx={{
          bgcolor: "#24A0FD",
          color: "white",
          fontSize: "14px",
          width: "100%",
          textTransform: "none",
          borderRadius: "5px",
          ":hover": {
            bgcolor: "#24A0FD",
            color: "white",
          },
        }}
      >
        Manage
      </Button>
    </div>
  </div>
  )
}

export default CollaborationCard