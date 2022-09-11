import { useReducer, createContext } from "react";

const Store = createContext();

const initialize = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "USER_INFO":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

let cartInitialize = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  },
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItems = action.payload;
      const existingItems = state.cart.cartItems.find((item) => item._id === newItems._id);
      const cartItems = existingItems ? state.cart.cartItems.map((item) => (item._id === existingItems._id ? newItems : item)) : [...state.cart.cartItems, newItems];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "REMOVE_TO_CART": {
      const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CLEAR_TO_CART": {
      localStorage.removeItem("cartItems");

      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    default:
      return state;
  }
}

function StoreProvider(props) {
  let [state, dispatch] = useReducer(userReducer, initialize);
  let [cartState, cartDispatch] = useReducer(cartReducer, cartInitialize);
  let value = { state, dispatch, cartState, cartDispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export { Store, StoreProvider };
