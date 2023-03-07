import { Circle, MoreHoriz, SearchOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import DeleteTeammateModal from "../molecules/DeleteTeammateModal";
import MessageContacts from "../molecules/MessageContacts";
import MessageModal from "../molecules/MessageModal";
import { io } from "socket.io-client";

const DirectMessages = ({community, setCommunity}) => {
  const [open, setOpen] = React.useState(false);
  const [contactGroups, setContactGroups] = useState(null);
  const [direct_messages, setDirectMessages] = useState(null);
  const [message, setMessage] = useState("");
  const getContactGroups = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/contact/" + JSON.parse(localStorage.getItem("community"))._id)
      .then((res) => {
        console.log(res.data);
        setContactGroups(res.data);
        setDirectMessages(res.data[0].direct_messages);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const addDirectMessage = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/contact/add-direct-message/", {
        user_id: JSON.parse(localStorage.getItem("user"))._id,
        username: JSON.parse(localStorage.getItem("user")).username,
        message,
        time: Date.now(),
      })
      .then((res) => {
        console.log(res.data);
        setDirectMessages(res.data.direct_messages);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getContactGroups();
  }, []);


  const [socket, setSocket] = useState(null)
  useEffect(() => {
    
    setSocket(io.connect('http://localhost:8080'))
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('new_user',(data)=>{
        console.log(data)
      })
    }
  }, [socket]);

  return (
    <div className="bg-white py-[20px] pb-[80px]  md:rounded-[18px] shadow-lg">
      <div className="md:flex space-y-2 md:space-y-0 items-center px-[30px]">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Direct Messages
        </div>
      </div>

      <Divider sx={{ my: 3 }} />
      <MessageModal
        open={open}
        setOpen={setOpen}
      />
      <div className="grid grid-cols-5 gap-4 md:px-[30px]">
        <div className=" hidden lg:block col-span-2 shadow-lg py-2 px-3 space-y-4 rounded-xl ">
          <MessageContacts  />
        </div>

        <div className="col-span-5 lg:col-span-3 shadow-lg py-2 pb-6 px-3 space-y-4 rounded-xl ">
         

          {/* messages */}

          <div className="space-y-4">
            {/* message */}

            {direct_messages &&
              direct_messages.map((item, index) => (
                <div className="space-y-4" key={index}>
                  <div className="flex items-center">
                    <Avatar
                      variant="square"
                      src="/woman.png"
                      sx={{
                        bgcolor: "blue",
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                      }}
                    >
                     {item.name.substr(0,1)}
                    </Avatar>

                    <div className="font-semibold text-[14px] ml-3 flex-1">
                      {item.username}
                    </div>

                    <div className="text-[12px] text-[#114369] ">12:30</div>
                  </div>
                  <div className="w-full bg-[#EBF1F5] px-4 py-2 text-[12px] rounded-lg ">
                   {item.message}
                  </div>
                </div>
              ))}

            <div className="w-full">
              <InputBase
                multiline
                rows={5}
                sx={{
                  bgcolor: "#FAFAFA",
                  border: "1px solid #E6E6E6",
                  pl: 3,
                  fontSize: "14px",
                  borderRadius: "8px",
                  width: { md: "100%", xs: "100%" },
                  py: "2px",
                }}
                placeholder="your message here"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />

              <div className="flex items-center ">
                <div className="flex-1" />
                <Button
                  onClick={addDirectMessage}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#24A0FD",
                    color: "white",
                    border: "1px solid #24A0FD",
                    ":hover": {
                      bgcolor: "#24A0FD",
                      color: "white",
                    },
                    mt: 1,
                  }}
                >
                  send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
