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
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

const CreateNewContact = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const style = {
    control: (base) => ({
      ...base,
      border: "0px #EBF1F5 ",
      borderRadius: "10px",
      paddingTop: 2,
      paddingBottom: 2,
      width: "100%",
      boxShadow: "none",
      backgroundColor: "#EBF1F5",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "400px",
      },
    }),
  };
  const navigate = useNavigate()
  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Create New Contact
        </div>
        <div>
          <Button
            sx={{
              bgcolor: "white",
              color: "#24A0FD",
              border: "1px solid #24A0FD",
              fontSize: "14px",
              width: { sm: "fit", xs: "fit" },
              px: 3,
              textTransform: "none",
              borderRadius: "5px",
              mr: 5,
              ":hover": {
                bgcolor: "white",
                color: "#24A0FD",
              },
            }}
            onClick={()=>navigate('/dashboard/contacts/go-neighborhood')}
          >
            Cancel
          </Button>
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "14px",
              width: { sm: "165px", xs: "fit" },
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
          >
            Save and Close
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div>
        <div className="mb-5  text-[#114369]  font-bold">Basic Info</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Title..."
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Company Name..."
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="First Name..."
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Last Name..."
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Email..."
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Phone Number..."
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Birthday..."
            />
          </div>
        </div>
      </div>


      <div className="mt-6">
        <div className="mb-5  text-[#114369]  font-bold">Address Info</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Street Address"
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Address #2"
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="City"
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="State"
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Zip Code"
            />
          </div>

          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: { md: "400px", xs: "100%" },
                py: 1,
              }}
              placeholder="Country"
            />
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default CreateNewContact;
const cats = [
  {
    label: "category 1",
    value: 1,
  },
  {
    label: "category 2",
    value: 2,
  },
];
