import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Menubar.css";
import { BiGitCompare } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonCircle, BsHeart } from "react-icons/bs";
import { Navbar, Nav, Grid, Dropdown } from "rsuite";
import axios from "axios";
import { Store } from "../../context/Store";

const Menubar = () => {
  let [logo, setLogo] = useState({});

  const navigate = useNavigate();

  const { state, dispatch, cartState } = useContext(Store);
  const user = state.userInfo;
  const { cart } = cartState;

  useEffect(() => {
    async function logoData() {
      let data = await axios.get("http://localhost:8000/logo");
      setLogo(data.data.img);
    }
    logoData();
  }, []);

  let handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  let handleVendor = () => {
    navigate("/trali-vendor-policy");
  };

  let handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  let handleAdminPanel = () => {
    navigate("/admin");
  };

  let handleCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <Navbar className="navbar">
        <Grid>
          <Navbar.Brand className="nav-brand">
            <img src={logo} alt="trali" />
          </Navbar.Brand>
          <Nav className="nav-items">
            <Nav.Item>Home</Nav.Item>
            <Nav.Item>Pages</Nav.Item>
            <Nav.Item>Blog</Nav.Item>
            <Nav.Item>Contacts</Nav.Item>
          </Nav>
          <Nav pullRight className="nav-cart">
            {user ? (
              <div className="nav-icons">
                <Dropdown icon={<BsPersonCircle />}>
                  <Dropdown.Item>{user.name}</Dropdown.Item>
                  {user.isAdmin ? <Dropdown.Item onClick={handleAdminPanel}>Admin Panel</Dropdown.Item> : user.isVendor ? <Dropdown.Item onClick={handleGoToDashboard}>Go to Dashboard</Dropdown.Item> : <Dropdown.Item onClick={handleVendor}>Become a Vendor</Dropdown.Item>}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown>
                <BsHeart />
                <BiGitCompare />
                <span onClick={handleCart} className="nav-cart-icon">
                  <AiOutlineShoppingCart />
                  <span className="cart-icon-dot">
                    <p>{cart.cartItems.length}</p>
                  </span>
                </span>
              </div>
            ) : (
              <Link className="menu_login" to="/login">
                Login
              </Link>
            )}
          </Nav>
        </Grid>
      </Navbar>
    </>
  );
};

export default Menubar;
