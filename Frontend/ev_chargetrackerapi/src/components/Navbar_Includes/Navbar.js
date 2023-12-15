import React from "react";
import "bootstrap/js/dist/base-component";
import { useLocation, Link } from "react-router-dom";
import userimg from "../images/user.png";

const Navbar = ({ username }) => {
  const navBarSetter = (location) => {
    if (
      location.pathname == "/" ||
      location.pathname == "/AdminDashboard" ||
      location.pathname == "/Register" ||
      location.pathname == "/CustomerDetails" ||
      location.pathname == "/*"
    ) {
      return null;
    }
  };

  const location = useLocation();
  navBarSetter(location);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success shadow">
        <a class="navbar-brand" href="#">
          <div style={{ marginLeft: "10px" }}>EV Charging Manager</div>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/Dashboard">
                Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/Booking">
                Book
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/CostDetails">
                Details
              </Link>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/">
                LogOut
              </a>
            </li>
            {/* <li class="nav-item">
              <Link class="nav-link" to="/AdminDashboard">
                Admin
              </Link>
            </li> */}

            <div nav-item>
              <img
                className="nav-link"
                src={userimg}
                alt="user"
                style={{ height: "40px" }}
              />
            </div>
            <div class="nav-item ">
              <label class="nav-link mr-sm-2">Logged in as {username} </label>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
