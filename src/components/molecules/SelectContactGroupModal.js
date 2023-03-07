import { Button, Dialog, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

const SelectContactGroupModal = ({ open, setOpen, contactGroups, contact , setLoader}) => {
  const [selectedContactGroup, setSelectedContactGroup] = useState(null);
  const [cats,  setCats] = useState(contactGroups.map((item,index)=> ({
    label: item.name,
    value: item._id,
  })))

  const style = {
    control: (base) => ({
      ...base,
      border: "0px transparent ",
      borderRadius: "2rem",
      width: "100%",
      boxShadow: "none",
      backgroundColor: "white",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "fit",
      },
    }),
  };

  const addContact = async(contact) => {
    setLoader(true)
    setOpen(false);
    let url = process.env.REACT_APP_BACKEND_URL;
    console.log({...contact,contact_group_id : selectedContactGroup.value})
    axios
      .post(url + "/contact/add/",{contact,contact_group_id : selectedContactGroup.value})
      .then((res) => {
        console.log(res.data);
        setLoader(false)
      
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="px-5 py-6 text-center text-[14px]">
        <div className=" shadow-lg  rounded-[1rem] pt-1 mx-2 md:mx-0 w-[60vw] lg:w-fit ">
          <ReactSelect
            styles={style}
            placeholder="Select Contact Group"
            options={cats}
            defaultOptions={cats}
            value={selectedContactGroup}
            menuPlacement="auto"
            menuPosition="fixed"
            noOptionsMessage={(opt) => {
              if (opt.inputValue === "") {
                return "Select Contact Group";
              } else {
                return "no search results for " + opt.inputValue;
              }
            }}
            components={{
              IndicatorSeparator: () => null,
            }}
            onChange={(opt) => {
              setSelectedContactGroup(opt);
            }}
          />
        </div>

        <Button
        disabled = {selectedContactGroup ? false : true}
          sx={{

            bgcolor: "#24A0FD",
            color: "white",
            border: "1px solid #24A0FD",
            fontSize: "14px",
            textTransform: "none",
            borderRadius: "5px",
            px: 4,
            mt: 2,
            ":hover": {
              bgcolor: "#24A0FD",
              color: "white",
            },
          }}

          onClick={()=> {
            addContact({
                name: contact.first_name+' '+contact.last_name,
                email: contact.email || null,
                phone_number: contact.phone_number || null,
                user_id: contact.user_id || null
            })
          }}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
};
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
export default SelectContactGroupModal;
