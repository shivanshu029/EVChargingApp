import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { BookingPageAPI } from "../../Services/BookingPageAPI";
import imgbookingpage from "../images/imgbookingpage.avif";

const BookingPage = ({ username }) => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [vehicleType, setVehicleType] = useState("bicycle");

  const navigateToDashboard = () => {
    let path = `/Dashboard`;
    navigate(path);
  };
  const payLoad = {
    username: username,
    startTime: startTime,
    endTime: endTime,
    vehicleType: vehicleType,
  };
  const apiRoute = "/charging-details";
  const booking = async () => {
    // event.preventDefault();
    try {
      const response = await BookingPageAPI(apiRoute, payLoad);
      if (response == undefined) {
        toast.error(" Booking Unsuccessfull");
      } else {
        if (response.status === 201 || response.status === 200) {
          toast.info(
            "Booked Successfully..Booking Cost for current booking is Rs-" +
              response.data.toFixed(3)
          );
          navigateToDashboard();
        }
      }
    } catch (Error) {
      toast.info("Booking Unsuccessfull..");
    }
  };

  return (
    <div>
      <section
        class="vh-100"
        style={{ backgroundColor: "#eee" }}
        id="bookingsection"
      >
        <div class="fluid-container vw-100 h-100 bg-dark">
          <div class="row d-flex justify-content-center align-items-center vh-100">
            <div class="col-lg-12 col-xl-11 bg-dark">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Select your Charging Date and Time
                      </p>

                      <form class="mx-1 mx-md-4">
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              class="form-control"
                              value={username}
                              placeholder="Login again to book"
                              readOnly={true}
                              style={{ backgroundColor: "#9DB2BF" }}
                            />

                            <label class="form-label" for="form3Example1c">
                              Your Username
                            </label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <label class="form-label me-2" for="form3Example3c">
                            Select Charging Start Date and Time
                          </label>
                          <div class="form-outline flex-fill mb-0">
                            <DatePicker
                              id="form3Example3c"
                              class="form-control"
                              selected={startTime}
                              onChange={(date) => setStartTime(date)}
                              dateFormat="Pp"
                              showTimeSelect
                              timeFormat="p"
                              minDate={startTime}
                            />
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <label class="form-label me-3" for="form3Example4c">
                            Select Charging End Date and Time
                          </label>
                          <div class="form-outline flex-fill mb-0">
                            <DatePicker
                              id="form3Example4c"
                              class="form-control"
                              selected={endTime}
                              onChange={(date) => setEndTime(date)}
                              dateFormat="Pp"
                              showTimeSelect
                              timeFormat="p"
                              minDate={startTime}
                            />
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <div class="fas fa-key fa-lg me-3 fa-fw"></div>
                          <div class="form-outline flex-fill mb-0">
                            <label class="btn btn-info ">
                              Select Vehicle Type
                              <select
                                value={vehicleType}
                                onChange={(event) => {
                                  setVehicleType(event.target.value);
                                }}
                              >
                                <option value="bicycle">Bicycle</option>

                                <option value="bike">Bike</option>

                                <option value="car">Car</option>
                              </select>
                            </label>
                          </div>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <div>
                            <button
                              type="button"
                              class="btn btn-success btn-lg"
                              onClick={(event) => booking(event)}
                            >
                              Confirm Booking
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex-row align-items-center order-1 order-lg-2">
                      <h4>Booking Info</h4>
                      <p>• For bicycle the cost will 10 Rs per hour</p>
                      <p>• For bike the cost will be 15 Rs per hour</p>
                      <p>• For car the cost will be 20 Rs per hour</p>
                      <img
                        src={imgbookingpage}
                        class="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
