import React, { useContext, useState } from "react";
import { Panel } from "rsuite";
import "./Product.css";
import Rating from "./Rating";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Store } from "../../context/Store";

const Product = ({ img, rating, brand, title, color, size, price, items }) => {
  let [colorSt, setColorSt] = useState("");
  let [sizeSt, setSizeSt] = useState("");

  let { cartState, cartDispatch } = useContext(Store);
  const { cart } = cartState;

  let handleCart = (product) => {
    const existingItems = cart.cartItems.find((data) => data._id === product._id);
    const quantity = existingItems ? existingItems.quantity + 1 : 1;
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  return (
    <div className="product">
      <Panel bodyFill style={{ display: "inline-block", width: "100%" }}>
        <img src={img} alt={title} width="100%" />
        <Panel>
          <div className="product_top">
            <Rating rating={rating} />
            <h6>{brand}</h6>
          </div>
          <h5>{title}</h5>
          <div className="product_top">
            <>
              <div className="product_dis">
                {color.map((data, index) => (
                  <div key={index} onClick={() => setColorSt(data)} className="product_color" style={{ background: data, border: colorSt === data ? "2px solid #C4C4C4" : "none" }}></div>
                ))}
              </div>
              <div className="product_dis">
                {size.map((data, index) => (
                  <div key={index} onClick={() => setSizeSt(data)} style={sizeSt === data ? styles.sizeActive : styles.sizeNonActive} className="product_size">
                    {data}
                  </div>
                ))}
              </div>
            </>
          </div>
          <span onClick={() => handleCart(items)} className="span">
            <HiOutlineShoppingBag />
            <h4>${price}</h4>
          </span>
        </Panel>
      </Panel>
    </div>
  );
};

let styles = {
  sizeActive: {
    background: "#f1f1f1",
    border: "1px solid #C4C4C4",
  },

  sizeNonActive: {
    background: "none",
    border: "none",
  },
};

export default Product;
