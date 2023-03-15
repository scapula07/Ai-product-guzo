import { TroubleshootTwoTone } from "@mui/icons-material";
import { Button, CircularProgress, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorSnack from "../molecules/ErrorSnack";
import CustomizedProgressBars from "../molecules/Progress";
import ThankYouCard from "../molecules/ThankYouCard";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContactCapture = () => {
  const [openThankYouCard, setOpenThankYouCard] = useState(false);
  const [msg,setMsg] = useState("")
  const [openErrorSnack, setOpenErrorSnack] = useState(false)
  const { collaboration_id } = useParams();
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(false);
  const [collaboration, setCollaboration] = useState({});
  const [contactGroup, setContactGroup] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  const [partner, setPartner] = useState({
    user_id: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))._id
      : null,
    collaboration_id,
    first_name: "",
    last_name: "",
    organization_name: "",
    email: user.email || "",
    message: "",
    phone_number: ""
  });
  const [value, setValue] = useState()

  const getCollaboration = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/collaboration/" + collaboration_id)
      .then((res) => {
        setCollaboration(res.data);
        setLoader(false);
        getContactGroups(res.data._doc.community_id);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const getContactGroups = async (id) => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/contact/" + id)
      .then((res) => {
        setContactGroup(res.data[0]);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // const addContact = async () => {
  //   let contact = {
  //     user_id: partner.user_id,
  //     name: partner.first_name + " " + partner.last_name,
  //     email: partner.email,
  //     phone_number: partner.country_code + partner.phone,
  //   };
  //   setLoader(true);
  //   let url = process.env.REACT_APP_BACKEND_URL;
  //   console.log({ ...contact, contact_group_id: contactGroup._id });
  //   await axios
  //     .post(url + "/contact/add/", {
  //       contact,
  //       contact_group_id: contactGroup._id,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setLoader(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    if (!user) {
      navigate("/auth/login?collaboration_id=" + collaboration_id);
    }
    getCollaboration();
  }, []);

  const createPartner = async () => {
    setLoader2(true);
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/collaboration/partner", partner)
      .then((res) => {
        //console.log(res.data)
        // addContact()
       if(res.data.error){
        setOpenErrorSnack(true)
        setMsg(res.data.msg)
        setLoader2(false);
       }else{
        setLoader2(false);
        console.log(res.data);
        setOpenThankYouCard(true);
       }
      })
      .catch((err) => {
        console.log(err);
        setLoader2(false);
        setOpenErrorSnack(true)
        setMsg(err.error)
        
      });
  };

  // const addContact = async(contact) => {
  //   setLoader(true)
  //   setOpen(false);
  //   let url = process.env.REACT_APP_BACKEND_URL;
  //   console.log({...contact,contact_group_id : selectedContactGroup.value})
  //   axios
  //     .post(url + "/contact/add/",{contact,contact_group_id : selectedContactGroup.value})
  //     .then((res) => {
  //       console.log(res.data);
  //       setLoader(false)

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  return (
    <div className="flex justify-center">
      <ErrorSnack
        open={openErrorSnack}
        setOpen={setOpenErrorSnack}
        msg={msg}
        duration={14000000}
      />
      <div className="bg-white lg:w-[70vw] rounded-[20px] shadow-lg py-[30px] px-[40px]  ">
        <div className="text-center  text-[30px]  font-extrabold ">
          <div>{collaboration._doc?.community.name} </div>

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
              onChange={(e) => {
                setPartner({ ...partner, first_name: e.target.value });
              }}
              value={partner.first_name}
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
              onChange={(e) => {
                setPartner({ ...partner, last_name: e.target.value });
              }}
              value={partner.last_name}
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="text-[15px] text-[#114369] font-bold mb-1  ">
            Organization/Community/Group Name
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
            placeholder="organization name"
            id="link_url"
            onChange={(e) => {
              setPartner({ ...partner, organization_name: e.target.value });
            }}
            value={partner.organization_name}
          />
        </div>

        <div className="w-full mt-4">
          <div className="text-[15px] text-[#114369] font-bold mb-1  ">
            Email Contact
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
            placeholder="Email Address"
            id="link_url"
            onChange={(e) => {
              setPartner({ ...partner, email: e.target.value });
            }}
            value={partner.email}
          />
        </div>

       
        <div className="w-full mt-4">
          <div className="text-[15px] text-[#114369] font-bold mb-1  ">
            Phone Contact
          </div>
          <div className="flex items-center space-x-2">
            
          <PhoneInput
      inputStyle={{backgroundColor:'#EBF1F5', border: '0px' , width:'100%'}}
      placeholder="Enter phone number"
      value={partner.phone_number}
      onChange={(e)=> setPartner({...partner, phone_number: e})}
      country={'us'}
      
      />                

            
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="text-[15px] text-[#114369] font-bold mb-1  ">
            Share a Message
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
            multiline
            rows={6}
            placeholder="Share a message..."
            id="link_url"
            onChange={(e) => {
              setPartner({ ...partner, message: e.target.value });
            }}
            value={partner.message}
          />
        </div>

        <div className="mt-5 text-[#114369] text-[13px] font-semibold ">
          Terms & Privacy Policy. Your contact information is private and will
          only be shared with the “Collaboration” organizer. If you choose to
          submit your info, you consent to the organization communicating with
          you through the provided channels. You can choose to “unsubscribe”
          from the organization at any time.
        </div>

        <div className="mt-3">
          <ThankYouCard open={openThankYouCard} setOpen={setOpenThankYouCard} />
          {loader2 ? (
            <CustomizedProgressBars />
          ) : (
            <Button
              onClick={createPartner}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCapture;
