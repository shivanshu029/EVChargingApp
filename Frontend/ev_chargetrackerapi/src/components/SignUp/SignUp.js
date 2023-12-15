import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import UserDetails from "./UserDetails";
import config from "../../Config/config";
import { toast } from "react-toastify";
import { SignUpAPI } from "../../Services/SignUpAPI";
import "../stylesheets/SignUp.css";
import signupimg from "../images/signupimg.jpg";

const SignUp = ({ username, setUsernameHandler }) => {
  const navigate = useNavigate();
  var [response, setResponse] = useState(null);
  var [user, setUser] = useState("");
  var [password, setPassword] = useState("");
  var [confirmPassword, setConfirmPassword] = useState("");
  var [registered, setRegistered] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {}, [response]);

  const setUsernamefn = (username) => {
    setUsernameHandler(username);
  };

  const navigateToUserDetails = () => {
    let path = `/CustomerDetails`;
    navigate(path);
  };

  const inputValidator = () => {
    if (
      user.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      setError(true);
    }
  };

  const payLoad = {
    username: user,
    password: password,
  };
  const apiRoute = "/user-register";

  const signUpRegister = async (event) => {
    event.preventDefault();
    inputValidator();
    if (password !== confirmPassword) {
      toast.error("Passwords does not match..Please check again .");
    } else {
      try {
        const response = await SignUpAPI(apiRoute, payLoad);
        if (response.status === 201 || response.status === 200) {
          toast.success("Registration Successfull");
          setUsernamefn(user);
          setRegistered = response.data;
          navigateToUserDetails();
        } else if (response.status === 400 || response.status === 404) {
          toast.error("Registration Unsuccessfull..Invalid Credentials");
        }
      } catch (error) {
        toast.error("Registration Unsuccessfull..Invalid Credentials");
      }
    }
  };

  return (
    <div class="container-fluid w-100">
      <section
        class="w-100 vh-auto bg-dark"
        id="sectiondiv"
        // style={{ backgroundColor: "#000000" }}
      >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
              <div class="card rounded-3 bg-dark text-white">
                <img
                  src={signupimg}
                  class="w-100"
                  style={{
                    bordertopleftradius: ".3rem",
                    bordertoprightradius: ".3rem",
                    borderRadius: "7px",
                  }}
                  alt="Sample photo"
                />
                <div class="card-body p-4 p-md-5 bg-dark">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Sign Up</h3>

                  <form class="px-md-2" id="divform">
                    <div class="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1q"
                        class="form-control"
                        placeholder="Enter Username of min 4 characters"
                        value={user}
                        onChange={(event) => {
                          setUser(event.target.value);
                        }}
                      />
                      <div>
                        {error && user.length <= 3 ? (
                          <label style={{ color: "red" }}>
                            Username should atleast have 4 letters
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <label class="form-label" for="form3Example1q">
                        Username
                      </label>
                    </div>

                    <div class="row">
                      <div class="col mb-4">
                        <div class="form-outline datepicker">
                          <input
                            type="password"
                            class="form-control"
                            id="exampleDatepicker1"
                            placeholder="Enter Password of min 8 characters"
                            value={password}
                            onChange={(event) => {
                              setPassword(event.target.value);
                            }}
                          />
                          <div>
                            {error && password.length <= 7 ? (
                              <label style={{ color: "red" }}>
                                Password should atleast have 8 letters
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          <label for="exampleDatepicker1" class="form-label">
                            Password
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-4 pb-2 pb-md-0 mb-md-5">
                      <div class="col-mb-4">
                        <div class="form-outline">
                          <input
                            id="form3Example1w"
                            class="form-control"
                            type="password"
                            placeholder="Enter Password of min 8 characters"
                            value={confirmPassword}
                            onChange={(event) => {
                              setConfirmPassword(event.target.value);
                            }}
                          />
                          <div>
                            {error && confirmPassword.length <= 7 ? (
                              <label style={{ color: "red" }}>
                                Password should atleast have 8 letters
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          <label class="form-label" for="form3Example1w">
                            Confirm Password
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="btn btn-success btn-lg mb-1"
                      onClick={signUpRegister}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
