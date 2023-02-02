import { MoreHoriz, SearchOutlined } from '@mui/icons-material'
import { Avatar, Divider, InputBase } from '@mui/material'
import React from 'react'

const MessageContacts = () => {
  return (
    <div className="  py-2 px-3 space-y-4 rounded-xl ">
            <div className=" md:block lg:block mt-2 md:mt-0">
              <InputBase
                sx={{
                  bgcolor: "#EBF1F5",
                  borderRadius: "4px",
                  px: 4,
                  width: { xs: "100%" },
                  py: "px",
                }}
                placeholder="Search..."
                endAdornment={
                  <SearchOutlined
                    sx={{ fontWeight: "300", cursor: "pointer" }}
                  />
                }
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <Avatar
                  variant="square"
                  src=""
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
                  Go Neighborhoods
                </div>

                <div className="border-[1px] border-[#24A0FD] p-1 rounded-lg cursor-pointer">
                  <MoreHoriz sx={{ color: "#24A0FD" }} />
                </div>
              </div>
              <Divider/>

              <div className="flex items-center">
                <Avatar
                  variant="square"
                  src=""
                  sx={{
                    bgcolor: "#114369",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  J
                </Avatar>

                <div className="font-semibold text-[14px] ml-3 flex-1">
                  Juneteenth Festival
                </div>

                <div className="border-[1px] border-[#24A0FD] p-1 rounded-lg cursor-pointer">
                  <MoreHoriz sx={{ color: "#24A0FD" }} />
                </div>
              </div>
              <Divider/>
            </div>
          </div>
  )
}

export default MessageContacts