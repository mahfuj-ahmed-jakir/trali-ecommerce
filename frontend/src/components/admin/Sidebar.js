import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GearIcon from "@rsuite/icons/Gear";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import PeoplesCostomizeIcon from "@rsuite/icons/PeoplesCostomize";
import ListIcon from "@rsuite/icons/List";
import { useNavigate } from "react-router-dom";
import { Store } from "../../context/Store";

const Sidebar = () => {
  const navigate = useNavigate();
  let [active, setActive] = useState("1");

  const { state } = useContext(Store);
  const user = state.userInfo;

  // Active Check!
  useEffect(() => {
    if (window.location == "http://localhost:3000/admin") {
      setActive("1");
    } else if (window.location == "http://localhost:3000/admin/add-product") {
      setActive("2");
    } else if (window.location == "http://localhost:3000/admin/brand-approve") {
      setActive("3");
    } else if (window.location == "http://localhost:3000/admin/category-approve") {
      setActive("4");
    } else if (window.location == "http://localhost:3000/admin/sub-category-approve") {
      setActive("5");
    } else if (window.location == "http://localhost:3000/admin/product-approve") {
      setActive("6");
    } else if (window.location == "http://localhost:3000/admin/profile-update") {
      setActive("8");
    }
  }, []);

  let handleDashboard = () => {
    setActive("1");
    navigate("/admin");
  };

  let handleAddProduct = () => {
    setActive("2");
    navigate("/admin/add-product");
  };

  let handleBrandApprove = () => {
    setActive("3");
    navigate("/admin/brand-approve");
  };

  let handleCategoryApprove = () => {
    setActive("4");
    navigate("/admin/category-approve");
  };

  let handleSubCategoryApprove = () => {
    setActive("5");
    navigate("/admin/sub-category-approve");
  };

  let handleProductApprove = () => {
    setActive("6");
    navigate("/admin/product-approve");
  };

  let handleVendoreUpdate = () => {
    setActive("8");
    navigate("/admin/profile-update");
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
              <Nav.Item onClick={handleBrandApprove} eventKey="3" icon={<ListIcon />}>
                Brand Approve
              </Nav.Item>
              <Nav.Item onClick={handleCategoryApprove} eventKey="4" icon={<ListIcon />}>
                Category Approve
              </Nav.Item>
              <Nav.Item onClick={handleSubCategoryApprove} eventKey="5" icon={<ListIcon />}>
                Sub Category Approve
              </Nav.Item>
              <Nav.Item onClick={handleProductApprove} eventKey="6" icon={<ListIcon />}>
                Product Approve
              </Nav.Item>
              <Nav.Item onClick={handleVendoreUpdate} eventKey="8" icon={<PeoplesCostomizeIcon />}>
                Admin Update
              </Nav.Item>
              <Nav.Item eventKey="9" icon={<GearIcon />}>
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
