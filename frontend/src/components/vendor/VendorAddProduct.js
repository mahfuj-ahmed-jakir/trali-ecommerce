import React, { useState } from "react";
import "./VendorAddProduct.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import VendorProduct from "./VendorProduct";

const VendorAddProduct = () => {
  let [category, setCategory] = useState("");
  let [brand, setBrand] = useState("");
  let [subCategory, setSubCategory] = useState("");

  let handleCategoryAdd = () => {
    if (category == "") {
      const notify = () => toast("❎ Enter a category name!");
      notify();
    } else {
      async function categoryFun() {
        let { data } = await axios.post("http://localhost:8000/add-category", {
          category: category,
          approve: false,
        });
        const notify = () => toast(data);
        setCategory("");
        notify();
      }
      categoryFun();
    }
  };

  let handleBrandAdd = () => {
    if (brand == "") {
      const notify = () => toast("❎ Enter a brand name!");
      notify();
    } else {
      async function brandFun() {
        let { data } = await axios.post("http://localhost:8000/add-brand", {
          brand: brand,
          approve: false,
        });
        const notify = () => toast(data);
        setBrand("");
        notify();
      }
      brandFun();
    }
  };

  let handleSubCategory = () => {
    if (subCategory == "") {
      const notify = () => toast("❎ Enter a sub category name!");
      notify();
    } else {
      async function subCategoryFun() {
        let { data } = await axios.post("http://localhost:8000/add-sub-category", {
          subCategory: subCategory,
          approve: false,
        });
        const notify = () => toast(data);
        setSubCategory("");
        notify();
      }
      subCategoryFun();
    }
  };

  return (
    <div>
      <div className="add-top">
        <div className="cate-add">
          <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Add Category" />
          <button onClick={handleCategoryAdd}>Submit</button>
        </div>
        <div className="cate-add">
          <input value={subCategory} onChange={(e) => setSubCategory(e.target.value)} type="text" placeholder="Add Sub Category" />
          <button onClick={handleSubCategory}>Submit</button>
        </div>
        <div className="cate-add">
          <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Add Brand" />
          <button onClick={handleBrandAdd}>Submit</button>
        </div>
      </div>
      <VendorProduct />
      <ToastContainer autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default VendorAddProduct;
