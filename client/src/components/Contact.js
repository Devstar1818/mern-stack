import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const sendMessagetoBackend = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();

    if (!data) {
      toast.error("Message not sent!", {
        position: "top-center",
      });
    } else {
      toast.success("Message sent successfully!", {
        position: "top-center",
      });

      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between py-3">
                    <input
                      style={{ marginRight: "10px" }}
                      type="text"
                      required="true"
                      id="contact_form_name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputs}
                      placeholder="Your Name"
                      className="form-control"
                    />
                    <input
                      style={{ marginRight: "10px" }}
                      type="email"
                      required="true"
                      id="contact_form_email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                      className="form-control"
                    />
                    <input
                      type="number"
                      required="true"
                      id="contact_form_phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone Number"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1">Message</label>
                    <textarea
                      style={{ resize: "none" }}
                      className="form-control"
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      placeholder="Enter Your Message"
                      id="exampleFormControlTextarea1"
                      rows="7"
                    ></textarea>
                  </div>
                  <button
                    style={{ marginTop: "10px" }}
                    type="submit"
                    className="btn btn-primary"
                    value="sendMessage"
                    onClick={sendMessagetoBackend}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
