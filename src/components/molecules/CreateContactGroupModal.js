import { Button, Dialog, InputBase } from '@mui/material'
import React from 'react'

const CreateContactGroupModal = ({open, setOpen}) => {
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
          >
            Create Contact Group
          </Button>
          </div>
    </div>
   </Dialog>
  )
}

export default CreateContactGroupModal