import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedProgressBars from "../molecules/Progress";
import FadeIn from "react-fade-in";


const Login = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const collaboration_id = urlParams.get("collaboration_id");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null)
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
    email: "",
    password: "",
  });

  const login = async () => {
    setLoader(true);
    setErrorMsg(null)
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
      .post(url + "/user/login", user)
      .then((res) => {
        console.log(res.data);
        if (res.data.code) {
          setErrorMsg(res.data.msg)
          setLoader(false)
        } else {
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const googleLogin = async (response) => {
    setLoader(true);
    setErrorMsg(null)
    var user_object = jwtDecode(response.credential);
    let url = process.env.REACT_APP_BACKEND_URL;
    let user = {
      email: user_object.email,
    };
    axios
      .post(url + "/user/login-with-google", user)
      .then((res) => {
        console.log(res.data);
        if (res.data.code) {
          setErrorMsg(res.data.msg)
          setLoader(false);
        } else {
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
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false)
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    /* global google */
    google.accounts.id.initialize({
      /* client_id: "177032038340-jul0gcjukdu8turooase19b1divjlc09.apps.googleusercontent.com", */
      client_id:
        "293518718374-t8n6cfcrlacah3n7v6c0dkmamvklikb8.apps.googleusercontent.com",
      callback: googleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="md:flex justify-center md:mt-[2vw] mt-[4vw] ">
      <div>
        <div className="flex justify-center">
          <img src="/logo.png" className="w-[140px] h-[50px]" />
        </div>
        <div className="bg-white mt-5 lg:w-[40vw] md:w-[70vw]  shadow-lg md:px-20 px-4 py-10 rounded-lg">
          <div className="font-bold text-[16px] text-center text-[#114369]">
            Login to your account
          </div>

          {errorMsg && (
            <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
          )}

          <div className="mt-4">
            {!collaboration_id && (
              <div className="text-[12px] font-bold ">Sign up using Email</div>
            )}

            <div className="space-y-2 mt-2">
              <div className="text-[#114369] font-normal text-[14px] ">
                E-mail
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
              <span
                onClick={() => {
                  collaboration_id
                    ? navigate(
                        "/auth/forgot-password?collaboration_id=" +
                          collaboration_id
                      )
                    : navigate("/auth/forgot-password");
                }}
              >
                I forgot my password
              </span>
              <span className="mx-1">or</span>
              <span
                className=""
                onClick={() => {
                  if (collaboration_id) {
                    navigate(
                      "/auth/register?collaboration_id=" + collaboration_id
                    );
                  } else {
                    navigate("/auth/register");
                  }
                }}
              >
                register
              </span>
            </div>

           

            <div className="flex justify-end mt-4">
              {loader ? (
                <div className="flex">
                  {" "}
                  <div className="flex-1 flex" /> <CustomizedProgressBars />{" "}
                </div>
              ) : (
                <Button
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
                  onClick={login}
                >
                  Login
                </Button>
              )}
            </div>
          </div>

          <Divider sx={{ my: 4 }} />

          <div className="my-4 text-[12px] text-center">Or use Third party</div>

          <div className="flex justify-center space-x-3 mt-5">
          <div>
              <div id="signInDiv"></div>
            </div>
            {/* <div className="border-[1px] border-[#D3D3D3] px-3 w-fit  md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
              <div>
                <img src="/google.png" className="w-[12px] h-[12px]" />
              </div>
              <div> Sign up with Google</div>
            </div> */}

            {/* <div className="border-[1px] border-[#D3D3D3] px-3 py-1 md:text-[12px] text-[10px] cursor-pointer flex items-center space-x-2 ">
              <div>
                <img src="/ms.png" className="w-[12px] h-[12px]" />
              </div>
              <div>Sign up with Microsoft</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
