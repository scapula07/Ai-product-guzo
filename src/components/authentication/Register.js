import { Avatar, Button, Divider, InputBase } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";

const Register = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [loader, setLoader] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const collaboration_id = urlParams.get("collaboration_id");
  useEffect(() => {
    if (loggedInUser) {
      if (collaboration_id) {
        navigate("/collaboration/contact-capture/" + collaboration_id);
      } else {
        navigate("/dashboard/discover");
      }
    }
  }, []);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    setLoader(true);


    if (user.first_name.length < 3) {
      document.getElementById("info").innerHTML = "( first name is invalid )";
      setLoader(false)
      return;
    }


    if (user.last_name.length < 3) {
      document.getElementById("info").innerHTML = "( last name is invalid )";
      setLoader(false)
      return;
    }

    if (user.email.length < 3) {
      document.getElementById("info").innerHTML = "( email is invalid )";
      setLoader(false)
      return;
    }

    if (user.password.length < 8) {
      document.getElementById("info").innerHTML =
        "( password should be atleast 8 characters )";
        setLoader(false)
      return;
    }

    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/user", user)
      .then((res) => {
        console.log(res.data);
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
        setTimeout(() => {
          setLoader(false);
          if (collaboration_id) {
            navigate("/collaboration/contact-capture/" + collaboration_id);
          } else {
            navigate("/dashboard/discover");
          }
        }, 1000);
      })
      .catch((err) => {
        document.getElementById("info").innerHTML = "( user already exists )";
        setLoader(false)
        console.log(err);
      });
  };

  return (
    <div className="md:flex justify-center md:mt-[2vw] mt-[4vw] ">
      <div>
        <div className="flex justify-center">
          <img src="/logo.png" className="w-[140px] h-[50px]" />
        </div>
        <div className="bg-white mt-5 lg:w-[40vw] md:w-[70vw]  shadow-lg md:px-20 px-4 py-10 rounded-lg">
          <div className="font-bold text-[16px] text-center ">Register</div>

          <div className="flex justify-center space-x-3 mt-5">
            <div className="border-[1px] border-[#D3D3D3] px-3 w-fit  md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
              <div>
                <img src="/google.png" className="w-[12px] h-[12px]" />
              </div>
              <div> Sign up with Google</div>
            </div>

            <div className="border-[1px] border-[#D3D3D3] px-3 py-1 md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
              <div>
                <img src="/ms.png" className="w-[12px] h-[12px]" />
              </div>
              <div>Sign up with Microsoft</div>
            </div>
          </div>

          <div className="flex item-center justify-center mt-5">
            <Divider sx={{ width: "150px" }} />
            <span className="relative bottom-3 mx-4 text-[12px] ">Or</span>
            <Divider sx={{ width: "150px" }} />
          </div>

          <div className="mt-4">
            {!collaboration_id && (
              <div className="text-[12px] font-bold ">Sign up using Email</div>
            )}

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                First Name
              </div>
              <div>
                <InputBase
                  sx={{
                    bgcolor: "#EBF1F5",
                    pl: 3,
                    fontSize: "14px",
                    borderRadius: "8px",
                    width: "100%",
                    py: "3px",
                  }}
                  placeholder="your first name"
                  onChange={(e) => {
                    setUser({ ...user, first_name: e.target.value });
                  }}
                  value={user.first_name}
                />
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                Last Name
              </div>
              <div>
                <InputBase
                  sx={{
                    bgcolor: "#EBF1F5",
                    pl: 3,
                    fontSize: "14px",
                    borderRadius: "8px",
                    width: "100%",
                    py: "3px",
                  }}
                  placeholder="your last name"
                  onChange={(e) => {
                    setUser({ ...user, last_name: e.target.value });
                  }}
                  value={user.last_name}
                />
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                E-mail
              </div>
              <div>
                <InputBase
                  type="email"
                  sx={{
                    bgcolor: "#EBF1F5",
                    pl: 3,
                    fontSize: "14px",
                    borderRadius: "8px",
                    width: "100%",
                    py: "3px",
                  }}
                  placeholder="your email"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  value={user.email}
                />
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                Password
              </div>
              <div>
                <InputBase
                  type="password"
                  sx={{
                    bgcolor: "#EBF1F5",
                    pl: 3,
                    fontSize: "14px",
                    borderRadius: "8px",
                    width: "100%",
                    py: "3px",
                  }}
                  placeholder="Your password"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  value={user.password}
                />
              </div>
            </div>

            <div className="mt-4 text-[#24A0FD] underline text-[12px] cursor-pointer ">
              <span className="mx-1">or</span>
              <span
                className=""
                onClick={() => {
                  if (collaboration_id) {
                    navigate(
                      "/auth/login?collaboration_id=" + collaboration_id
                    );
                  } else {
                    navigate("/auth/login");
                  }
                }}
              >
                login
              </span>
            </div>

            <div className="my-3 text-red-600 text-xs " id="info">
              {" "}
            </div>

            <div className="flex justify-end mt-4">
              {loader ? (
                <div className="flex">
                  {" "}
                  <div className="flex-1 flex" /> <CustomizedProgressBars />{" "}
                </div>
              ) : (
                <Button
                  onClick={register}
                  sx={{
                    bgcolor: "#24A0FD",
                    color: "white",
                    fontSize: "14px",
                    width: { sm: "fit", xs: "fit" },
                    textTransform: "none",
                    borderRadius: "5px",
                    px: 3,
                    mx: { xs: 1, lg: 0 },
                    mt: { xs: 2, lg: 0 },
                    ":hover": {
                      bgcolor: "#24A0FD",
                      color: "white",
                    },
                  }}
                >
                  Sign-up
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
