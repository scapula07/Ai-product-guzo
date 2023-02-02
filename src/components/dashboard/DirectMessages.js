import { Circle, MoreHoriz, SearchOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import ReactSelect from "react-select";
import DeleteTeammateModal from "../molecules/DeleteTeammateModal";
import MessageContacts from "../molecules/MessageContacts";
import MessageModal from "../molecules/MessageModal";

const DirectMessages = () => {
    const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-white py-[20px] pb-[80px]  md:rounded-[18px] shadow-lg">
        
      <div className="md:flex space-y-2 md:space-y-0 items-center px-[30px]">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Direct Messages
        </div>
      </div>

      <Divider sx={{ my: 3 }} />
      <MessageModal open={open} setOpen={setOpen}/>
      <div className="grid grid-cols-5 gap-4 md:px-[30px]">
        
        <div className=" hidden lg:block col-span-2 shadow-lg py-2 px-3 space-y-4 rounded-xl ">
          <MessageContacts/>
        </div>

        

        <div className="col-span-5 lg:col-span-3 shadow-lg py-2 pb-6 px-3 space-y-4 rounded-xl ">
            
          <div className="text-center text-[14px] font-semibold ">
            Go Neighborhoods
          </div>

          {/* messages */}

          <div className="space-y-4" >
            {/* message */}

            <div className="space-y-4" >
              <div className="flex items-center">
                <Avatar
                  variant="square"
                  src="/woman.png"
                  sx={{
                    bgcolor: "blue",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  G
                </Avatar>

                <div className="font-semibold text-[14px] ml-3 flex-1">
                  Kathy
                </div>

                <div className="text-[12px] text-[#114369] ">12:30</div>
              </div>
              <div className="w-full bg-[#EBF1F5] px-4 py-2 text-[12px] rounded-lg " >

              Hi Team, how are you doing guys ?

              </div>
            </div>

            <div className="space-y-2" >
              <div className="flex items-center">
                <Avatar
                  variant="square"
                  src="/woman2.png"
                  sx={{
                    bgcolor: "blue",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  G
                </Avatar>

                <div className="font-semibold text-[14px] ml-3 flex-1">
                  Denise
                </div>

                <div className="text-[12px] text-[#114369] ">12:30</div>
              </div>
              <div className="w-full bg-[#EBF1F5] px-4 py-2 text-[12px] rounded-lg " >

              Hello Kathy, I’m great, I almost finished working on the new design, I’ll send you updates later.

Thanks! 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
