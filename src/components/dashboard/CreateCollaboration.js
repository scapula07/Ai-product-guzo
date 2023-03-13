import {
  Cancel,
  CancelOutlined,
  KeyboardArrowDown,
  Launch,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  InputBase,
  Link,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ConnectPlatformModal from "../molecules/ConnectPlatformModal";
import CustomizedProgressBars from "../molecules/Progress";
import ShareCollaborationModal from "../molecules/ShareCollaborationModal";
import SuccessSnackbar from "../molecules/SuccessSnackbar";

const CreateCollaboration = ({ community }) => {
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [type, setType] = useState("public");
  const [links, setLinks] = useState([]);

  const [collaboration_id, setCollaborationId] = useState(null);

  const [openShareCollaborationModal, setOpenCollaborationModal] =
    useState(false);
  const navigate = useNavigate();
  const [collaboration, setCollaboration] = useState({
    user_id: JSON.parse(localStorage.getItem("user"))._id,
    title: "",
    description: "",
    need: "",
    is_public: true,
  });


  const createCollaboration = () => {
     if (
       collaboration.title.length < 2 ||
       collaboration.description.length < 2 ||
       collaboration.need.length < 2
     ) {
       document.getElementById("error_msg").innerHTML =
         "(Fill in all required feilds appropriately)";
       return;
     }

    console.log(links);

    setLoader(true);
    let url = process.env.REACT_APP_BACKEND_URL;
    let comm_ = JSON.parse(localStorage.getItem('community'))
    let comm = {
      id: comm_._id ||  community.value,
      name: comm_.name || community.label,
      profile_picture: comm_.profile_picture,
    };
    console.log(comm)
    axios
      .post(url + "/collaboration", { ...collaboration, links, comm })
      .then((res) => {
        console.log(res.data);
        setCollaborationId(res.data._id);

        //upload photo
        let file = document.getElementById("hiddenfileinput").files[0];
        let formdata = new FormData();
        formdata.append("photo", file);
        formdata.append("collaboration_id", res.data._id);
        console.log(formdata);
        axios
          .post(url + "/collaboration/photo", formdata)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        //upload support document
        let docs = document.getElementById("documents").files;
        for (let index = 0; index < docs.length; index++) {
          const item = docs[index];
          console.log(item.name);
          let formdata1 = new FormData();
          formdata1.append("support-document", item);
          console.log(res.data._id)
          formdata1.append("collaboration_id", res.data._id);
          formdata1.append("filename", item.name);

          console.log(formdata1);
          axios
            .post(url + "/collaboration/support-document", formdata1)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }

         setCollaboration({
           user_id: JSON.parse(localStorage.getItem("user"))._id,
           title: "",
           description: "",
           need: "",
           is_public: true,
         });
         setPhoto(null);
         setLinks([]);
         setDocuments(null);
         setOpenCollaborationModal(true);
         setLoader(false);
         setOpenSuccessSnack(true)
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <div className="bg-white py-[20px] px-[30px] md:rounded-[18px] shadow-lg ">
      <SuccessSnackbar msg={'Collaboration was successfully created'} duration='10000' 
      open={openSuccessSnack} setOpen={setOpenSuccessSnack}  />
      <div className="lg:flex items-center">
        <div className=" flex-1 text-[#114369] font-[600] text-xl ">
          <div> New Collaboration</div>
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
              onClick={() => navigate("/dashboard/my-collaborations")}
            >
              Cancel
            </Button>
          </div>
          <div>
            <ShareCollaborationModal
              open={openShareCollaborationModal}
              setOpen={setOpenCollaborationModal}
              collaboration_id={collaboration_id}
            />
            {loader ? (
              <CustomizedProgressBars />
            ) : (
              <Button
                onClick={createCollaboration}
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
              >
                Create and Save
              </Button>
            )}
          </div>
        </div> */}
      </div>

      <Divider sx={{ my: 3 }} />
      <div id="error_msg" className="text-xs text-red-500 text-center"></div>
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Collaboration Photo{" "}
            <span className="text-black font-normal text-[10px] ">
              (Optional)
            </span>
          </div>
          <div>
            <Avatar
              src={photo ? URL.createObjectURL(photo) : null}
              variant="square"
              sx={
                !photo
                  ? {
                      width: "156px",
                      height: "156px",
                      fontSize: "12px",
                      bgcolor: "#EBF1F5",
                      color: "gray",
                    }
                  : {
                      width: "156px",
                      height: "156px",
                      fontSize: "12px",
                      color: "gray",
                    }
              }
              onClick={() => {
                document.getElementById("hiddenfileinput").click();
              }}
            >
              Click to upload photo
            </Avatar>
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
            Collaboration Title{" "}
            <span className="text-[#FF6060] font-normal text-[10px]  ">
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
                width: { lg: "800px", md: "400px", xs: "100%" },
                py: "3px",
              }}
              placeholder="e.g., Project Title, Event Title, Communication Campaign Title"
              onChange={(e) => {
                setCollaboration({ ...collaboration, title: e.target.value });
              }}
              value={collaboration.title}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Collaboration Description{" "}
            <span className="text-[#FF6060] font-normal text-[10px]  ">
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
                width: { lg: "800px", md: "400px", xs: "100%" },
                py: "3px",
              }}
              multiline
              rows={6}
              placeholder="Describe your project, event, or campaign in this field."
              onChange={(e) => {
                setCollaboration({
                  ...collaboration,
                  description: e.target.value,
                });
              }}
              value={collaboration.description}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Ask{" "}
            <span className="text-[#FF6060] font-normal text-[10px]  ">
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
                width: { lg: "800px", md: "400px", xs: "100%" },
                py: "3px",
              }}
              multiline
              rows={6}
              placeholder="Clearly share how your partners can help? (Segment the needs based on category.)"
              onChange={(e) => {
                setCollaboration({ ...collaboration, need: e.target.value });
              }}
              value={collaboration.need}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Support Documents{" "}
            <span className="text-[#818181] font-normal text-[10px]  ">
              (Optional)
            </span>
          </div>
          <input
            type="file"
            hidden
            id="documents"
            multiple
            onChange={(e) => {
              setDocuments(e.target.files);
              let fl = e.target.files.length;
              let docs = [];
              for (let i = 0; i < fl; i++) {
                docs.push(e.target.files[i]);
              }
              console.log(docs);
              setDocuments(docs);
            }}
          />
          <div
            className="bg-[#EBF1F5] w-full md:w-[400px] lg:w-[800px] text-[11px] py-[40px] px-3 "
            onClick={() => {
              document.getElementById("documents").click();
            }}
          >
            {documents &&
              documents.map((item, index) => (
                <div key={index}>
                  {" "}
                  {item.name} {index + 1 === documents.length ? "" : ","}{" "}
                </div>
              ))}

            {!documents && (
              <>
                <div className="text-center">Drag and drop a file here</div>

                <div className="text-center text-[#24A0FD] ">
                  Select a <span className="underline">local file</span>{" "}
                </div>
              </>
            )}
          </div>

          {documents && (
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
              onClick={() => {
                setDocuments(null);
              }}
            >
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-[#818181] font-semibold text-[14px] ">
            Support Links{" "}
            <span className="text-[#818181] font-normal text-[10px]  ">
              (Optional)
            </span>
          </div>
          <div className="text-[10px] font-semibold text-[#114369] ">
            Share a link to help communicate the scope of your project, event,
            or campaign.
          </div>
          {links &&
            links.map((item, index) => (
              <div
                key={index}
                className="text-[13px] bg-gray-50 md:w-[400px] px-2 "
              >
                <div className="flex items-center justify-between ">
                  <div>
                    <div className="font-semibold">{item.link} </div>
                    <div className=" font-normal ">{item.description} </div>
                  </div>

                  <div>
                    <CancelOutlined
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        setLinks(
                          links.filter((k) => {
                            console.log(k.link);
                            console.log(item.link);
                            return k.link !== item.link;
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
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
              placeholder="Link Description"
              id="link_description"
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
                py: "3px",
              }}
              placeholder="Add Link here ..."
              id="link_url"
            />
          </div>

          <div className="mt-3">
            <div
              id="link_error_text"
              hidden
              className="text-red-600 text-[10px] italic font-semibild mb-1 "
            >
              {" "}
              links and description must be more than 5 characters{" "}
            </div>
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
              onClick={() => {
                let description =
                  document.getElementById("link_description").value;
                let link = document.getElementById("link_url").value;

                if (description.length < 5 || link.length < 5) {
                  document.getElementById("link_error_text").hidden = false;
                } else {
                  document.getElementById("link_error_text").hidden = true;
                  setLinks([
                    ...links,
                    {
                      description,
                      link,
                    },
                  ]);

                  document.getElementById("link_description").value = "";
                  document.getElementById("link_url").value = "";
                }
              }}
            >
              Add Link
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-[11px] font-normal">
          <div>
            {" "}
            Select “Public” to add this Collaboration to the Guzo Feed in
            addition to sharing outside of Guzo.
          </div>
          <div>
            Select “Private” if you do not want to share this Collaboration with
            the Guzo feed.
          </div>

          <div className="font-normal text-[10px] mt-2">(Required)</div>

          <div className="mt-3 flex space-x-2 font-normal ">
            <div
              onClick={() => {
                setType("public");
                setCollaboration({ ...collaboration, is_public: true });
              }}
              className={
                type === "public"
                  ? "bg-[#24A0FD] text-white px-4 py-2 rounded-[8px] cursor-pointer "
                  : "text-[#24A0FD] bg-white px-4 py-2 rounded-[8px] cursor-pointer "
              }
            >
              public
            </div>
            <div
              onClick={() => {
                setType("private");
                setCollaboration({ ...collaboration, is_public: false });
              }}
              className={
                type === "private"
                  ? "bg-[#24A0FD] text-white px-4 py-2 rounded-[8px] cursor-pointer "
                  : "text-[#24A0FD] bg-white px-4 py-2 rounded-[8px] cursor-pointer "
              }
            >
              Private
            </div>
          </div>
        </div>
      </div>


      <div className="lg:flex items-center mt-4">
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
              onClick={() => navigate("/dashboard/my-collaborations")}
            >
              Cancel
            </Button>
          </div>
          <div>
            <ShareCollaborationModal
              open={openShareCollaborationModal}
              setOpen={setOpenCollaborationModal}
              collaboration_id={collaboration_id}
            />
            {loader ? (
              <CustomizedProgressBars />
            ) : (
              <Button
                onClick={createCollaboration}
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
              >
                Create and Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollaboration;

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
