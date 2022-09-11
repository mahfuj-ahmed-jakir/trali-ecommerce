import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GearIcon from "@rsuite/icons/Gear";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import PeoplesCostomizeIcon from "@rsuite/icons/PeoplesCostomize";
import { useNavigate } from "react-router-dom";
import { Store } from "../../context/Store";

const Sidebar = () => {
  const navigate = useNavigate();
  let [active, setActive] = useState("1");

  const { state } = useContext(Store);
  const user = state.userInfo;

  // Active Check!
  useEffect(() => {
    if (window.location == "http://localhost:3000/dashboard") {
      setActive("1");
    } else if (window.location == "http://localhost:3000/dashboard/add-product") {
      setActive("2");
    } else if (window.location == "http://localhost:3000/dashboard/profile-update") {
      setActive("3");
    }
  }, []);

  let handleDashboard = () => {
    setActive("1");
    navigate("/dashboard");
  };

  let handleAddProduct = () => {
    setActive("2");
    navigate("/dashboard/add-product");
  };

  let handleVendoreUpdate = () => {
    setActive("3");
    navigate("/dashboard/profile-update");
  };

  return (
    <div>
      <div id="sidebar">
        <div className="sidebar_mem">
          <img src={user.shopPhotoURL} alt={user.shopName} />
          <p>{user.shopName}</p>
        </div>
        <hr></hr>
        <Sidenav activeKey={active}>
          <Sidenav.Body>
            <Nav>
              <Nav.Item onClick={handleDashboard} eventKey="1" icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
              <Nav.Item onClick={handleAddProduct} eventKey="2" icon={<PlusRoundIcon />}>
                Add Product
              </Nav.Item>
              <Nav.Item onClick={handleVendoreUpdate} eventKey="3" icon={<PeoplesCostomizeIcon />}>
                Vendor Update
              </Nav.Item>
              <Nav.Item eventKey="4" icon={<GearIcon />}>
                Settings
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    </div>
  );
};

export default Sidebar;
