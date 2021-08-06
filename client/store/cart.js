import axios from "axios";

//ACTION TYPES
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

//ACTION CREATORS
const addProductsToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

const deleteProductsFromCart = (productId) => {
  return {
    type: DELETE_FROM_CART,
    productId: productId,
  };
};

const updateQuantity = (productId, itemsTotal) => {
  return {
    type: UPDATE_QUANTITY,
    productId: productId,
    itemsTotal: itemsTotal
  };
};

//ACTION THUNKS
export const addToCart = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/cart");
    const products = res.data;
    dispatch(addProductsToCart(products));
  };
};

export const delFromCart = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/cart");
    const products = res.data;
    dispatch(deleteProductsFromCart(products));
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/cart");
    const products = res.data;
    dispatch(updateQuantity(products));
  };
};

//REDUCER
const initialState = {
    cart: []
};

//will dry out later
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state.cart.push(action.product);  
      return {
        ...state,
        cart: state.cart
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id != action.productId)
      };
    case UPDATE_QUANTITY:
      let newCart = state.cart.filter(product => product.id != action.productId);
      newCart.push(product);  
      return {
        ...state,
        cart: newCart
      };
    default:
      return state;
  }
};
