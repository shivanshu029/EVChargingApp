import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Dashboard.css";
import imgdashboard from "../images/imgdashboard.jpg";
import evbgimg from "../images/evbgimg.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateToBooking = () => {
    let path = `/Booking`;
    navigate(path);
  };

  const navigateToCostDetails = () => {
    let path = `/CostDetails`;
    navigate(path);
  };

  return (
    <div class="container-fluid w-100">
      <section
        class="container-fluid w-100 vh-100 bg-transparent "
        id="dashboardsection"
      >
        <div class="container h-100 w-100  ">
          <div class="row d-flex justify-content-center align-items-center h-100  w-100">
            <div class="col-lg-12 col-xl-11 ">
              <div
                class="card text-black shadow bg-dark"
                style={{ borderRadius: "25px" }}
              >
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-white">
                        Welcome to EV Charging Hub
                      </p>

                      <div class="mx-1 mx-md-4">
                        <div class="d-flex flex-row align-items-center mb-4">
                          <div class="fas fa-user fa-lg me-3 fa-fw"></div>
                          <div class="form-outline flex-fill mb-0 text-white">
                            <h3 class="mb-3">Create a new Booking</h3>

                            <button
                              class="form-label"
                              for="form3Example1c"
                              className="btn btn-success"
                              onClick={navigateToBooking}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <div class="fas fa-envelope fa-lg me-3 fa-fw"></div>
                          <div class="form-outline flex-fill mb-0 text-white">
                            <h3>Find your Previous Booking Details</h3>
                            <div>
                              <button
                                class="btn btn-success"
                                onClick={navigateToCostDetails}
                              >
                                Get Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={imgdashboard}
                        class="img-fluid"
                        alt="Sample image"
                        id="dashboardimg"
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

export default Dashboard;
