import { Person } from "@mui/icons-material";
import { Avatar, Button, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ErrorSnack from "../../components/molecules/ErrorSnack";
import CustomizedProgressBars from "../../components/molecules/Progress";

const EcosystemProfile_ = () => {
  const navigate = useNavigate();
  const [industry, setSelectedIndustry] = useState();
  const [country, setSelectedCountry] = useState();
  const [city, setSelectedCity] = useState();
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
    <div className="grid lgz;grid-cols-3 gap-7 w-full lg:px-[80px]   ">
     <div className="mt-[44%] px-4 ">
        <div className="flex justify-center">
          <img src="/guzo22.png" className="w-[20px] lg:w-[70px]" />
        </div>
        <div className="flex justify-center">
          <img src="/guzo-text.png"  className="w-[20px] lg:w-[190px]" />
        </div>
      </div>
      <div className="col-span-2">
        <div className=" bg-white border-[rgba(130,122,247,0.3)] border-[1px] lg:mt-[5%] h-full  lg:h-fit   py-[35px] rounded-[10px]">
          <div className="text-[20px] leading-[34px] font-semibold text-center flex  justify-center  items-center space-x-2">
            <div>Build an Ecosystem Profile </div>
          </div>

          <div className="h-[200px] w-full bg-[rgba(242,242,242,0.6)] relative mt-[20px]">
            <div className="text-[14px]  text-center relative top-[45%] leading-[24px]">
              Upload Profile Photo*
              <span className=" font-thin">(Acceptable: jpeg, png)</span>
            </div>
          </div>

          <div className="mt-[19px] flex justify-center px-[33px]">
            <Avatar
              sx={{
                bgcolor: "rgba(242,242,242,0.6)",
                width: "150px",
                height: "150px",
                px: 2,
              }}
            >
              <div className="text-[11px]  text-center text-black leading-[12px]">
                Upload Profile Photo*
                <span className=" font-thin">(Acceptable: jpeg, png)</span>
              </div>
            </Avatar>
          </div>

          <div className="space-y-[16px] text-[14px] px-[33px]">
            <div className="font-[600] text-[17px] text-[rgba(91,91,91,1)]">
              Name and Contact Info
            </div>

            <div>
              <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                Ecosystem Space Name*
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
                placeholder="Ecosystem Space Name"
              />
            </div>

            <div>
              <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                Contact Email*
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
                placeholder="Contact Email"
              />
            </div>

            <div>
              <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                Contact Phone Number*
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
                placeholder="Contact Phone Number"
              />
            </div>

            <div className="font-[600] text-[17px] text-[rgba(91,91,91,1)]">
              Category
            </div>
            <div className="lg:flex lg:space-x-2 space-y-[16px] lg:space-y-0 items-center">
              <div className="w-full">
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Industry*
                </div>
                <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] ">
                  <ReactSelect
                    styles={style}
                    placeholder="Select your industry"
                    options={[{ label: "USA", value: "USA" }]}
                    value={country}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    noOptionsMessage={(opt) => {
                      if (opt.inputValue === "") {
                        return "Select your industry";
                      } else {
                        return "no search results for " + opt.inputValue;
                      }
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    onChange={(opt) => {
                      setSelectedCountry(opt);
                    }}
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Website*
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
                  placeholder="Enter Website Address"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                Descriptive Tags*
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
                placeholder="Descriptive Tags"
              />
            </div>

            <div className="font-[600] text-[17px] text-[rgba(91,91,91,1)]">
              Location
            </div>

            <div>
              <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                Country/Region*
              </div>
              <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] ">
                <ReactSelect
                  styles={style}
                  placeholder="Select your country"
                  options={[{ label: "USA", value: "USA" }]}
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
                  }}
                />
              </div>
            </div>

            <div>
              <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                Postal Code*
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
                placeholder="Postal Code"
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
                  options={[{ label: "Texas", value: "Texas" }]}
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

        <div className="flex justify-center mt-[5vh] px-4">
          <Button
            sx={{
              backgroundColor: "#ECEBFE",
              color: "#4335EF",
              borderRadius: "22px",
              px: 5,
              fontSize: "15px",
              textTransform: "none",
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};


const EcosystemProfile = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [openErrorSnack, setOpenErrorSnack] = useState();
    const [postalCode, setPostalCode] = useState("");
    const [industry, setSelectedIndustry] = useState();
    const [country, setSelectedCountry] = useState();
    const [countries, setCountries] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone_number, setPhoneNumber] = useState(null);
    const [website, setWebsite] = useState(null);
    const [tags, setTags] = useState(null);
    const [city, setSelectedCity] = useState();
  
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
  
    const createEcosystem = (async) => {
      let url = process.env.REACT_APP_BACKEND_URL;
      try {
        let info = axios
          .get(
            `https://app.zipcodebase.com/api/v1/search?apikey=ff6ed970-1cfe-11ee-908f-d1db56ad40ee&codes=${postalCode}`
          )
  
          .then((res) => {
            let code = Object.values(res.data.results)[0][0].city;
            if (code !== city.value) {
              setOpenErrorSnack(true);
              setErrorMsg("zip code and city does not match");
              return;
            } else {
              let data = {
                creator_id :  JSON.parse(localStorage.getItem("user"))?._id,
                name,
                email,
                phone_number,
                industry: industry.value,
                website,
                tags,
                country: country.value,
                city: city.value,
                postal_code: postalCode,
                
                
               
                
                
                
              };
  
              if (data.name.length < 1 || data.email.length < 1 || data.phone_number.length < 1 || data.website.length < 1 || data.industry.length < 1 || !profileImage || !backgroundImage) {
                setOpenErrorSnack(true);
                setErrorMsg("All feilds are necessary");
                return;
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
                  let newData = { ...data, profile: res.data.img };
                  console.log(newData);
  
                  let file = backgroundImage;
                  let formdata = new FormData();
                  formdata.append("photo", file);
                  console.log(formdata);
                  setLoader(true);
                  axios.post(url + "/file", formdata).then((res) => {
                    let newData_ = { ...newData, background: res.data.img };
                    console.log(newData);
                    axios
                      .post(url + "/ecosystem/", newData_)
                      .then((res) => {
                        console.log(res.data);
                        localStorage.setItem("active_ecosystem",JSON.stringify(res.data))
                        setTimeout(() => {
                          setLoader(false);
                          navigate("/new/share");
                        }, 1000);
                      })
                      .catch((err) => {
                        setErrorMsg("some error occured");
                        setLoader(false);
                        console.log(err);
                      });
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
  
              return;
            }
          })
          .catch((err) => {
            setOpenErrorSnack(true);
            setErrorMsg("some error occured");
            return;
          });
  
        return;
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
          <div className=" bg-white border-[rgba(130,122,247,0.3)] border-[1px] lg:mt-[5%] h-full  lg:h-fit   py-[35px] rounded-[10px]">
            <div className="text-[20px] leading-[34px] font-semibold text-center flex  justify-center  items-center space-x-2">
              <div>Build your Ecosystem Profile </div>
            </div>
  
            <div className="h-[200px] w-full bg-[rgba(242,242,242,0.6)] relative mt-[20px]">
            <Avatar
                variant="square"
                src={backgroundImage && URL.createObjectURL(backgroundImage)}
                sx={{
                  bgcolor: "rgba(242,242,242,0.6)",
                  width: "100%",
                  height: "100%",
                  px: 2,
                }}
                onClick={() => {
                  document.getElementById("image_input_").click();
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
                id="image_input_"
                onChange={(e) => {
                  setBackgroundImage(e.target.files[0]);
                }}
              />
            </div>
  
            <div className="mt-[19px] flex justify-center px-[33px]">
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
  
            <div className="space-y-[16px] text-[14px] px-[33px]">
              <div className="font-[600] text-[17px] text-[rgba(91,91,91,1)]">
                Name and Contact Info
              </div>
  
              <div>
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Ecosystem Space  Name*
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
                  placeholder="Ecosystem Space Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
  
              <div>
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Contact Email*
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
                  placeholder="Contact Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
  
              <div>
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Contact Phone Number*
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
                  placeholder="Contact Phone Number"
                  value={phone_number}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
  
              <div className="font-[600] text-[17px] text-[rgba(91,91,91,1)]">
                Category
              </div>
              <div className="lg:flex lg:space-x-2 space-y-[16px] lg:space-y-0  items-center">
                <div className="w-full">
                  <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                    Industry*
                  </div>
                  <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] ">
                    <ReactSelect
                      styles={style}
                      placeholder="Select your industry"
                      options={[{ label: "Tech", value: "Tech" }]}
                      value={industry}
                      menuPlacement="auto"
                      menuPosition="fixed"
                      noOptionsMessage={(opt) => {
                        if (opt.inputValue === "") {
                          return "Select your industry";
                        } else {
                          return "no search results for " + opt.inputValue;
                        }
                      }}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      onChange={(opt) => {
                        setSelectedIndustry(opt);
                      }}
                    />
                  </div>
                </div>
  
                <div className="w-full">
                  <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                    Website*
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
                    placeholder="Enter Website Address"
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                  />
                </div>
              </div>
  
              <div className="w-full">
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Descriptive Tags*
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
                  placeholder="Descriptive Tags"
                  value={tags}
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                />
              </div>
  
              <div className="font-[600] text-[17px] text-[rgba(91,91,91,1)]">
                Location
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
                      setSelectedCity({
                        label: opt.cities[0],
                        value: opt.cities[0],
                      });
                    }}
                  />
                </div>
              </div>
  
              <div>
                <div className="text-[#5B5B5B] font-[500] text-[14px] ">
                  Postal Code*
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
  
          <div className="flex justify-center mt-[5vh] px-4">
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
                  onClick={()=>{
                      createEcosystem()
                  }}
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

export default EcosystemProfile;
