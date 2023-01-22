import {
  Cancel,
  CancelOutlined,
  KeyboardArrowDown,
  Launch,
} from "@mui/icons-material";
import { Avatar, Button, Divider, InputBase, Link } from "@mui/material";
import React, { useState } from "react";
import ReactSelect from "react-select";
import ConnectPlatformModal from "../molecules/ConnectPlatformModal";
import ShareCollaborationModal from "../molecules/ShareCollaborationModal";

const CreateCollaboration = () => {
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [type, setType] = useState("public");
  const [links, setLinks] = useState([]);

  const [openShareCollaborationModal, setOpenCollaborationModal] = useState(false)

  return (
    <div className="bg-white py-[20px] px-[30px] md:rounded-[18px] shadow-lg ">
      <div className="lg:flex items-center">
        <div className=" flex-1 text-[#114369] font-[600] text-xl ">
          <div> New Collaboration</div>
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
            >
              Cancel
            </Button>
          </div>
          <div>
            <ShareCollaborationModal open={openShareCollaborationModal} setOpen={setOpenCollaborationModal} />
            <Button
            onClick={()=> setOpenCollaborationModal(true)}
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
          </div>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Collaboration Photo{" "}
            <span className="text-black font-thin text-[10px] ">
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
            <span className="text-[#FF6060] font-thin text-[10px]  ">
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
            />
          </div>
        </div>

        

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Collaboration Description{" "}
            <span className="text-[#FF6060] font-thin text-[10px]  ">
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
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            The Need{" "}
            <span className="text-[#FF6060] font-thin text-[10px]  ">
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
            />
          </div>
        </div>

        
        <div className="space-y-2">
          <div className="text-[#114369] font-semibold text-[14px] ">
            Support Documents{" "}
            <span className="text-[#818181] font-thin text-[10px]  ">
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
            <span className="text-[#FF6060] font-thin text-[10px]  ">
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
                    <div className="font-semibold">{item.url} </div>
                    <div className=" font-thin ">{item.description} </div>
                  </div>

                  <div>
                    <CancelOutlined
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        setLinks(
                          links.filter((k) => {
                            console.log(k.url);
                            console.log(item.url);
                            return k.url !== item.url;
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
                let url = document.getElementById("link_url").value;

                if (description.length < 5 || url.length < 5) {
                  document.getElementById("link_error_text").hidden = false;
                } else {
                  document.getElementById("link_error_text").hidden = true;
                  setLinks([
                    ...links,
                    {
                      description,
                      url,
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

        <div className="space-y-2 text-[11px] font-thin">
          <div>
            {" "}
            Select “Public” to add this Collaboration to the Guzo Feed in
            addition to sharing outside of Guzo.
          </div>
          <div>
            Select “Private” if you do not want to share this Collaboration with
            the Guzo feed.
          </div>

          <div className="font-thin text-[10px] mt-2">(Required)</div>

          <div className="mt-3 flex space-x-2 font-normal ">
          <div
          onClick={()=> {
            setType('public')
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
            onClick={()=> {
                setType('private')
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
