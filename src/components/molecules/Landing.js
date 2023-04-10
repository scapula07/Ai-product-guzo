import { Box, Button, CircularProgress, Dialog, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import CustomizedProgressBars from "./Progress";

const LandingModal = ({open, setOpen,community, setCommunity}) => {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null)
  const [communities, setCommunities] = useState(
    JSON.parse(localStorage.getItem("user"))?.communities || null
  );
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const style = {
    control: (base) => ({
      ...base,
      border: "0px solid gray",
      width: "100%",
      boxShadow: "none",
      backgroundColor: "#D1DEE7",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "1000px",
      },
      "@media (min-width:1200px)": {
        width: "210px",
      },
    }),
  };

  const community_id = localStorage.getItem('community_idd') || null
  useEffect(() => {
    
   if(community_id){
    getCommunity(community_id)
    localStorage.removeItem('community_idd')
   }
  }, [])
  

  const [selectedCommunity, setSelectedCommunity] = useState(null)

 
  


  const getCommunity = async (comm_id) => {
    let url = process.env.REACT_APP_BACKEND_URL;
    setLoader(true)
    axios
      .get(url + "/community/get-community-by-id/" + comm_id)
      .then((res) => {
        setLoader(false)
        if (
          res.data &&
          Object.keys(res.data).length === 0 &&
          Object.getPrototypeOf(res.data) === Object.prototype
        ) {
          setCommunity(null);
          setLoader(false)
        } else {
          console.log(res.data);
          let community = res.data;
          localStorage.setItem("community", JSON.stringify(community));
          setCommunity({label: community?.name, value: community?._id});
          setOpen(false)
          navigate('/dashboard/discover')
          setLoader(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });


  };

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") 
        return;
    setOpen(false);
}

  
  return (
   <Dialog open={open} 
   sx={{
    bgcolor:'rgb(17,67,105,0.5)',
    backdropFilter: 'blur(8px)'
   }}
   >
     <div className="flex justify-center ">
      <div className="bg-white lg:w-[70vw] md:rounded-[20px] md:shadow-lg py-[30px] px-[40px]  ">

        <div className="mt-4 flex justify-center " >
            <img src='/logo.png'/>
        </div> 


        <div className="text-[#114369] text-center font-bold text-[12px] mt-2" >
        To use Guzo, {communities && communities.length > 0  && 'select a Organization or'} please create an organization
        </div>


       {communities && communities.length> 0 && (
         <div className="text-center  text-[19px] font-bold space-x-4 md:flex justify-center mt-4 text-[#114369] ">
      

      <div className=" flex justify-center ">
           {loader && (  <div >
       <CustomizedProgressBars/>
    </div> )}
    
    {communities &&communities.length > 0 ? (
             <ReactSelect
             styles={style}
             placeholder="Select Organization..."
             options={communities && communities.map((item,index)=> ({label:item.name,value:item.id}))}
             value={selectedCommunity}
             menuPlacement="auto"
             menuPosition="fixed"
             noOptionsMessage={(opt) => {
               if (opt.inputValue === "") {
                 return "type a category";
               } else {
                 return "no search results for " + opt.inputValue;
               }
             }}
             components={{
               IndicatorSeparator: () => null,
             }}
             onChange={(opt) => {
               setSelectedCommunity(opt);
               getCommunity(opt.value)
             }}
           />
           ): null}
          </div>

           
           
     
       </div>
       )}
        <div className="text-center  text-[19px] font-bold space-x-4 md:flex justify-center mt-4 text-[#114369] ">
      
        {loader ? (""): (
               <Button
               sx={{
                 bgcolor: "white",
                 border: "1px solid #24A0FD",
                 color: "#24A0FD",
                 fontSize: "12px",
                 width: { md: "fit", xs: "fit" },
                 px: 2,
                 textTransform: "none",
                 borderRadius: "5px",
                 ":hover": {
                   bgcolor: "white",
                   color: "#24A0FD",
                 },
               }}
               onClick={()=> {
                 navigate('/dashboard/create-community-profile')
                 setOpen(false)
                }}
               
             >
              Create New Organization
             </Button>
           )}
       

       

          
    
      </div>
       
      </div>
    </div>
   </Dialog>
  );
};

export default LandingModal;
