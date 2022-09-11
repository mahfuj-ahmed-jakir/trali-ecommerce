import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/client/Home";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import VendorPolicy from "./pages/vendor/VendorPolicy";
import Dashboard from "./pages/vendor/Dashboard";
import Admin from "./pages/admin/Admin";
import VendorPanel from "./components/vendor/VendorPanel";
import AdminPanel from "./components/admin/AdminPanel";
import VendorAddProduct from "./components/vendor/VendorAddProduct";
import AdminAddProduct from "./components/admin/AdminAddProduct";
import VendorProfileUpdate from "./components/vendor/VendorProfileUpdate";
import AdminProfileUpdate from "./components/admin/AdminProfileUpdate";
import BrandApprove from "./components/admin/BrandApprove";
import CategoryApprove from "./components/admin/CategoryApprove";
import SubCategoryApprove from "./components/admin/SubCategoryApprove";
import ProductApprove from "./components/admin/ProductApprove";
import Cart from "./pages/client/Cart";

function App() {
  return (
    <>
      <Routes>
        {/* Client */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />

        {/* Auth */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* Vendor */}
        <Route path="/trali-vendor-policy" element={<VendorPolicy />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<VendorPanel />} />
          <Route path="add-product" element={<VendorAddProduct />} />
          <Route path="profile-update" element={<VendorProfileUpdate />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<AdminPanel />} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="profile-update" element={<AdminProfileUpdate />} />
          <Route path="brand-approve" element={<BrandApprove />} />
          <Route path="category-approve" element={<CategoryApprove />} />
          <Route path="sub-category-approve" element={<SubCategoryApprove />} />
          <Route path="product-approve" element={<ProductApprove />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
