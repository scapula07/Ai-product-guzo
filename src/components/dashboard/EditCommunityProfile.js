import { CancelOutlined, KeyboardArrowDown, Launch } from "@mui/icons-material";
import { Avatar, Button, Divider, InputBase, Link } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ConnectPlatformModal from "../molecules/ConnectPlatformModal";

const EditCommunityProfile = () => {
  const [photo, setPhoto] = useState(null);
  const [channels, setChannels] = useState([
    
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const [community, setCommunity] = useState(
    JSON.parse(localStorage.getItem("community")) || null
  );

  const [communityData, setCommunityData] = useState({
    user_id: JSON.parse(localStorage.getItem("user"))._id,
    name: "",
    description: "",
  });

  const createCommunity = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/community", communityData)
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
          })
          .catch((err) => {
            console.log(err);
          });

        //community tags
        for (let index = 0; index < tags.length; index++) {
          const tag = tags[index];
          console.log(tag);
          axios
            .post(url + "/community/add-community-tag", {
              community_id: res.data._id,
              name: tag.name,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        //community channels
        for (let index = 0; index < channels.length; index++) {
          const channel = channels[index];
          console.log(channel);
          axios
            .post(url + "/community/add-community-channel", {
              community_id: res.data._id,
              digital_channel: channel.digital_channel,
              size: channel.size,
              platform_link: channel.platform_link,
              is_verified: false,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }

       setCommunityData({
          user_id: JSON.parse(localStorage.getItem("user"))._id,
          name: "",
          description: "",
        });

        setChannels([])
        setTags([])
        setPhoto(null)

        
      })

      
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-white py-[20px] px-[30px] md:rounded-[18px] shadow-lg ">
      <div className="lg:flex items-center">
        <div className=" flex-1 text-[#114369] font-[600] text-xl ">
          <div>
            {" "}
            {!community ? "Create Community Profile" : "Edit Community Profile"}
          </div>
          <div className="text-xs font-light text-dark">
            {!community
              ? "Create your community profile"
              : "Edit your community profile."}
          </div>
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
              onClick={createCommunity}
            >
              Save and Close
            </Button>
          </div>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Community name{" "}
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
              placeholder="Community name"
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
            Community profile picture{" "}
            <span className="text-black font-thin text-[10px] ">
              (Required)
            </span>
          </div>
          <div>
            <Avatar
              src={
                photo ? URL.createObjectURL(photo) : "/picture_placeholder.png"
              }
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
            Community description{" "}
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

              {channels && channels.map((item,index)=> (
                <div className="grid grid-cols-9  items-center divide-x  bg-[#EBF1F5] text-black  px-3 " key={index} >
                <div className="relative">
                  <div className="text-center">{index+1}</div>
                </div>

                <div className="col-span-2 py-2 pl-4">{item.digital_channel}</div>

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
