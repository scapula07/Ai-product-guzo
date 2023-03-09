import { Avatar, Button, CircularProgress, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";

const CollaborationScreen = () => {
  const navigate = useNavigate();
  const { collaboration_id } = useParams();
  const [collaboration, setCollaboration] = useState({});
  const [loader, setLoader] = useState(true);
  const [error__, setError] = useState(false);
  const [user, setUser] =  useState(JSON.parse(localStorage.getItem('user'))|| null)

  const getCollaboration = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/collaboration/" + collaboration_id)
      .then((res) => {
        //console.log(res.data)
        setCollaboration(res.data);
        setLoader(false);
        console.log(res.data)
        if(!res.data._doc){
          setLoader(false);
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setError(true);
      });
  };

  useEffect(() => {
    getCollaboration();
  }, []);

  return (
    <>
      {loader ? (
        <div className="flex justify-center  ">
          <div className="flex-1" />
          <CustomizedProgressBars />
        </div>
      ) : (
        <div className="flex justify-center">
          {error__ ? (
            <div> Collaboration not found</div>
          ) : (
            <>
            {collaboration._doc.is_public ? (
              <div className="bg-white lg:w-[70vw] rounded-[20px] shadow-lg py-[30px] px-[40px]  ">
              <div className="text-center  text-[30px]  font-extrabold ">
                <div>{collaboration._doc.community.name} </div>

                <div className="font-semibold"> requests your support... </div>
              </div>

              <div className="text-center  text-[25px] font-bold flex justify-center mt-3">
                <Avatar
                  variant="square"
                  src={collaboration._doc.photo}
                  sx={{ width: "300px", height: "200px", borderRadius: "20px" }}
                />
              </div>

              <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
                {collaboration._doc.title}
              </div>

              <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                {collaboration._doc.description}
              </div>

              <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
                The Need
              </div>

              <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                {collaboration._doc.need}
              </div>

              <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
                Support Links
              </div>

              <div>
                <div>
                  {collaboration &&
                    collaboration._doc.support_links.map(
                      (item, index) => (
                        <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                          {item.description}

                          <div
                            className="underline text-[#24A0FD]"
                            onClick={() => window.open(item.link, "_blank")}
                          >
                            {item.link}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>


              <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
                Support Documents
              </div>

              <div>
                <div>
                  {collaboration &&
                    collaboration.collaborationSupportDocuments.map(
                      (item, index) => (
                        <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] ">
                          <div
                            className="underline text-[#24A0FD]"
                            onClick={() => window.open(item.document, "_blank")}
                          >
                            {item.name}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div className="text-center  text-[19px] font-bold flex justify-center mt-4 text-[#114369] ">
                Will you collaborate us??
              </div>

              {/* <div className="text-left  text-[13px] font-semibold mt-4 text-[#114369] mb-2 ">
                Please tell us your organizations name and let us know your
                willingness to help.
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
              </div> */}

              <div className="text-center  text-[19px] font-bold  space-x-4 md:flex justify-center mt-4 text-[#114369] ">
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
                  onClick={() => {
                   if(user){
                    navigate("/collaboration/contact-capture/"+collaboration._doc._id);
                   }else(
                    navigate('/auth/login?collaboration_id='+collaboration._doc._id)
                   )
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

                  onClick={() => {
                    if(user){
                      navigate("/dashboard/discover");
                     }else(
                      navigate('/auth/login')
                     )
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
                    mt: { xs: 2, sm: 0, lg: 0 },
                    ":hover": {
                      bgcolor: "#24A0FD",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    if(user){
                      navigate("/collaboration/contact-capture/"+collaboration._doc._id);
                     }else(
                      navigate('/auth/login?collaboration_id='+collaboration._doc._id)
                     )
                  }}
                >
                  Maybe, Keep me informed
                </Button>
              </div>
            </div>
            ): (
              <div> Collaboration is private</div>
            )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CollaborationScreen;
