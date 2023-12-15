import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import config from "../../Config/config";
import { toast } from "react-toastify";
import { SignUpAPI } from "../../Services/SignUpAPI";
import "../stylesheets/UserDetails.css";

const UserDetails = ({ username }) => {
  const navigate = useNavigate();
  var [response, setResponse] = useState(null);
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [email, setEmail] = useState("");
  var [phone, setPhone] = useState("");

  var [registered, setregistered] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {}, [response]);

  // useEffect(() => {}, [response]);

  const navigateToLoginDetails = () => {
    let path = `/`;
    navigate(path);
  };

  const inputValidator = (username, firstName, email, phone) => {
    if (
      username.length == 0 ||
      firstName.length == 0 ||
      email.length == 0 ||
      phone.length == 0
    ) {
      setError(true);
    }
  };

  const payLoad = {
    username: username,
    firstname: firstName,
    lastname: lastName,
    phone: phone,
    email: email,
  };
  const apiRoute = "/add-customer";
  const userDetailsRegister = async (event) => {
    event.preventDefault();
    inputValidator(username, firstName, email, phone);
    try {
      const response = await SignUpAPI(apiRoute, payLoad);
      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successfull");
        navigateToLoginDetails();
        setregistered = response.data;
      } else if (response.status === 400 || response.status === 404) {
        toast.error("Registration Unsuccessfull..Invalid Credentials");
      }
    } catch (Error) {
      toast.error("Registration Unsuccessfull..Invalid Credentials");
    }
  };

  return (
    <div>
      <section
        class="h-100 h-custom"
        id="sectiondiv"
        // style={{ backgroundColor: "#8fc4b7" }}
      >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
              <div class="card rounded-3 bg-dark" id="usersregdiv">
                <img
                  src="https://img.freepik.com/premium-photo/electric-car-ev-charger-city-background_336913-200.jpg"
                  class="w-100"
                  id="imagesignup"
                  style={{
                    bordertopleftradius: ".3rem",
                    bordertoprightradius: ".3rem",
                  }}
                  alt="Sample photo"
                />
                <div class="card-body p-4 p-md-5" id="formdiv">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-white">
                    Registration
                  </h3>

                  <form class="px-md-2" id="mainformdiv">
                    <div class="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1q"
                        class="form-control "
                        value={username}
                        readOnly={true}
                      />
                      <label class="form-label text-white" for="form3Example1q">
                        Username
                      </label>
                    </div>

                    <div class="row">
                      <div class="col mb-4">
                        <div class="form-outline datepicker">
                          <input
                            type="text"
                            class="form-control "
                            id="exampleDatepicker1"
                            placeholder="Enter Firstname "
                            value={firstName}
                            onChange={(event) => {
                              setFirstName(event.target.value);
                            }}
                          />
                          <div>
                            {error && firstName.length <= 0 ? (
                              <label style={{ color: "red" }}>
                                First name can not be empty
                              </label>
                            ) : (
                              ""
                            )}
                          </div>

                          <label
                            for="exampleDatepicker1"
                            class="form-label text-white"
                          >
                            Firstname
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col mb-4">
                        <div class="form-outline datepicker">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleDatepicker1"
                            placeholder="Enter Lastname "
                            value={lastName}
                            onChange={(event) => {
                              setLastName(event.target.value);
                            }}
                          />
                          <div>
                            {error && lastName.length <= 0 ? (
                              <label style={{ color: "red" }}>
                                Last name can not be empty
                              </label>
                            ) : (
                              ""
                            )}
                          </div>

                          <label
                            for="exampleDatepicker1"
                            class="form-label1 text-white"
                          >
                            Lastname
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col mb-4">
                        <div class="form-outline datepicker">
                          <input
                            type="email"
                            class="form-control "
                            id="exampleDatepicker1"
                            placeholder="Enter E-mail "
                            value={email}
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                          />
                          <div>
                            {error && email.length <= 0 ? (
                              <label style={{ color: "red" }}>
                                Email can not be empty
                              </label>
                            ) : (
                              ""
                            )}
                          </div>

                          <label
                            for="exampleDatepicker1"
                            class="form-label text-white"
                          >
                            E-mail
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col mb-4">
                        <div class="form-outline datepicker">
                          <input
                            class="form-control"
                            id="exampleDatepicker1"
                            placeholder="Enter Phoneno. "
                            value={phone}
                            onChange={(event) => {
                              setPhone(event.target.value);
                            }}
                          />
                          <div>
                            {error && phone.length <= 9 ? (
                              <label style={{ color: "red" }}>
                                Phone No. should have 10 digits
                              </label>
                            ) : (
                              ""
                            )}
                          </div>

                          <label
                            for="exampleDatepicker1"
                            class="form-label text-white"
                          >
                            PhoneNo.
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success btn-lg mb-1"
                      onClick={(event) => userDetailsRegister(event)}
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

export default UserDetails;
