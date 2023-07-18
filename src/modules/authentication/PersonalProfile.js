import { Person } from "@mui/icons-material";
import { Avatar, Button, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ErrorSnack from "../../components/molecules/ErrorSnack";
import CustomizedProgressBars from "../../components/molecules/Progress";

const PersonalProfile = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openErrorSnack, setOpenErrorSnack] = useState();
  const [industry, setSelectedIndustry] = useState();
  const [country, setSelectedCountry] = useState();
  const [city, setSelectedCity] = useState();
  const [countries, setCountries] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addProfileInformation = (async) => {
    let url = process.env.REACT_APP_BACKEND_URL;
    try {

        let info = axios.get(`https://app.zipcodebase.com/api/v1/search?apikey=ff6ed970-1cfe-11ee-908f-d1db56ad40ee&codes=${postalCode}`)

        .then ((res)=>{
            let code = Object.values(res.data.results)[0][0].city
            if(code !== city.value){
                setOpenErrorSnack(true)
                setErrorMsg("zip code and city does not match");
                return
            }
            else{
                let data = {
                    city: city.value,
                    country: country.value,
                    postal_code: postalCode,
                    first_name: firstName,
                    last_name: lastName,
                    email :  JSON.parse(localStorage.getItem("user"))?.email
                  };

                  if(data.first_name.length < 1 || data.last_name.length < 1){
                    setOpenErrorSnack(true)
                    setErrorMsg("All feilds are necessary");
                    return
                  }
            
                  //upload photo
                  let file = profileImage;
                  let formdata = new FormData();
                  formdata.append("photo", file);
                  console.log(formdata);
                  setLoader(true);
                  axios
                    .post(url + "/file", formdata)
                    .then((res) => {
                     let newData = {...data , picture : res.data.img }
                     console.log(newData)
                      axios
                        .post(url + "/user/update-user", newData)
                        .then((res) => {
                          console.log(res.data);
                          localStorage.setItem("user", JSON.stringify(res.data));
                          setTimeout(() => {
                            setLoader(false);
                            navigate("/new/auth/account-selection");
                          }, 1000);
                        })
                        .catch((err) => {
                          setErrorMsg("user already exists");
                          setLoader(false);
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
            
                  return;
            }

        })
        .catch((err)=>{
            setOpenErrorSnack(true)
                setErrorMsg("zip code and city does not match");
                return 
        })
        
      return
    
    } catch (error) {
      setErrorMsg("pleaser fill in all feilds correctly ");
      setOpenErrorSnack(true);
      return;
    }
    //console.log(data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    await axios
      .get("https://countriesnow.space/api/v0.1/countries/")
      .then((response) => {
        setCountries(response.data.data);
      });
  }
  //console.log(countries)
  const style = {
    control: (base) => ({
      ...base,
      border: "0px solid rgba(242,242,242,0.6)",
      width: "100%",
      boxShadow: "none",
      backgroundColor: "rgba(242,242,242,0.6)",
      fontSize: "14px",
      "@media (min-width:600px)": {
        width: "100%",
      },
      "@media (min-width:1200px)": {
        width: "100%",
      },
    }),
  };
  return (
    <>
      <ErrorSnack
        open={openErrorSnack}
        setOpen={setOpenErrorSnack}
        msg={errorMsg}
        duration={3000}
      />
      <div className="grid lg:grid-cols-3 gap-7 w-full lg:px-[80px]   ">
        <div className="mt-[44%] px-4 ">
          <div className="flex justify-center">
            <img src="/guzo22.png" className="w-[20px] lg:w-[70px]" />
          </div>
          <div className="flex justify-center">
            <img src="/guzo-text.png" className="w-[20px] lg:w-[190px]" />
          </div>
        </div>
        <div className="col-span-2">
          <div className=" bg-white border-[rgba(130,122,247,0.3)] border-[1px] lg:mt-[5%] h-full  lg:h-fit  px-[33px] py-[35px] rounded-[10px]">
            <div className="text-[20px] leading-[34px] font-semibold text-center flex  justify-center  items-center space-x-2">
              <div>Build your Personal Profile </div>
            </div>

            <div className="mt-[19px] flex justify-center">
              <Avatar
                src={profileImage && URL.createObjectURL(profileImage)}
                sx={{
                  bgcolor: "rgba(242,242,242,0.6)",
                  width: "150px",
                  height: "150px",
                  px: 2,
                }}
                onClick={() => {
                  document.getElementById("image_input").click();
                }}
              >
                <div className="text-[11px]  text-center text-black leading-[12px]">
                  Upload Profile Photo*
                  <span className=" font-thin">(Acceptable: jpeg, png)</span>
                </div>
              </Avatar>

              <input
                hidden
                type="file"
                accept="image/*"
                id="image_input"
                onChange={(e) => {
                  setProfileImage(e.target.files[0]);
                }}
              />
            </div>

            <div className="space-y-[16px] text-[14px]">
              <div className="lg:flex justify-center lg:space-x-[47px] space-y-[16px] lg:space-y-0 ">
                <div className="w-full">
                  <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                    First Name*
                  </div>
                  <InputBase
                    sx={{
                      border: "1px solid rgba(242,242,242,0.6)",
                      pl: 1,
                      width: "100%",
                      borderRadius: "8px",
                      mt: "4px",
                      bgcolor: "rgba(242,242,242,0.6)",
                      fontSize: "14px",
                    }}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>

                <div className="w-full">
                  <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                    Last Name*
                  </div>
                  <InputBase
                    sx={{
                      border: "1px solid rgba(242,242,242,0.6)",
                      pl: 1,
                      width: "100%",
                      borderRadius: "8px",
                      mt: "4px",
                      bgcolor: "rgba(242,242,242,0.6)",
                      fontSize: "14px",
                    }}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Country/Region*
                </div>
                <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] ">
                  <ReactSelect
                    styles={style}
                    placeholder="Select your country"
                    options={
                      countries &&
                      countries.map((item, index) => ({
                        label: item.country + "," + item.iso3,
                        value: item.country,
                        cities: item.cities,
                      }))
                    }
                    value={country}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    noOptionsMessage={(opt) => {
                      if (opt.inputValue === "") {
                        return "Select your country";
                      } else {
                        return "no search results for " + opt.inputValue;
                      }
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    onChange={(opt) => {
                      setSelectedCountry(opt);
                      setSelectedCity({label:opt.cities[0], value :opt.cities[0]})
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Postal Code*
                </div>
                <InputBase
                  type="number"
                  sx={{
                    border: "1px solid rgba(242,242,242,0.6)",
                    pl: 1,
                    width: "100%",
                    borderRadius: "8px",
                    mt: "4px",
                    bgcolor: "rgba(242,242,242,0.6)",
                    fontSize: "14px",
                  }}
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                />
              </div>

              <div>
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  City, State*
                </div>
                <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] ">
                  <ReactSelect
                    styles={style}
                    placeholder="Select your City, State"
                    options={
                      country &&
                      country.cities.map((item, index) => ({
                        label: item,
                        value: item,
                      }))
                    }
                    value={city}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    noOptionsMessage={(opt) => {
                      if (opt.inputValue === "") {
                        return "Select your City, State";
                      } else {
                        return "no search results for " + opt.inputValue;
                      }
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    onChange={(opt) => {
                      setSelectedCity(opt);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-[5vh] px-4 mb-10">
            {loader ? (
              <div className="flex justify-center">
                <CustomizedProgressBars />
              </div>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#ECEBFE",
                  color: "#4335EF",
                  borderRadius: "22px",
                  px: 5,
                  fontSize: "15px",
                  textTransform: "none",
                }}
                onClick={addProfileInformation}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
