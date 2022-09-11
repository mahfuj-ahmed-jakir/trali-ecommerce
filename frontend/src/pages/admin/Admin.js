import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/admin/Sidebar";
import "./Admin.css";
import { Header, Navbar } from "rsuite";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../../context/Store";

const Admin = () => {
  let [logo, setLogo] = useState({});

  const { state } = useContext(Store);
  const user = state.userInfo;
  const navigate = useNavigate();

  useEffect(() => {
    async function logoData() {
      let data = await axios.get("http://localhost:8000/logo");
      setLogo(data.data.img);
    }
    logoData();
  }, []);

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/");
    }
  });

  return (
    <div>
      <Header>
        <Navbar appearance="white">
          <Navbar.Header className="ven_nav">
            <Link to="/" className="navbar-brand logo">
              <img src={logo} alt="Trali" />
            </Link>
          </Navbar.Header>
        </Navbar>
      </Header>
      <div id="dash">
        <div className="dash_menu">
          <Sidebar />
        </div>
        <div className="dash_con">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
