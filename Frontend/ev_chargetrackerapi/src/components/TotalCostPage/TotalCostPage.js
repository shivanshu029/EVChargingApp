import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import userimg from "../images/user.png";
import moment from "moment";
import config from "../../Config/config";
import { toast } from "react-toastify";
import { TotalCostPageAPI } from "../../Services/TotalCostPageAPI";
import { GetAllDetailsAPI } from "../../Services/GetAllDetailsAPI";

const TotalCostPage = ({ username }) => {
  const navigate = useNavigate();
  var [totalExpense, setTotalExpense] = useState(null);
  const [data, setData] = useState([]);

  const navigateToDashboard = () => {
    let path = `/Dashboard`;
    navigate(path);
  };

  useEffect(() => {
    (async () => await totalCost())();
  }, []);

  const apiRoute = "/cost/";
  const apiRoute_GetDetails = "/all-details/";
  const totalCost = async () => {
    try {
      const response = await TotalCostPageAPI(apiRoute, username);
      if (response.status === 201 || response.status === 200) {
        setTotalExpense(response.data.toFixed(3));
      } else if (response.status === 400 || response.status === 404) {
        toast.error("Invalid username..No record");
      }
    } catch (error) {}
    try {
      const details = await GetAllDetailsAPI(apiRoute_GetDetails, username);
      setData(details.data);
    } catch (Error) {
      toast.error("No record Found..");
    }
  };
  return (
    <div class="fluid-container vw-100 vh-100">
      <section
        class="fluid-container w-100 vh-100"
        style={{ backgroundColor: "#212529" }}
      >
        <div class="fluid-container vw-100 h-100 bg-dark d-flex  justify-content-center align-items-center">
          <div class="container row d-flex justify-content-center align-items-center h-100">
            <div class="fluid-container w-100 col-lg-12 col-xl-11 bg-dark">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Your Charging Details
                      </p>

                      <form class="mx-1 mx-md-4">
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example1c">
                              Total Cost for the month is :
                            </label>
                            <label> {totalExpense}</label>
                            <div>
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>User</th>
                                    <th>Username</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Vehicle Type</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((user, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          {
                                            <img
                                              className="ui avatar image"
                                              src={userimg}
                                              alt="user"
                                              style={{ height: "30px" }}
                                            />
                                          }
                                        </td>
                                        <td>{user.username}</td>

                                        <td>
                                          {moment
                                            .parseZone(user.startTime)
                                            .local()
                                            .format("YYYY-MM-DD HH:mm")}
                                        </td>

                                        <td>
                                          {moment
                                            .parseZone(user.endTime)
                                            .local()
                                            .format("YYYY-MM-DD HH:mm")}
                                        </td>

                                        <td>{user.vehicleType}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <div>
                            <button
                              type="button"
                              class="btn btn-success btn-lg"
                              onClick={navigateToDashboard}
                            >
                              Go to Dashboard
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex-row align-items-center order-1 order-lg-2">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/006/685/486/non_2x/illustration-graphic-cartoon-character-of-financial-accounting-vector.jpg"
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

export default TotalCostPage;
