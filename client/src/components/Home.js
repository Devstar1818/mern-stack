import React, { useState, useEffect } from "react";
import moment from "moment";

const Home = () => {
  const [username, setUsername] = useState();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const callContactPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUser(data);
      setUsername(data.name);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  return (
    <>
      <div className="home_page">
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {moment().format("dddd, Do MMMM YYYY, h:mm:ss a")}
        </h2>
        <div className="maindiv">
          <h2>Welcome</h2>
          <h1>{username}</h1>
          <h2>
            {show ? "Happy to see you back!" : "We are the MERN Developers"}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Home;
