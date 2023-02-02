import { Button, Dialog, Divider } from '@mui/material'
import React from 'react'

const DeleteTeammateModal = ({open, setOpen}) => {
  return (
   <Dialog
   open={open}
   onClose={()=> setOpen(false)}
   >
    <div className='px-5 py-6 text-left text-[14px]' >
       <div className='text-[#114369] text-[16px] font-bold ' >Warning</div>
       <Divider/>
       <div className='my-5' >You’re about to delete a teammate, are you sure you want to continue</div>
       <div className="my-4 flex justify-right space-x-3" >
        <div className='flex-1'/>
          <Button
            sx={{
              bgcolor: "white",
              border:'1px solid #24A0FD',
              color: "#24A0FD",
              fontSize: "12px",
              width: {xs:"306px", sm:''},
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "white",
                color: "#24A0FD",
              },
            }}
            onClick={()=>{
                setOpen(false)
            }}
          >
            Cancel
          </Button>

          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "12px",
              width: {xs:"306px", sm:''},
              textTransform: "none",
              borderRadius: "5px",
              ":hover": {
                bgcolor: "#24A0FD",
                color: "white",
              },
            }}
          >
            Continue
          </Button>
          </div>
    </div>
   </Dialog>
  )
}

export default DeleteTeammateModal