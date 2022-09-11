import React, { useContext } from "react";
import { Col, Grid, Row } from "rsuite";
import Menubar from "../../components/client/Menubar";
import "./Cart.css";
import { Store } from "../../context/Store";

const Cart = () => {
  const { cartState, cartDispatch } = useContext(Store);
  const cart = cartState.cart.cartItems;

  console.log(cart.length);

  let handleCartQuantity = (product, quantity) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  let handleDelete = (product) => {
    cartDispatch({
      type: "REMOVE_TO_CART",
      payload: product,
    });
  };

  let handleClear = () => {
    cartDispatch({ type: "CLEAR_TO_CART" });
  };

  return (
    <>
      <Menubar />
      <div id="cart">
        <Grid>
          <h2 className="cart__heading">Cart Page</h2>
          <Row>
            <div>
              <Col xs={16}>
                {cart.length > 0 ? (
                  <>
                    <div className="cart__column">
                      <div>Item</div>
                      <div>Price</div>
                      <div>Quantity</div>
                      <div>Subtotal</div>
                      <div></div>
                    </div>
                    {cart.map((data, index) => (
                      <div key={index} className="cart__column cart__column__margin">
                        <div className="cart__column__item">
                          <div className="cart__column__img">
                            <img src={data.image} alt="img" />
                          </div>
                          <div className="cart__column__text">
                            <p>{data.brand}</p>
                            <h6>{data.title}</h6>
                            <p>Color</p>
                            <p>Size</p>
                          </div>
                        </div>
                        <div className="cart__column__price">
                          <h4>${data.price}</h4>
                        </div>
                        <div className="cart__column__quantity">
                          <div>
                            <button onClick={() => handleCartQuantity(data, data.quantity > 1 ? data.quantity - 1 : 1)}>-</button>
                            <p>{data.quantity}</p>
                            <button onClick={() => handleCartQuantity(data, data.quantity + 1)}>+</button>
                          </div>
                        </div>
                        <div className="cart__column__price">
                          <h4>${data.price * data.quantity}</h4>
                        </div>
                        <div>
                          <button onClick={() => handleDelete(data)} className="cross_btn">
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="cart_clear">
                      <button onClick={handleClear}>Clear</button>
                      <button>Update</button>
                    </div>
                  </>
                ) : (
                  <h4 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>No cart item!</h4>
                )}
              </Col>
              <Col xs={8}>Address</Col>
            </div>
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default Cart;
