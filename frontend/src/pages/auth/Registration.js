import React, { useState, useContext, useEffect } from "react";
import { Store } from "../../context/Store";
import "./RegLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "rsuite";
import axios from "axios";

const Registration = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  const navigate = useNavigate();
  const { state } = useContext(Store);
  const user = state.userInfo;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  let handleRegistration = async () => {
    if (!name && !email && !password) {
      setErr("Fill the all details!");
    } else if (!name) {
      setErr("Enter your name!");
    } else if (!email) {
      setErr("Enter your email!");
    } else if (!password) {
      setErr("Enter your password!");
    } else if (password.length < 7) {
      setErr("Password need minimum 8 character!");
    } else {
      let { data } = await axios.post("http://localhost:8000/registration", {
        name: name,
        email: email,
        password: password,
        shopPhotoURL: "https://www.w3schools.com/howto/img_avatar.png",
        shopName: name,
      });
      if (data.msg === "Email already in use") {
        setErr(data.msg);
      } else {
        navigate("/login");
        setErr("");
      }
    }
  };

  return (
    <div id="registration">
      <div className="registration">
        <Form>
          <Form.Group>
            <Form.Control onChange={(e) => setName(e)} name="name" type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group>
            <Form.Control onChange={(e) => setEmail(e)} name="email" type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group>
            <Form.Control onChange={(e) => setPassword(e)} name="password" type="password" placeholder="Password" />
            <p className="reg_error">{err}</p>
          </Form.Group>
          <button onClick={handleRegistration}>Registration</button>
        </Form>
        <Link to="/login">You have already account? Login</Link>
      </div>
    </div>
  );
};

export default Registration;
