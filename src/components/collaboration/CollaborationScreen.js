import { Avatar, Button, InputBase } from "@mui/material";
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const CollaborationScreen = () => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center">
      <div className="bg-white lg:w-[70vw] rounded-[20px] shadow-lg py-[30px] px-[40px]  ">
        <div className="text-center  text-[30px]  font-extrabold ">
          <div>The Fifth Ward CRC </div>

          <div className="font-semibold"  > requests your support... </div>
        </div>

        <div className="text-center  text-[25px] font-bold flex justify-center mt-3">
          <Avatar variant='square' src='/logo2.png' sx={{ width:'300px', height:'200px', borderRadius:'20px' }} />
        </div>


        <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
        Juneteenth Festival
        </div>


        <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
        Lorem ipsum dolor sit amet, consectetur at amet, consectetur adipiscing elit. Sed senectus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed senectus duis diam Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed senectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed senectus duis diam Lorem ipsum dolor sit amet,
        </div>


        <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
      The Need
        </div>


        <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
        Lorem ipsum dolor sit amet, consectetur at amet, consectetur adipiscing elit. Sed senectus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed senectus duis diam Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed senectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed senectus duis diam Lorem ipsum dolor sit amet,
        </div>



        <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
        Support Links
        </div>


        <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
        Check out a sample marketing assest that we are sharing with Fifth Ward community members. 

        <div className="underline text-[#24A0FD]" >
        Canva Link.
        </div>

        </div>



        <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
      Will you collaborate us??
        </div>


        <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] mb-2 ">
        Please tell us your organizations name and let us know your willingness to help.
        </div>

        <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "100%", xs: "100%" },
                py: 1,
              }}
              placeholder=""
              id="link_description"
            />
          </div>




          <div className="text-center  text-[19px] font-bold space-x-4 md:flex justify-center mt-4 text-[#114369] ">
      

          <Button
              sx={{
                bgcolor: "#4FF0A5",
                border: "1px solid #4FF0A5",
                color: "white",
                fontSize: "12px",
                width: { md: "fit", xs: "fit" },
                px: 2,
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#4FF0A5",
                  color: "white",
                },
              }}
              onClick={()=> {
                navigate('/collaboration/contact-capture')
              }}
            >
              Yes, Count me in!
            </Button>

            <Button
              sx={{
                bgcolor: "#FF6060",
                border: "1px solid #FF6060",
                color: "white",
                fontSize: "12px",
                width: { md: "fit", xs: "fit" },
                px: 2,
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#FF6060",
                  color: "white",
                },
              }}
              
            >
              No, Not this time
            </Button>

            <Button
              sx={{
                bgcolor: "#24A0FD",
                border: "1px solid #24A0FD",
                color: "white",
                fontSize: "12px",
                width: { md: "fit", xs: "fit" },
                px: 2,
                textTransform: "none",
                borderRadius: "5px",
                mt: {xs: 2, sm: 0, lg: 0},
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}

              onClick={()=> {
                navigate('/collaboration/contact-capture')
              }}
              
            >
              Maybe, Keep me informed
            </Button>
      
        </div>



      </div>
    </div>
  );
};

export default CollaborationScreen;
