import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      toast.error("Invalid Credentials", {
        position: "top-center",
      });
    } else if (res.status === 500) {
      toast.error("Failed to log in", {
        position: "top-center",
      });
    } else {
      dispatch({ type: "USER", payload: true });
      toast.success("Successfully logged in!", {
        position: "top-center",
      });
      navigate("/");
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form method="POST">
          <div
            style={{
              width: "300px",
            }}
          >
            <h1 className="mb-3">Login!</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Your Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <button
              type="submit"
              name="login"
              id="signup"
              className="btn btn-primary"
              value="log in"
              onClick={loginUser}
            >
              Log In
            </button>

            <NavLink to="/signup">Not registered?</NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
