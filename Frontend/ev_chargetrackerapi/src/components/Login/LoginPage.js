import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import evbgimage from "../images/evbgimage.jpg";
import evcleanfuture from "../images/evcleanfuture.png";
import "../stylesheets/LoginPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../Config/config";
import { LoginPageAPI } from "../../Services/LoginPageAPI";

const LoginPage = ({ username, setUsernameHandler, setRoleHandler }) => {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [password, setpassword] = useState("");
  const [loggedIn, setloggedIn] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const setUsernamefn = (username) => {
    setUsernameHandler(username);
  };

  const setRoleTypefn = (userType) => {
    setRoleHandler(userType);
  };

  const navigateToDashboard = () => {
    let path = `/Dashboard`;
    navigate(path);
  };

  const navigateToAdminDashboard = () => {
    let path = `/AdminDashboard`;
    navigate(path);
  };

  const navigateToSignUp = () => {
    let path = `/Register`;
    navigate(path);
  };
  const payLoad = { username: user, password: password };
  const apiRoute = "/customer-login";

  const LogIn = async (event) => {
    event.preventDefault();
    if (user.length == 0 || password.length == 0) {
      setError(true);
    }
    try {
      const response = await LoginPageAPI(apiRoute, payLoad);
      if (response.status === 201 || response.status === 200) {
        setloggedIn(response.data);
        toast.success("Successfully Logged In");
        setUsernamefn(user);
        if (user == "adminhost") {
          setRoleTypefn("admin");
          navigateToAdminDashboard();
        } else {
          setRoleTypefn("user");
          navigateToDashboard();
        }
      }
    } catch (error) {
      toast.error("Login Unsuccessfull ..");
    }
  };

  return (
    <div class="card mt-4 mb-4 shadow" id="maindiv">
      <section class="mw-100 vh-100" id="carddiv">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            {/* <div class="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://sso.chargepoint.com/static/media/web-signup-header-min.8001360c.png"
                class="img-fluid"
                alt="Sample image"
              />
            </div> */}
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form class="card mt-4 mb-4 shadow " id="formsdiv">
                <h3 class="text-center fw-bold mx-3 mb-5 ">SignIn</h3>

                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    data-testid="usernameInput"
                    class="form-control form-control-lg bg-transparent border-success"
                    placeholder="Enter your Username "
                    value={user}
                    onChange={(event) => {
                      setUser(event.target.value);
                    }}
                  />
                  <div>
                    {error && user.length <= 2 ? (
                      <label style={{ color: "red" }}>
                        Username should atleast have 4 letters
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <label class="form-label" for="form3Example3">
                    User Name
                  </label>
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    class="form-control form-control-lg bg-transparent  border-success "
                    placeholder="Enter your Password "
                    value={password}
                    onChange={(event) => {
                      setpassword(event.target.value);
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
                  <label class="form-label " for="form3Example4">
                    Password
                  </label>
                </div>

                <div class="text-center text-lg-start  pt-2">
                  <button
                    type="button"
                    class="btn btn-success btn-lg"
                    onClick={LogIn}
                    style={{ paddingleft: ".5rem", paddingRight: "1.5rem" }}
                  >
                    Login
                  </button>

                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <button class=" btn btn-success" onClick={navigateToSignUp}>
                      SignUp
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LoginPage;
