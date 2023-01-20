import { Button, Dialog } from '@mui/material'
import React from 'react'

const ConnectPlatformModal = ({open, setOpen}) => {
  return (
   <Dialog
   open={open}
   onClose={()=> setOpen(false)}
   >
    <div className='px-5 py-6 text-center text-[14px]' >
       <div>connect and verify a social media flow here</div>
       <div className='my-5' >select a platform from the list</div>
       <div className="my-4" >
          <Button
            sx={{
              bgcolor: "#24A0FD",
              color: "white",
              fontSize: "12px",
              width: "306px",
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
          </div>
    </div>
   </Dialog>
  )
}

export default ConnectPlatformModal