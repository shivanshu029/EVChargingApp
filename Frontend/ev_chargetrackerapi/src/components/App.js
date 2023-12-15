import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LoginPage from "./Login/LoginPage";
import SignUp from "./SignUp/SignUp";
import UserDetails from "./SignUp/UserDetails";
import Dashboard from "./Dashboard/Dashboard";
import BookingPage from "./BookingPage/BookingPage";
import TotalCostPage from "./TotalCostPage/TotalCostPage";
import AdminDashboard from "./Admin/AdminDashboard";
import Navbar from "./Navbar_Includes/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminElement from "./Routes/AdminElement";
import UserElement from "./Routes/UserElement";

function App() {
  const [username, setUsername] = useState("");

  var [userType, setUserType] = useState("");

  const setUsernameHandler = (username) => {
    setUsername(username);
  };

  const setRoleHandler = (userType) => {
    setUserType(userType);
  };

  return (
    <div className="container-fluid w-100">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LoginPage
                username={username}
                setRoleHandler={setRoleHandler}
                setUsernameHandler={setUsernameHandler}
              />
            }
          />
          <Route
            exact
            path="/Register"
            element={
              <SignUp
                username={username}
                setUsernameHandler={setUsernameHandler}
              />
            }
          />
          <Route
            exact
            path="/CustomerDetails"
            element={<UserDetails username={username} />}
          />
          <Route
            exact
            path="/Dashboard"
            element={
              <UserElement userType={userType}>
                <Navbar username={username} />
                <Dashboard username={username} />
              </UserElement>
            }
          />
          <Route
            exact
            path="/Booking"
            element={
              <UserElement userType={userType}>
                <Navbar username={username} />
                <BookingPage username={username} />
              </UserElement>
            }
          />
          <Route
            exact
            path="/CostDetails"
            element={
              <UserElement userType={userType}>
                <Navbar username={username} />
                <TotalCostPage username={username} />
              </UserElement>
            }
          />
          <Route
            exact
            path="*"
            element={
              <div
                style={{ color: "red", marginTop: "40px", fontSize: "30px" }}
              >
                Page Not Found!{" "}
              </div>
            }
          />
          <Route
            exact
            path="/AdminDashboard"
            element={
              <AdminElement userType={userType}>
                <AdminDashboard />
              </AdminElement>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
