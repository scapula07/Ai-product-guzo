import { Avatar, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CollaborationCard = ({collaboration}) => {
  const navigate = useNavigate()
  return (
    <div className="shadow-lg py-[18px] px-[17px]">
    <div>
      {" "}
      <Avatar
        variant="square"
        src={collaboration?.photo}
        sx={{ width: "100%", height: "180px" }}
      />
    </div>
    <div className="text-center font-[500] mt-[15px]">{collaboration?.title}</div>
    <div className="text-xs font-[300] mt-[6px] text-center ">({collaboration?.is_public ? "Public" : "Private"})</div>
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
        onClick={()=>navigate('/dashboard/collaboration/'+collaboration?._id)} 
      >
        Manage
      </Button>
    </div>
  </div>
  )
}

export default CollaborationCard