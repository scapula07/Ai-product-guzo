import { Button, InputBase } from "@mui/material";
import React from "react";

const ContactCapture = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white lg:w-[70vw] rounded-[20px] shadow-lg py-[30px] px-[40px]  ">
        <div className="text-center  text-[30px]  font-extrabold ">
          <div>The Fifth Ward CRC </div>

          <div className="font-semibold text-[14px] md:text-[25px]">
            {" "}
            is grateful for your consideration
          </div>

          <div className="text-[14px] md:text-[18px] font-bold text-[#114369] mt-2 md:mt-5 ">
            We are excited to follow up!
          </div>
        </div>

        <div className="text-[14px] text-[#114369] mt-5 mb-4">
          Please provide the following contact information
        </div>

        <div className="md:flex w-full items-center md:space-x-4 space-y-3 md:space-y-0 ">
          <div className="w-full">
            <div className="text-[15px] text-[#114369] font-bold mb-1  ">
              First Name
            </div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: "3px",
              }}
              placeholder="first name here ..."
              id="link_url"
            />
          </div>

          <div className="w-full">
            <div className="text-[15px] text-[#114369] font-bold mb-1 ">
              Last Name
            </div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: "3px",
              }}
              placeholder="last name here ..."
              id="link_url"
            />
          </div>
        </div>


        <div className="w-full mt-4" >
            <div className="text-[15px] text-[#114369] font-bold mb-1  " >Organization/Community/Group Name</div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: "3px",
              }}
              placeholder="e.g. Fitfh Ward CRC"
              id="link_url"
            />
          </div>



          <div className="w-full mt-4" >
            <div className="text-[15px] text-[#114369] font-bold mb-1  " >Email Contact</div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: "3px",
              }}
              placeholder="Email Address"
              id="link_url"
            />
          </div>


          <div className="w-full mt-4" >
            <div className="text-[15px] text-[#114369] font-bold mb-1  " >Phone Contact</div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: "3px",
              }}
              placeholder="Phone number"
              id="link_url"
            />
          </div>


          <div className="w-full mt-4" >
            <div className="text-[15px] text-[#114369] font-bold mb-1  " >Network</div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: "3px",
              }}
              placeholder="Choose a network"
              id="link_url"
            />
          </div>


          <div className="w-full mt-4" >
            <div className="text-[15px] text-[#114369] font-bold mb-1  " >Share a Message</div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: "3px",
              }}
              multiline 
              rows={6}
              placeholder="Share a message..."
              id="link_url"
            />
          </div>


          <div className="mt-5 text-[#114369] text-[13px] font-semibold ">
          Terms & Privacy Policy.  Your contact information is private and will only be shared with the “Collaboration” organizer.  If you choose to submit your info, you consent to the organization communicating with you through the provided channels.
            You can choose to “unsubscribe” from the community at any time.
          </div>


         <div className="mt-3">
         <Button
              sx={{
                bgcolor: "#24A0FD",
                border: "1px solid #24A0FD",
                color: "white",
                fontSize: "12px",
                width: { md: "105px", xs: "fit" },
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
              
            >
              Submit
            </Button>
         </div>



      </div>
    </div>
  );
};

export default ContactCapture;
