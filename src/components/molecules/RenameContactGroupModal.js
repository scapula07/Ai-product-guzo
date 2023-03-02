import { Button, Dialog, InputBase } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RenameContactGroupModal = ({open, setOpen, getContactGroups, id, name, setName}) => {
 
  const [user_id, setUserId] = useState(JSON.parse(localStorage.getItem("user"))._id|| null)
  const updateContactGroup = async() =>{
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/contact/edit-contact-group", {
        name,
        contact_group_id : id
      })
      .then((res) => {
       console.log(res.data)
       setOpen(false)
       getContactGroups()
       
      })

      .catch((err) => {
        console.log(err);
      });
  }

 

  useEffect(() => {
    getContactGroups()
  }, [])
  



  return (
   <Dialog
   open={open}
   onClose={()=> setOpen(false)}
   
   >
    <div className='px-5 py-6 text-center text-[14px]' >
       <div className='font-bold' >Name your new contact group</div>
       <div className='my-5' >
       <div className="  mt-2 md:mt-0">
          <InputBase
            sx={{
              bgcolor: "#EBF1F5",
              borderRadius: "7px",
              px: 4,
              width: '100%',
              py: "5px",
            }}
            placeholder="Contact Group Name here..."
            value={name}
            onChange={(e)=> setName(e.target.value)}
           
          />
        </div>
       </div>
       <div className="mt-9" >
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "12px",
              width: "fit",
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
              px: 5 
            }}
            onClick={updateContactGroup}
          >
            Update Contact Group
          </Button>
          </div>
    </div>
   </Dialog>
  )
}

export default RenameContactGroupModal