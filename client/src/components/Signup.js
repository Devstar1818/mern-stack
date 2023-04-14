import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;
    if (!name || !email || !phone || !work || !password || !cpassword) {
      toast.error("Please Fill All Fields", {
        position: "top-center",
      });

      return;
    }
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      toast.error(data.message, {
        position: "top-center",
      });
    } else if (res.status === 500) {
      toast.error(data.message, {
        position: "top-center",
      });
    } else {
      toast.success("Successfully Registered!", {
        position: "top-center",
      });
      navigate("/login");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form method="POST" id="register-form">
          <h1 className="mb-3">Sign Up!</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputs}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Phone
            </label>
            <input
              type="phone"
              name="phone"
              value={user.phone}
              onChange={handleInputs}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Profession
            </label>
            <input
              type="text"
              name="work"
              value={user.work}
              onChange={handleInputs}
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
              value={user.password}
              onChange={handleInputs}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Your Password
            </label>
            <input
              type="password"
              name="cpassword"
              value={user.cpassword}
              onChange={handleInputs}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            name="signup"
            id="signup"
            className="btn btn-primary"
            value="register"
            onClick={PostData}
          >
            Register
          </button>

          <NavLink to="/login">I am already registered</NavLink>
        </form>
      </div>
    </>
  );
};

export default Signup;
