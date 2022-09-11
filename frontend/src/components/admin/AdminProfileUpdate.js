import React, { useContext, useEffect, useState } from "react";
import "./AdminProfileUpdate.css";
import { Store } from "../../context/Store";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AdminProfileUpdate = () => {
  let [name, setName] = useState("");
  let [photo, setPhoto] = useState("");

  let { state, dispatch } = useContext(Store);
  let user = state.userInfo;

  useEffect(() => {
    setName(user.shopName);
    setPhoto(user.shopPhotoURL);
  }, []);

  let handleUpdate = () => {
    if (!name || !photo) {
      const notify = () => toast("Fill the all details!");
      notify();
    } else {
      async function update() {
        let { data } = await axios.put(`http://localhost:8000/pub-profile-update/${user.id}`, {
          shopName: name,
          shopPhotoURL: photo,
        });

        dispatch({ type: "USER_INFO", payload: data });
        localStorage.removeItem("userInfo");
        localStorage.setItem("userInfo", JSON.stringify(data));

        const notify = () => toast(data.msg);
        notify();
      }
      update();
    }
  };

  return (
    <div>
      <div className="vendor_update">
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="New shop name" />
        <input value={photo} onChange={(e) => setPhoto(e.target.value)} type="text" placeholder="New shop photo link" />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminProfileUpdate;
