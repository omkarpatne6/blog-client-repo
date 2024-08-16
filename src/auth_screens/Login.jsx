import React, { useRef } from "react";
import "../styles/login.css";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import LoginImage from "../images/login.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {

  axios.defaults.withCredentials = true;
  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const toastId = useRef(null);
  const loader = () =>
    (toastId.current = toast.loading("Please wait", { autoClose: false }));

  const successfull = () =>
    toast.update(toastId.current, {
      render: "Successful",
      type: toast.TYPE.SUCCESS,
      autoClose: 1000,
      isLoading: false,
    });

  const failed = (errorMessage) =>
    toast.update(toastId.current, {
      render: errorMessage,
      type: toast.TYPE.ERROR,
      autoClose: 1000,
      isLoading: false,
    });

  const handleChange = (e) => {
    const value = e.target.value;
    setUserDetails({
      ...userDetails,
      [e.target.name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      loader();
      const resp = await axios.post("http://localhost:8000/login", userDetails);

      localStorage.setItem("user", JSON.stringify({
        email: resp.data?.user.email,
        username: resp.data?.user.username,
        userid: resp?.data?.user._id
      }))
      console.log(resp.data);
      successfull();

      setTimeout(() => {
        Navigate("/");
      }, 1000);
    } catch (err) {
      failed(err?.response?.data?.error);
      console.error(err?.response?.data?.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container
        style={{
          background: "transparent",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0px 5px 20px rgba(0,0,0)",
          overflow: "hidden",
        }}
        className="login-container"
      >
        <Row className="h-100">
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center h-100 py-4"
          >
            <form onSubmit={handleOnSubmit} className="auth-form">
              <div
                className="mb-3"
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                Login
              </div>

              <div className="form-group">
                <div>Email</div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  className="form-control mt-1 p-2 rounded shadow-none"
                />
              </div>

              <div className="form-group mt-4">
                <div>Password</div>

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userDetails.password}
                  onChange={handleChange}
                  className="form-control mt-1 mb-2 p-2 rounded shadow-none"
                />

                <a href="/">
                  <small>Forgot your password?</small>
                </a>
              </div>

              <button
                style={{
                  backgroundCcolor: "#1b8b00",
                  backgroundImage:
                    "linear-gradient(314deg, #23c000 0%, #88ff00 74%)",
                  borderRadius: "2px",
                  padding: "10px 50px",
                  border: "none",
                  color: "#fff",
                  margin: "20px 0",
                  display: "block",
                }}
              >
                <span className="me-2">Log In</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>

              <small>
                Don't have an account?{" "}
                <NavLink to="/register"> Register here</NavLink>
              </small>
            </form>
          </Col>

          <Col
            md={6}
            style={{
              backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)",
              textAlign: "center",
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={LoginImage}
              alt="login"
              style={{
                width: "80%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
              }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
