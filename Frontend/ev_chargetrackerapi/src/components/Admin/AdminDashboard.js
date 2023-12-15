import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import userimg from "../images/user.png";
import config from "../../Config/config";
import { toast } from "react-toastify";
import { AdminDashboardAPI } from "../../Services/AdminDashboardAPI";

function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const navigateToLogIn = () => {
    let path = `/`;
    navigate(path);
  };

  const apiRoute = "/all-customers";

  useEffect(() => {
    (async () => {
      try {
        const res = await AdminDashboardAPI(apiRoute);
        setData(res.data);
      } catch (error) {
        toast.error("Fetch Unsuccessfull..");
      }
    })();
  }, []);

  return (
    <div className="card-container">
      <h3
        class="container-fluid d-flex justify-content-center align-items-center "
        style={{ color: "white", marginTop: "15px" }}
      >
        User Details
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Vehicle Type</th>
            <th>Total Cost</th>
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
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.vehicletype}</td>
                <td>{user.totalCost.toFixed(3)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        class=" btn btn-success"
        onClick={navigateToLogIn}
        style={{ marginLeft: "48%" }}
      >
        Logout
      </button>
    </div>
  );
}
export default AdminDashboard;
