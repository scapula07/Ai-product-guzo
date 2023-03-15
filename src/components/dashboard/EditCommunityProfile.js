import { CancelOutlined, KeyboardArrowDown, Launch } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, Divider, InputBase, Link } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ConnectPlatformModal from "../molecules/ConnectPlatformModal";
import CustomizedProgressBars from "../molecules/Progress";
import SuccessSnackbar from "../molecules/SuccessSnackbar";

const EditCommunityProfile = ({getCommunity0,community,setCommunity}) => {
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [fetchedPhoto, setFetchedPhoto] = useState("/picture_placeholder.png");
  const [channels, setChannels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loader, setLoader] = useState(false);
  const [openConnectPlatformModal, setOpenConnectPlatformModal] =
    useState(false);
  const [tags, setTags] = useState([]);
  const style = {
    control: (base) => ({
      ...base,
      border: "0px solid gray",
      width: "100%",
      boxShadow: "none",
      backgroundColor: "#EBF1F5",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "400px",
      },
    }),
  };
  const navigate = useNavigate();

 

  const [communityData, setCommunityData] = useState({
    user_id: JSON.parse(localStorage.getItem("user"))?._id || null,
    name: "",
    description: "",
  });

  const createCommunity = async () => {
    setLoader(true)
    let url = process.env.REACT_APP_BACKEND_URL;
    console.log(channels);
    axios
      .post(url + "/community", { ...communityData, tags, channels })
      .then((res) => {
        console.log(res.data);
        //community profile picture
        let formdata = new FormData();
        formdata.append("profile_picture", photo);
        formdata.append("community_id", res.data._id);
        axios
          .post(url + "/community/upload-community-profile-picture", formdata)
          .then((res) => {
            console.log(res.data);
            getCommunity();
            getCommunity0()
            getUser()
          })
          .catch((err) => {
            console.log(err);
          });

        // setCommunityData({
        //   user_id: JSON.parse(localStorage.getItem("user"))._id,
        //   name: "",
        //   description: "",
        // });

        // setChannels([]);
        // setTags([]);
        // setPhoto(null);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  const getCommunity = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/community/get-community-by-id/" + community?.value)
      .then((res) => {
        setLoader(false)
        if (
          res.data &&
          Object.keys(res.data).length === 0 &&
          Object.getPrototypeOf(res.data) === Object.prototype
        ) {
          setCommunity(null);
        } else {
          console.log(res.data);
          let community = res.data;
          localStorage.setItem("community", JSON.stringify(community));

          setCommunity({label: community?.name, value: community?._id});
          setCommunityData({
            name: community.name,
            description: community.description,
          });
          setFetchedPhoto(community.profile_picture);
          setTags(community.tags);
          setChannels(community.channels);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async() => {
    setLoader(true)
     let url = process.env.REACT_APP_BACKEND_URL
     axios
     .get(url+"/user/get-user-by-id/", JSON.parse(localStorage.getItem('user'))._id)
     .then((res) => {
       console.log(res.data)
       localStorage.setItem('user' , JSON.stringify(res.data))
     })
     .catch((err) => {
       console.log(err);
     });
         
   }

  const editCommunity = async () => {
    setLoader(true)
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/community/update-community", {
        ...communityData,
        community_id: community?.value,
        tags, channels
      })
      .then((res) => {
        console.log(res.data);
        //community profile picture
        let formdata = new FormData();
        formdata.append("profile_picture", photo);
        formdata.append("community_id", res.data._id);
        axios
          .post(url + "/community/upload-community-profile-picture", formdata)
          .then((res) => {
            console.log(res.data);
            setOpenSuccessSnack(true)
            getCommunity();
            getUser()
          })
          .catch((err) => {
            console.log(err);
          });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCommunity();
  }, []);

  return (
    <div className="bg-white py-[20px] px-[30px] md:rounded-[18px] shadow-lg ">
      <SuccessSnackbar msg={'Organization edit was successful'} duration='10000' 
      open={openSuccessSnack} setOpen={setOpenSuccessSnack}  />
      <div className="lg:flex items-center">
        <div className=" flex-1 text-[#114369] font-[600] text-xl ">
          <div>
            {" "}
           Edit Organization Profile
          </div>
          <div className="text-xs font-light text-dark">
           
              Edit your organization profile
          </div>
        </div>

        {/* <div className="flex  mt-4 md:mt-0">
          <div className="mr-3">
            <Button
              sx={{
                bgcolor: "white",
                border: "1px solid #24A0FD",
                color: "#24A0FD",
                fontSize: "12px",
                width: { md: "105px", xs: "" },
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "white",
                  color: "#24A0FD",
                },
              }}
              onClick={() => navigate("/dashboard/collaboration")}
            >
              Cancel
            </Button>
          </div>
          <div>
            {loader ? (
              <CustomizedProgressBars/>
            ) : (
              <Button
                sx={{
                  bgcolor: "#24A0FD",
                  color: "white",
                  fontSize: "12px",
                  width: "175px",
                  textTransform: "none",
                  borderRadius: "5px",
                  ":hover": {
                    bgcolor: "#24A0FD",
                    color: "white",
                  },
                }}
                onClick={ editCommunity}
              >
                Save and Close
              </Button>
            )}
          </div>
        </div> */}
      </div>

      <Divider sx={{ my: 3 }} />
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
          Organization Name{" "}
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
              placeholder="Organization Name"
              value={communityData.name}
              onChange={(e) => {
                setCommunityData({
                  ...communityData,
                  name: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
          Organization Profile Picture{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div>
            <Avatar
              id="main_img"
              src={photo ? URL.createObjectURL(photo) : fetchedPhoto}
              variant="square"
              sx={{ width: "156px", height: "156px" }}
            />
            <input
              hidden
              type="file"
              id="hiddenfileinput"
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
            />
            <Button
              onClick={() => {
                document.getElementById("hiddenfileinput").click();
              }}
              sx={{
                bgcolor: "#24A0FD",
                mt: 1,
                border: "1px solid #24A0FD",
                color: "white",
                fontSize: "12px",
                width: "105px",
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
            >
              Upload photo
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
          Organization description{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div>
            <InputBase
              multiline
              rows={5}
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: "100%",
                py: "3px",
              }}
              placeholder="Community description"
              value={communityData.description}
              onChange={(e) => {
                setCommunityData({
                  ...communityData,
                  description: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Community category{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div className=" ">
            <ReactSelect
              styles={style}
              placeholder="Search categories..."
              options={cats}
              defaultOptions={cats}
              value={selectedCategory}
              menuPlacement="auto"
              menuPosition="fixed"
              noOptionsMessage={(opt) => {
                if (opt.inputValue === "") {
                  return "type a category";
                } else {
                  return "no search results for " + opt.inputValue;
                }
              }}
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(opt) => {
                setSelectedCategory(opt);
              }}
            />
          </div>
        </div> */}

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Tags{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>

          <div className="flex flex-wrap space-x-1">
            {tags &&
              tags.map((item, index) => (
                <div
                  className="text-xs flex space-x-2 bg-[#24A0FD] py-1 border-[1px] w-fit rounded-[20px] px-2 text-white  "
                  key={index}
                >
                  <div> {item.name} </div>
                  <div
                    className="text-red-900"
                    onClick={() => {
                      setTags(
                        tags.filter((e) => {
                          return e.name !== item.name;
                        })
                      );
                    }}
                  >
                    {" "}
                    <CancelOutlined sx={{ color: "", fontSize: "17px" }} />{" "}
                  </div>
                </div>
              ))}
          </div>
          <div>
            <InputBase
              sx={{
                bgcolor: "#EBF1F5",
                pl: 3,
                fontSize: "14px",
                borderRadius: "8px",
                width: "100%",
                py: "3px",
              }}
              placeholder="Add  tags here"
              id="tags_input_feild"
            />

            <div className="mt-3">
              <div
                className="text-[10px] text-red-600 italic font-semibold"
                id="tag_error"
                hidden
              >
                Tag must be more than 5 character
              </div>
              <Button
                onClick={() => {
                  if (
                    document.getElementById("tags_input_feild").value.length > 3
                  ) {
                    document.getElementById("tag_error").hidden = true;
                    setTags([
                      ...tags,
                      {
                        name: document.getElementById("tags_input_feild").value,
                      },
                    ]);
                    document.getElementById("tags_input_feild").value = "";
                  } else {
                    document.getElementById("tag_error").hidden = false;
                  }
                }}
                sx={{
                  bgcolor: "#24A0FD",
                  color: "white",
                  fontSize: "12px",
                  width: { md: "fit", xs: "fit" },
                  textTransform: "none",
                  borderRadius: "5px",
                  ":hover": {
                    bgcolor: "#24A0FD",
                    color: "white",
                  },
                }}
              >
                Add Tag
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-[30px] text-[12px]  ">
          <div className="font-bold mb-2 text-sm">Audience Channels</div>
          <div className="my-4">
            <Button
              onClick={() => {
                setOpenConnectPlatformModal(true);
              }}
              sx={{
                bgcolor: "#24A0FD",
                color: "white",
                fontSize: "12px",
                width: { md: "306px", xs: "150px" },
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "#24A0FD",
                  color: "white",
                },
              }}
            >
              Connect a Channel
            </Button>
            <ConnectPlatformModal
              open={openConnectPlatformModal}
              setOpen={setOpenConnectPlatformModal}
              channels={channels}
              setChannels={setChannels}
            />
          </div>
          <div className="md:w-[55vw] lg:w-full w-[85vw] overflow-x-auto">
            <div className="md:w-[850px] lg:w-full w-[1000px] ">
              <div className="grid grid-cols-9  items-center divide-x  bg-[#24A0FD] text-white  px-3 ">
                <div className="relative">
                  <div className="text-center">#</div>
                  <div className="absolute right-0 top-[-2px] ">
                    <KeyboardArrowDown
                      sx={{ color: "white", stroke: "#24A0FD", strokeWidth: 1 }}
                    />
                  </div>
                </div>

                <div className="col-span-2 py-2 pl-4">Digital Channel</div>

                <div className="col-span-2 py-2 pl-4">Size</div>

                <div className="relative col-span-2 py-2">
                  <div className="text-center">Platform link</div>
                  <div className="absolute right-2 top-[6px] ">
                    <Link
                      sx={{ color: "white", stroke: "#24A0FD", strokeWidth: 1 }}
                    />
                  </div>
                </div>

                <div className="col-span-2 py-2 text-center">Verified</div>
              </div>

              {channels &&
                channels.map((item, index) => (
                  <div
                    className="grid grid-cols-9  items-center divide-x  bg-[#EBF1F5] text-black  px-3 "
                    key={index}
                  >
                    <div className="relative">
                      <div className="text-center">{index + 1}</div>
                    </div>

                    <div className="col-span-2 py-2 pl-4">
                      {item.digital_channel}
                    </div>

                    <div className="col-span-2 py-2 pl-4">{item.size}</div>

                    <div className="col-span-2 py-2">
                      <span className="flex justify-center space-x-[2px]">
                        {" "}
                        <Launch
                          sx={{ fontSize: "", position: "relative", top: 2 }}
                        />{" "}
                        {item.platform_link}
                      </span>
                    </div>

                    <div className="col-span-2 py-2 text-center">No</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>



      <div className="lg:flex items-center mt-5">
        <div className=" flex-1 text-[#114369] font-[600] text-xl ">
        
        </div>

        <div className="flex  mt-4 md:mt-0">
          <div className="mr-3">
            <Button
              sx={{
                bgcolor: "white",
                border: "1px solid #24A0FD",
                color: "#24A0FD",
                fontSize: "12px",
                width: { md: "105px", xs: "" },
                textTransform: "none",
                borderRadius: "5px",
                ":hover": {
                  bgcolor: "white",
                  color: "#24A0FD",
                },
              }}
              onClick={() => navigate("/dashboard/collaboration")}
            >
              Cancel
            </Button>
          </div>
          <div>
            {loader ? (
              <CustomizedProgressBars/>
            ) : (
              <Button
                sx={{
                  bgcolor: "#24A0FD",
                  color: "white",
                  fontSize: "12px",
                  width: "175px",
                  textTransform: "none",
                  borderRadius: "5px",
                  ":hover": {
                    bgcolor: "#24A0FD",
                    color: "white",
                  },
                }}
                onClick={ editCommunity}
              >
                Save and Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCommunityProfile;

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
