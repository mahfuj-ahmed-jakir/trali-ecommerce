import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BrandApprove.css";
import { ToastContainer, toast } from "react-toastify";

const ProductApprove = () => {
  let [product, setProduct] = useState([]);
  let [one, setOne] = useState(false);

  useEffect(() => {
    async function pro() {
      let { data } = await axios.get("http://localhost:8000/disapprove-product");
      setProduct(data);
    }
    pro();
  }, []);

  let handleApprove = (id) => {
    async function pro() {
      let { data } = await axios.put(`http://localhost:8000/admin-approve-product/${id}`);
      const notify = () => toast(data);
      notify();
    }
    pro();
  };

  let handleDelete = (id) => {
    async function pro() {
      let { data } = await axios.delete(`http://localhost:8000/admin-delete-product/${id}`);
      const notify = () => toast(data);
      notify();
    }
    pro();
  };

  let handleEdit = (id) => {
    console.log(id);
  };

  return (
    <div>
      <ToastContainer autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div style={{ backgroundColor: "#fff" }} className="brand_details">
        <div>
          <h6>Product Title</h6>
        </div>
        <div>
          <h6>Action</h6>
        </div>
      </div>
      {product[0] ? (
        product.map((data) => (
          <div key={data._id} className="brand_details">
            <div>
              <h6>{data.title}</h6>
            </div>
            <div className="brand_btn">
              <button onClick={() => handleApprove(data._id)}>Approve</button>
              <button onClick={() => handleEdit(data._id)}>Edit</button>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
              <button>View</button>
            </div>
          </div>
        ))
      ) : (
        <h5 className="brand_warning">You have don't Product approval!</h5>
      )}
    </div>
  );
};

export default ProductApprove;
