import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import "../App.css";
import Logo from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  axios.defaults.withCredentials = true;
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setIsLogin(true);
    }
  }, []);

  const clicked = (e) => {
    let names = e.target.name;

    var layerClass = "." + names + "-layer";
    var layers = document.querySelectorAll(layerClass);

    for (const layer of layers) {
      const active = layer.classList.toggle("active");

      if (active) {
        document.getElementById("lastlayer").style.top = "0%";
      } else {
        document.getElementById("lastlayer").style.top = "-100%";
      }
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/logout");

      localStorage.clear();
      setIsLogin(false);

      alert(res.data);
      navigate("/login");
    } catch (error) {
      if (
        error?.response?.status === 401 &&
        error?.response?.statusText === "Unauthorized"
      ) {
        alert(error?.response?.data);
        navigate("/login");
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="top-layer"></div>
      <div className="top-layer top-layer-2"></div>
      <div className="last-layer-3 text-light" id="lastlayer">
        <ul>
          <li>
            <NavLink onClick={clicked} name="top" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={clicked} name="top" to="/my-blogs">
              My blogs
            </NavLink>
          </li>
          <li>
            <NavLink onClick={clicked} name="top" to="/newblog">
              Add new +
            </NavLink>
          </li>
        </ul>
      </div>

      <Navbar className="header" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/" className="text-light">
            <img src={Logo} alt="logo" className="logo" />
          </Navbar.Brand>

          {isLogin ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink className="ms-auto me-5" to="/login">
              Login
            </NavLink>
          )}
          <div className="buttons">
            <button name="top" onClick={clicked}>
              &#9776;
            </button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
