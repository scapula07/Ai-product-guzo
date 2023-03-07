import { MoreHoriz, SearchOutlined } from '@mui/icons-material'
import { Avatar, CircularProgress, Divider, InputBase } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MessageContacts = () => {
  const [users, setUsers] = useState(null)
  const [loader, setLoader ] = useState()
  const [community, setCommunity] = useState(JSON.parse(localStorage.getItem('community')) || null)
  const getAllUsers = async () => {
    setLoader(true)
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(url + "/user")
      .then((res) => {
        setUsers(res.data)
       setLoader(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <div className="  py-2 px-3 space-y-4 rounded-xl ">
       <div className='text-sm font-bold text-center hidden lg:block'>{JSON.parse(localStorage.getItem('community')).name} group chat</div>
            <div className=" md:block lg:block mt-2 md:mt-0">
              <InputBase
                sx={{
                  bgcolor: "#EBF1F5",
                  borderRadius: "4px",
                  px: 4,
                  width: { xs: "100%" },
                  py: "px",
                }}
                placeholder="Search..."
                endAdornment={
                  <SearchOutlined
                    sx={{ fontWeight: "300", cursor: "pointer" }}
                  />
                }
              />
            </div>

            <div className="space-y-3">
            {loader ? (
        <div className="flex items-center"> 
        <CircularProgress sx={{ color: '#24A0FD' }} />
        </div>
      ): (
        <div className="mt-[5vw] space-y-[5vw] md:space-y-[15px] ">
       

       {users && users.map((item,index)=> 
      {
       
        if(  item.communities.find(e=> e.id == community._id)){
           
          return(
            <div key={index} > 
                  <div className="flex items-center mb-3">
                <Avatar
                  variant="square"
                  src=""
                  sx={{
                    bgcolor: "blue",
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  {item.username.substr(0,1)}
                </Avatar>

                <div className="font-semibold text-[14px] ml-3 flex-1">
                 {item.username}
                </div>

                <div className="border-[1px] border-[#24A0FD] p-1 rounded-lg cursor-pointer">
                  <MoreHoriz sx={{ color: "#24A0FD" }} />
                </div>
              </div>
              <Divider/>
                </div>
          )
        }

      }
       )}
      </div>
      )}
             

              
            </div>
          </div>
  )
}

export default MessageContacts