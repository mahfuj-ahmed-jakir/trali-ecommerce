import React, { useEffect, useState, useRef } from "react";
import "./AdminProduct.css";
import axios from "axios";
import JoditEditor from "jodit-react";
import { ColorPicker } from "easy-color-picker";
import { Button } from "rsuite";
import { ToastContainer, toast } from "react-toastify";

const AdminProduct = () => {
  let [brand, setBrand] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);

  // Product add state
  let [proTitle, setProTitle] = useState("");
  let [proImage, setProImage] = useState("");
  let [proPrice, setProPrice] = useState("");
  let [proDisPrice, setProDisPrice] = useState("");
  let [proSlug, setProSlug] = useState("");
  let [proBrand, setProBrand] = useState("");
  let [proCategory, setProCategory] = useState("");
  let [proSubCategory, setProSubCategory] = useState("");
  let [color, setColor] = useState([]);
  let [size, setSize] = useState([]);
  const [content, setContent] = useState("");

  // Jodit
  const editor = useRef(null);

  let handleProductAdd = (e) => {
    e.preventDefault();
    if (!proTitle) {
      const notify = () => toast("❎ Enter product title!");
      notify();
    } else if (!proImage) {
      const notify = () => toast("❎ Enter product image!");
      notify();
    } else if (!proPrice) {
      const notify = () => toast("❎ Enter product price!");
      notify();
    } else if (!proSlug) {
      const notify = () => toast("❎ Enter product slug!");
      notify();
    } else if (!proBrand) {
      const notify = () => toast("❎ Select a product brand!");
      notify();
    } else if (!proCategory) {
      const notify = () => toast("❎ Select a product category!");
      notify();
    } else if (!proSubCategory) {
      const notify = () => toast("❎ Select a product sub category!");
      notify();
    } else if (!content) {
      const notify = () => toast("❎ Enter product description!");
      notify();
    } else {
      async function ProFun() {
        let { data } = await axios.post("http://localhost:8000/product", {
          title: proTitle,
          image: proImage,
          price: proPrice,
          disPrice: proDisPrice,
          slug: proSlug,
          brand: proBrand,
          category: proCategory,
          subCategory: proSubCategory,
          color: color,
          size: size,
          description: content,
          approve: true,
        });
        const notify = () => toast(data);
        setProTitle("");
        setProImage("");
        setProPrice("");
        setProDisPrice("");
        setProSlug("");
        setProBrand("");
        setProCategory("");
        setProSubCategory("");
        setContent("");
        setColor([]);
        setSize([]);
        notify();
      }
      ProFun();
    }
  };

  let handleClear = () => {
    setProTitle("");
    setProImage("");
    setProPrice("");
    setProDisPrice("");
    setProSlug("");
    setProBrand("");
    setProCategory("");
    setProSubCategory("");
    setContent("");
    setColor([]);
    setSize([]);
  };

  useEffect(() => {
    async function cat() {
      let { data } = await axios.get("http://localhost:8000/approve-category");
      setCategory(data);
    }
    cat();
  }, []);

  useEffect(() => {
    async function brnd() {
      let { data } = await axios.get("http://localhost:8000/approve-brand");
      setBrand(data);
    }
    brnd();
  }, []);

  useEffect(() => {
    async function sub() {
      let { data } = await axios.get("http://localhost:8000/approve-sub-category");
      setSubCategory(data);
    }
    sub();
  }, []);

  return (
    <div id="product_add">
      <ToastContainer autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h4>Add Product</h4>
      <form className="product_form">
        <input value={proTitle} onChange={(e) => setProTitle(e.target.value)} className="input" type="text" placeholder="Product title" />
        <input value={proImage} onChange={(e) => setProImage(e.target.value)} className="input" type="text" placeholder="Product image link" />
        <input value={proPrice} onChange={(e) => setProPrice(e.target.value)} className="input" type="text" placeholder="Product price" />
        <input value={proDisPrice} onChange={(e) => setProDisPrice(e.target.value)} className="input" type="text" placeholder="Discount price (optional)" />
        <input value={proSlug} onChange={(e) => setProSlug(e.target.value)} className="input" type="text" placeholder="Custom slug" />
        <select onChange={(e) => setProBrand(e.target.value)} className="select">
          <option>Select brand</option>
          {brand.map((data) => (
            <option value={data.brand} key={data._id}>
              {data.brand}
            </option>
          ))}
        </select>
        <select onChange={(e) => setProCategory(e.target.value)} className="select">
          <option>Select category</option>
          {category.map((data) => (
            <option value={data.category} key={data._id}>
              {data.category}
            </option>
          ))}
        </select>
        <select onChange={(e) => setProSubCategory(e.target.value)} className="select">
          <option>Select sub category</option>
          {subCategory.map((data) => (
            <option value={data.subCategory} key={data._id}>
              {data.subCategory}
            </option>
          ))}
        </select>

        <div className="picker">
          <div>
            <h6>Available Color (optional)</h6>
            <ColorPicker preview={color} size="28.5px" background="#ffffff" width="400px" bgRadius="8px" onClick={(code) => setColor([...color, code])} />
          </div>
          <div>
            <h6 style={{ marginLeft: "20px" }}>Available Size (optional)</h6>
            <div className="picker_size_preview">
              {size.map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </div>
            <div className="picker_size">
              <div onClick={() => setSize([...size, "S"])}>S</div>
              <div onClick={() => setSize([...size, "M"])}>M</div>
              <div onClick={() => setSize([...size, "L"])}>L</div>
              <div onClick={() => setSize([...size, "X"])}>X</div>
              <div onClick={() => setSize([...size, "XL"])}>XL</div>
              <div onClick={() => setSize([...size, "XS"])}>XS</div>
              <div onClick={() => setSize([...size, "3"])}>3</div>
              <div onClick={() => setSize([...size, "4"])}>4</div>
              <div onClick={() => setSize([...size, "5"])}>5</div>
              <div onClick={() => setSize([...size, "6"])}>6</div>
              <div onClick={() => setSize([...size, "7"])}>7</div>
              <div onClick={() => setSize([...size, "8"])}>8</div>
              <div onClick={() => setSize([...size, "9"])}>9</div>
              <div onClick={() => setSize([...size, "10"])}>10</div>
              <div onClick={() => setSize([...size, "36"])}>36</div>
              <div onClick={() => setSize([...size, "37"])}>37</div>
              <div onClick={() => setSize([...size, "38"])}>38</div>
              <div onClick={() => setSize([...size, "39"])}>39</div>
              <div onClick={() => setSize([...size, "40"])}>40</div>
              <div onClick={() => setSize([...size, "41"])}>41</div>
              <div onClick={() => setSize([...size, "42"])}>42</div>
              <div onClick={() => setSize([...size, "43"])}>43</div>
              <div onClick={() => setSize([...size, "44"])}>44</div>
              <div onClick={() => setSize([...size, "45"])}>45</div>
            </div>
          </div>
        </div>
        <h6 style={{ marginTop: "20px" }}>Product Description</h6>
        <div className="jodi-panel">
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // textarea
            // onBlur={(newContent) => setContent(newContent)} // preferred
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="pro_btn">
          <Button onClick={handleClear} color="red" appearance="primary">
            Clear
          </Button>
          <Button onClick={handleProductAdd} type="submit" color="violet" appearance="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProduct;
