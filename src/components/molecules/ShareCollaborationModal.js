import { Button, Dialog, InputBase } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ShareCollaborationModal = ({ open, setOpen, collaboration_id }) => {
  const navigate = useNavigate()
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="px-5 py-6 text-center text-[14px] lg:w-[30vw] font-bold  ">
        <div>
          Share this link with others via email, text, social media or anywhere
          to invite them to collaborate...
        </div>
        <div className=" text-left font-normal text-[12px] my-3 ">
          copy link and share ...
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
            placeholder=""
            value={"https://guzo-dev.vercel.app/collaboration/"+collaboration_id}
            endAdornment={
              <Button
                sx={{
                  bgcolor: "#24A0FD",
                  color: "white",
                  fontSize: "12px",
                  width: "fit",
                  textTransform: "none",
                  borderRadius: "5px",
                  ":hover": {
                    bgcolor: "#24A0FD",
                    color: "white",
                  },
                }}

                id='copy_btn'

                onClick={()=>{
                    navigator.clipboard.writeText("http://guzo-dev.vercel.app/collaboration/"+collaboration_id)
                    document.getElementById('copy_btn').innerHTML='Copied !'
                   setTimeout(() => {
                    document.getElementById('copy_btn').innerHTML='Copy'
                   }, 3000);
                }}
              >
                Copy
              </Button>
            }
          />
        </div>
        <div className="my-4 flex justify-center">
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "12px",
              width: "fit",
              px: 5,
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}

            onClick={()=>{
                setOpen(false)
                setTimeout(()=>{
                  navigate('/dashboard/my-collaborations')
               },2000)
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ShareCollaborationModal;
