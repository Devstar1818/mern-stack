import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/logo2.png";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderNav = () => {
    if (state) {
      return (
        <>
          <li
            className="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link active" aria-current="page" to="/">
              Home
            </NavLink>
          </li>
          <li
            className="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/about">
              About Me
            </NavLink>
          </li>
          <li
            className="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li
            classNameName="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li
            className="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link active" aria-current="page" to="/">
              Home
            </NavLink>
          </li>
          <li
            className="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/about">
              About Me
            </NavLink>
          </li>
          <li
            className="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li
            className="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li
            classNameName="nav-item"
            style={{ marginRight: "30px", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/signup">
              Registration
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img className="navlogo" src={logo} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderNav />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
