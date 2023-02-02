import {
    Dashboard,
    KeyboardArrowDown,
    Launch,
    Link,
  } from "@mui/icons-material";
  import { Avatar, Button, Divider } from "@mui/material";
  import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
  import CollaborationCard from "../molecules/CollaborationCard";
  
  const MyCollaborations = () => {
    const [active, setActive] = useState(0)
    const [collaborations, setCollaborations] = useState([1,2,3,4,5,6])

    useEffect(() => {
     if(active === 1) {
        setCollaborations([1,2])
     }else{
        setCollaborations([1,2,3,4,5,6])
     }
    }, [active])

    const navigate = useNavigate()
    
    return (
      <div className="bg-white py-[20px] px-[30px] md:rounded-[18px] shadow-lg ">
        <div className="md:flex space-y-2 md:space-y-0 items-center">
          <div className="flex flex-1 text-[#114369] font-[600] text-xl ">
            My Collaborations
          </div>
          <div>
            <Button
              sx={{
                bgcolor: "#24A0FD",
                color: "white",
                fontSize: "14px",
                width: "165px",
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
              onClick={()=>navigate('/dashboard/create-collaboration')} 
            >
              Create Collaboration
            </Button>
          </div>
        </div>
  
        <Divider sx={{ my: 3 }} />
  
      
  
        <div className="mt-[30px] text-[12px] ">
          <div className="flex items-center text-[14px] space-x-[20px] mb-[20px] md:mb-[50px] ">
            <div className={active === 0 ? 'bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1 ': ' bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer '} 
            onClick={()=> setActive(0)} >My Collaborations</div>
            <div className={active === 1 ? 'bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1': ' bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer '} 
            onClick={()=> setActive(1)} >Archived</div>
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-1 lg:gap-[48px]">
            {collaborations.map((item,index)=>(
                <CollaborationCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default MyCollaborations;
  