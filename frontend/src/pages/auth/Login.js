import React, { useContext, useState, useEffect } from "react";
import "./RegLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "rsuite";
import axios from "axios";
import { Store } from "../../context/Store";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const user = state.userInfo;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  let handleLogin = async () => {
    if (!email && !password) {
      setErr("Fill the all details!");
    } else if (!email) {
      setErr("Enter your email!");
    } else if (!password) {
      setErr("Enter your password!");
    } else if (password.length < 7) {
      setErr("Password need minimum 8 character!");
    } else {
      let { data } = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });
      if (data.msg === "User found") {
        dispatch({ type: "USER_INFO", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setErr("");
        navigate("/");
      } else {
        setErr(data.msg);
      }
    }
  };

  return (
    <div id="registration">
      <div className="registration">
        <Form>
          <Form.Group>
            <Form.Control onChange={(e) => setEmail(e)} name="email" type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group>
            <Form.Control onChange={(e) => setPassword(e)} name="password" type="password" placeholder="Password" />
            <p className="reg_error">{err}</p>
          </Form.Group>
          <button onClick={handleLogin}>Login</button>
        </Form>
        <Link to="/registration">You have don't account? Registration</Link>
      </div>
    </div>
  );
};

export default Login;
