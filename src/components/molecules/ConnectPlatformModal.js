import { Button, Dialog, InputBase } from '@mui/material'
import React from 'react'

const ConnectPlatformModal = ({open, setOpen, channels, setChannels}) => {
  
  return (
   <Dialog
   open={open}
   onClose={()=> setOpen(false)}
   >
    <div className='px-5 py-6 text-center text-[14px]' >
       <div>connect and verify a social media flow here</div>
       <div className='my-5' >select a platform from the list</div>

       <div className="space-y-2 mb-2">
          <div className="text-[#114369] font-semibold text-[14px] text-left ">
            Digital Channel{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: "3px",
              }}
              placeholder="digital channel"
              id="digital_channel"
            />
          </div>
        </div>

        <div className="space-y-2 mb-2">
          <div className="text-[#114369] font-semibold text-[14px] text-left">
            Size{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: "3px",
              }}
              placeholder="size"
              id="size"
            />
          </div>
        </div>
       <div className="space-y-2 mb-2">
          <div className="text-[#114369] font-semibold text-[14px] text-left ">
            Platform Link{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: "3px",
              }}
              placeholder="platform link"
              id = "platform_link"
            />
          </div>
        </div>
       <div className="my-4" >
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "12px",
              width: {lg:"306px"  },
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}

            onClick={()=> {
               setChannels([
                ...channels, {
                  digital_channel : document.getElementById('digital_channel').value,
                  platform_link : document.getElementById('platform_link').value,
                  size : document.getElementById('size').value,
                }
               ])

               setOpen(false)
            }}
          >
            Connect a Channel
          </Button>
          </div>
    </div>
   </Dialog>
  )
}

export default ConnectPlatformModal