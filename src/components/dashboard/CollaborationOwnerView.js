import { ContactPageSharp, MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";
import SelectContactGroupModal from "../molecules/SelectContactGroupModal";

const CollaborationOwnerView = () => {
  const [active, setActive] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const [collaboration, setCollaboration] = useState({});
  const [partners, setPartners] = useState([])
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState({
    loader: false,
    id: ""
  });
  const [openSelectContactGroupModal, setOpenSelectContactGroupModal] = useState(false)
  const [contactGroups, setContactGroups] = useState([])
  const [contactGroup, setContactGroup] = useState()
  const [selectedContactGroup, setSelectedContactGroup] = useState({})


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const { collaboration_id } = useParams();

  const getContactGroupByCollaboration = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/contact/by-collaboration/" + collaboration_id)
      .then((res) => {
        //console.log(res.data[0]);
        setContactGroup(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCollaboration = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/collaboration/" + collaboration_id)
      .then((res) => {
        //console.log(res.data);
        setLoader(false);
        setCollaboration(res.data);
        setPartners(res.data.collaborationPartners)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const getContactGroups = async() =>{
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/contact/"+JSON.parse(localStorage.getItem("community"))._id)
      .then((res) => {
       //console.log(res.data)
       setContactGroups(res.data)
       
      })

      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
     getCollaboration();
     getContactGroups()
     getContactGroupByCollaboration()
  }, []);
  const addContact = async (contact) => {
   
    let url = process.env.REACT_APP_BACKEND_URL;
    console.log({ ...contact, contact_group_id: contactGroup._id });
    await axios
      .post(url + "/contact/add/", {
        contact,
        contact_group_id: contactGroup._id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const verifyPartner = async (partner) => {
    setLoader2({
      loader:true,
      id: partner._id
    })
    let url = process.env.REACT_APP_BACKEND_URL;
    let contact = {
      user_id: partner.user_id,
      name: partner.first_name + " " + partner.last_name,
      email: partner.email,
      phone_number: partner.country_code + partner.phone,
    };
    await axios
      .post(url + "/collaboration/verify-partner",partner)
      .then((res) => {
        console.log(res.data)
        setPartners(res.data)
        addContact(contact)
        setLoader2({
          loader:false,
          id: partner._id
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const deletePartner = async (partner) => {
    setLoader2({
      loader:true,
      id: partner._id
    })
    let url = process.env.REACT_APP_BACKEND_URL;
    await axios
      .post(url + "/collaboration/delete-partner",partner)
      .then((res) => {
        setPartners(res.data)
        setLoader2({
          loader:false,
          id: partner._id
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <div className="bg-white py-[20px] pb-[80px] px-[30px] md:rounded-[18px] shadow-lg">
      <div className="md:flex space-y-2 md:space-y-0 items-center">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          <Button
            sx={{
              bgcolor: "white",
              border: "1px solid #24A0FD",
              color: "#24A0FD",
              fontSize: "12px",
              width: { md: "fit", xs: "fit" },
              px: 2,
              textTransform: "none",
              borderRadius: "5px",
              mr: 3,
              ":hover": {
                bgcolor: "white",
                color: "#24A0FD",
              },
            }}

            onClick={()=> navigate('/dashboard/my-collaborations')}
          >
            Back
          </Button>
         {collaboration._doc?.title}
        </div>
        <div>
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "14px",
              mr: 2,
              width: { sm: "165px", xs: "fit" },
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
            onClick={() => navigate("/dashboard/edit-collaboration/"+collaboration_id)}
          >
            Edit Collaboration
          </Button>
        </div>
        <div>
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "14px",
              width: { sm: "fit", xs: "fit" },
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
            id='copy_btn'


            onClick={() =>{
              navigator.clipboard.writeText("https://guzo-dev.vercel.app/collaboration/"+collaboration_id)
              document.getElementById('copy_btn').innerHTML='Copied !'
             setTimeout(() => {
              document.getElementById('copy_btn').innerHTML='Copy Link'
             }, 3000);
            }}
          >
            Copy Link
          </Button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      {loader ? (
        <div className="flex justify-center mt-[50px]">
          {" "}
          <div className="flex flex-1"/>
          <CustomizedProgressBars />{" "}
        </div>
      ) : (
        <div className="mt-[30px] text-[12px] ">
          <div className="flex justify-center items-center text-[14px] space-x-[20px] mb-[20px] md:mb-[50px] ">
            <div
              className={
                active === 0
                  ? "bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1 "
                  : " bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer "
              }
              onClick={() => setActive(0)}
            >
              Collaboration
            </div>
            <div
              className={
                active === 1
                  ? "bg-[#24A0FD] cursor-pointer rounded-[24px] px-5 text-white py-1"
                  : " bg-[#EBF1F5] rounded-[24px] px-5 py-1 cursor-pointer "
              }
              onClick={() => setActive(1)}
            >
              Request Responses
            </div>
          </div>

          {active === 0 && (
            <>
            <SelectContactGroupModal open={openSelectContactGroupModal} setOpen={setOpenSelectContactGroupModal}
                    contactGroups={contactGroups} contact={selectedContactGroup} setLoader={setLoader}
                    />
              <div className="md:grid grid-cols-5 md:gap-4">
                <div className="md:col-span-2">
                  <div className="md:shadow-lg py-[18px] px-[17px]">
                    <div>
                      {" "}
                      <Avatar
                        variant="square"
                        src={collaboration._doc.photo}
                        sx={{ width: "100%", height: "180px" }}
                      />
                    </div>
                    <div className="text-center font-[500] mt-[15px]">
                      {collaboration._doc.title}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 bg-white md:shadow-lg shadow-gray-400 p-3 md:rounded-[20px] ">
                  <div className="text-center  text-[14px] font-bold flex justify-center mt-4 text-[#114369] ">
                    Description
                  </div>

                  <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                    {collaboration._doc.description}
                  </div>

                  <div className="text-center  text-[14px] font-bold flex justify-center mt-4 text-[#114369] ">
                    The Need
                  </div>

                  <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                    {collaboration._doc.need}
                  </div>

                  <div className="text-center  text-[14px] font-bold flex justify-center mt-4 text-[#114369] ">
                  Supporting Links
                  </div>

                  <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                   
                    {collaboration._doc.community.name}.
                    {collaboration._doc.support_links.map(
                      (item, index) => (
                        <div className="underline text-[#24A0FD]" key={index}>
                          {item.link}<span className="text-[#114369] no-underline">({item.description})</span>
                        </div>
                      )
                    )}
                  </div>



                  <div className="text-center  text-[14px] font-bold flex justify-center mt-4 text-[#114369] ">
                  Supporting Documents
                  </div>

                  <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                   
                    {collaboration._doc.community.name}.
                    {collaboration.collaborationSupportDocuments.map(
                      (item, index) => (
                        <div className="underline text-[#24A0FD]" key={index}>
                          {item.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className=" " >
                <div className="text-[#114369]  text-[14px] font-semibold mt-9 mb-5">
                  Collaboration Partners ({collaboration.collaborationPartners.length})
                </div>
               <div className="lg:h-[20vw] h-[20vh] overflow-y-auto" >
               {partners.map((item, index) => { 
                if(item.user_id !== JSON.parse(localStorage.getItem('user'))._id){
                  return(
                    (
                      <div
                      className="md:flex items-center justify-between space-x-3 my-6"
                      key={index}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={collaboration._doc.photo}
                          sx={{ width: "53px", height: "53px" }}
                        />
    
                        <div>
                          <div className="text-black text-[14px] font-bold">
                            {item.username ? item.username : item.first_name+" "+item.last_name}
                          </div>
                          <div className="text-black text-[10px] font-thin   ">
                            {item.message}
                          </div>
                        </div>
                      </div>
    
    
                
    
                   
    
                      <div className="flex  items-center space-x-2 md:space-x-5">
                         
                         
                      {
                      !item.is_verified ? (
                     <>
                     
                      {loader2.loader && loader2.id === item._id ? (
                        <CustomizedProgressBars/>
                      ): (
                        <> 
                          <div className=" mt-2 mb-2 md:mb-0  " key={index} id={item._id} >
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
    
                         
    
                          onClick={()=>{
                            verifyPartner(item)
                          }}
                        >
                          Approve
                        </Button>
    
                        
                      </div>
                      <div className=" md:mt-0  ">
                      <Button
                        sx={{
                          bgcolor: "#FF6060",
                          color: "white",
                          fontSize: "14px",
                          width: "165px",
                          textTransform: "none",
                          borderRadius: "5px",
                          ":hover": {
                            bgcolor: "#FF6060",
                            color: "white",
                          },
                        }}
                        onClick={()=>{
                          deletePartner(item)
                        }}
                      >
                        Decline
                      </Button>
                    </div>
                        </>
                      )}
                    </>
                      ):(
                        <div className=" md:mt-0  " >
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
    
                            
    
                           
                          >
                            Direct Message
                          </Button>
                        </div>
                      )
                    }  
    
                        <div>
                          <Button
                            sx={{
                              bgcolor: "white",
                              border: "1px solid #24A0FD",
                              color: "#24A0FD",
                              fontSize: "12px",
                              width: { md: "fit", xs: "fit" },
                              px: 2,
                              textTransform: "none",
                              borderRadius: "5px",
                              ":hover": {
                                bgcolor: "white",
                                color: "#24A0FD",
                              },
                            }}
                          >
                            <MoreHoriz
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            />
                            <Menu
                              anchorEl={anchorEl}
                              id="account-menu"
                              open={open}
                              onClose={handleClose}
                              onClick={handleClose}
                              PaperProps={{
                                elevation: 2,
                                sx: {
                                  overflow: "visible",
                                  width: "220px",
                                  filter:
                                    "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                  mt: 1.5,
                                  "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: { lg: "45%", xs: "45%" },
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                  },
                                },
                              }}
                              transformOrigin={{
                                horizontal: "center",
                                vertical: "top",
                              }}
                              anchorOrigin={{
                                horizontal: "center",
                                vertical: "bottom",
                              }}
                            >
                              <MenuItem sx={{ fontSize: "13px", px: "35%" }}>
                                Send Email
                              </MenuItem>
                              <MenuItem sx={{ fontSize: "13px", px: "24%" }}>
                                Send Text Message
                              </MenuItem>
                              <Divider sx={{ mx: "6%", my: "1px" }} />
                              <MenuItem
                                sx={{ fontSize: "13px", px: "12%", color: "red" }}
                              >
                                Remove From Collaboration
                              </MenuItem>
                            </Menu>
                          </Button>
                        </div>
                      </div>
                    </div>
                    )
                  )
                }
                })}
               </div>
              </div>
            </>
          )}

          {active === 1 && (
            <>
              <div>
                <div className="text-[#114369] text-[14px] font-semibold mt-9 mb-5">
                  Contact Responses
                </div>
                {collaboration.collaborationPartners.map((item, index) => (
                  <div key={index}>
                    <SelectContactGroupModal open={openSelectContactGroupModal} setOpen={setOpenSelectContactGroupModal}
                    contactGroups={contactGroups} contact={selectedContactGroup} setLoader={setLoader}
                    />
                    <div className="md:flex items-start md:space-x-3 justify-between ">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-black text-[16px] font-bold">
                             {item.organization_name}
                          </div>
                          <div className="text-black text-[12px] font-thin mt-2   ">
                            <div className="font-normal">Contact</div>
                            <div>{item.first_name+" "+item.last_name}</div>
                            <div>{item.email}</div>
                            <div>{item.phone_number}</div>

                            <div className="font-normal mt-4">
                              Network :{" "}
                              <span className="font-thin">{collaboration._doc.community.name}</span>{" "}
                            </div>

                            <div className="font-normal mt-4">
                              Message :{" "}
                              <span className="font-thin">
                                {item.message}
                              </span>{" "}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap  items-center space-y-2 lg:space-y-3  lg:space-x-0 mt-7 ">
                        <div className=" md:mt-0  ">
                          <Button
                            sx={{
                              bgcolor: "white",
                              color: "#24A0FD",
                              border: "1px solid #24A0FD",
                              fontSize: "14px",
                              width: "165px",
                              textTransform: "none",
                              borderRadius: "5px",
                              ":hover": {
                                bgcolor: "white",
                                color: "#24A0FD",
                              },
                            }}
                            onClick={()=>{
                              setOpenSelectContactGroupModal(true)
                              setSelectedContactGroup(item)
                            }}
                          >
                            Save Contact
                          </Button>
                        </div>

                        {/* <div className=" md:mt-0  ">
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
                          >
                            Approve
                          </Button>
                        </div>

                        <div className=" md:mt-0  ">
                          <Button
                            sx={{
                              bgcolor: "#FF6060",
                              color: "white",
                              fontSize: "14px",
                              width: "165px",
                              textTransform: "none",
                              borderRadius: "5px",
                              ":hover": {
                                bgcolor: "#FF6060",
                                color: "white",
                              },
                            }}
                          >
                            Decline
                          </Button>
                        </div> */}
                      </div>
                    </div>
                    <Divider sx={{ my: 3 }} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CollaborationOwnerView;
