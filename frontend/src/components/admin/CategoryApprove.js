import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BrandApprove.css";
import { ToastContainer, toast } from "react-toastify";

const CategoryApprove = () => {
  let [brand, setBrand] = useState([]);

  useEffect(() => {
    async function brnd() {
      let { data } = await axios.get("http://localhost:8000/disapprove-category");
      setBrand(data);
    }
    brnd();
  }, []);

  let handleApprove = (id) => {
    async function brnd() {
      let { data } = await axios.put(`http://localhost:8000/admin-approve-category/${id}`);
      const notify = () => toast(data);
      notify();
    }
    brnd();
  };

  let handleDelete = (id) => {
    async function brnd() {
      let { data } = await axios.delete(`http://localhost:8000/admin-delete-category/${id}`);
      const notify = () => toast(data);
      notify();
    }
    brnd();
  };

  return (
    <div>
      <ToastContainer autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div style={{ backgroundColor: "#fff" }} className="brand_details">
        <div>
          <h6>Category</h6>
        </div>
        <div>
          <h6>Action</h6>
        </div>
      </div>
      {brand[0] ? (
        brand.map((data) => (
          <div key={data._id} className="brand_details">
            <div>
              <h6>{data.category}</h6>
            </div>
            <div className="brand_btn">
              <button onClick={() => handleApprove(data._id)}>Approve</button>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <h5 className="brand_warning">You have don't Category approval!</h5>
      )}
    </div>
  );
};

export default CategoryApprove;
