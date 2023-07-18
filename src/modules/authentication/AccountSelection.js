import {
  Add,
  Business,
  Circle,
  NetworkCell,
  NetworkCheck,
  NetworkWifi,
  NetworkWifi2BarRounded,
  Person,
  WifiTethering,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountSelection = () => {
  const navigate = useNavigate();
  const [selected , setSelected] = useState(0)
  return (
    <div className="grid lg:grid-cols-3 gap-7 w-full lg:px-[80px] px-[10px]   ">
      <div className="mt-[44%]">
        <div className=" lg:static lg:flex justify-center sm:absolute top-5 left-5 ">
          <img src="/guzo22.png"className=" w-[20px] lg:w-[40px]" />
        </div>
        <div className="lg:flex justify-center hidden">
          <img src="/guzo-text.png" />
        </div>
      </div>

      <div className="col-span-2">

      <div className="bg-white lg:mt-[10%] h-full lg:h-fit  px-[33px] py-[35px] rounded-[10px]">
        <div className="text-[28px] leading-[34px] font-semibold text-center">
          Create a new Guzo Space.
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-[6vh] lg:px-[100px]">
          <Account_type
            index={1}
            setSelected={setSelected}
            selected={selected}
            Icon={<MultiIcon />}
            account_type={"Single Org"}
            description={"$0.00"}
            adds={
              "Are you a business, non-profit, individual organization, or contributor to an ecosystem?  Select this option."
            }
            route="/new/register/organization"
            notes={[
              " Unlimited Opportunity Posts",
              "Join Unlimited Ecosystems",
              "Up to three (3) teammates per entity",
            ]}
          />
          <Account_type
          index={2}
          setSelected={setSelected}
          selected={selected}
            Icon={<MultiIcon2 />}
            account_type={"Premium Organization Space"}
            description={"$49.99/mo"}
            adds={
              "Are you an ecosystem, network, association, chamber, affinity group, cooperative, or hub for a larger community? Select this option."
            }
            notes={[
              " Everything from “Single Org”, Plus:",
              "Ecosystem Management",
              "Member Directory",
              " Private Feed",
            ]}
          />
        </div>


        
      </div>


      <div className="flex justify-between mt-[5vh] px-4 mb-3">
          <div
            className="text-[15px] text-[#4335EF] cursor-pointer "
            onClick={() => navigate(-1)}
          >
            Back
          </div>
          <Button
          disabled={selected === 0 && true}
            sx={{
              backgroundColor: "#ECEBFE",
              color: "#4335EF",
              borderRadius: "22px",
              px: 5,
              fontSize: "15px",
              textTransform: "none",
            }}

            onClick={()=>{
              if(selected === 1 ){
                navigate("/new/auth/organization-profile");
              }
              if(selected === 2 ){
                navigate("/new/auth/ecosystem-profile");
              }
            }}
          >
            Continue
          </Button>
        </div>

        </div>
    </div>
  );
};

export default AccountSelection;

const Account_type = ({
  Icon,
  account_type,
  description,
  route,
  notes,
  adds,
  index,
  setSelected,
  selected
}) => {
  const navigate = useNavigate();
  return (
 
    <div
      className=
      {selected === index  ? "border-[2px] rounded-[10px]   border-[#4438F3]  shadow-md lg:py-[80px] py-[50px] px-5 cursor-pointer ": "border-[1px] rounded-[10px] border-[#8E8E8E]  lg:py-[80px] py-[50px] px-5 cursor-pointer "}
      onClick={()=> {
        setSelected(index)
      }}
    >
      <div className="flex justify-center">{Icon}</div>
      <div className="text-[15px] text-black  font-semibold text-center">
        {account_type}
      </div>
      <div className="text-[12px] text-black font-normal text-center mt-3">
        {description}
      </div>

      <div className="flex justify-center mt-[10px]">
        <div>
          {adds && (
            <div className="text-[12px] my-1  text-left mb-2"> {adds} </div>
          )}

          <div className="font-bold text-[14px]">Includes:</div>
          {notes &&
            notes.length > 0 &&
            notes.map((item, index) => (
              <div className="text-[12px] my-1  text-left">
                <Circle sx={{ color: "black", fontSize: "8px", mr: 1 }} />
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const MultiIcon = () => {
  return (
    <div className="flex  justify-center">
      <img src="/guzo22.png" className=" w-[24px]  " />
    </div>
  );
};

const MultiIcon2 = () => {
  return (
    <div className="flex  justify-center">
      <img src="/guzo-yellow.png" className=" w-[24px]  " />
    </div>
  );
};
