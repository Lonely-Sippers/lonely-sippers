import axios from "axios";

//ACTION TYPES
const GET_CART = "GET_CART";
const CREATE_CART = "CREATE_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";

//ACTION CREATORS
const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const _deleteCart = (cart) => {
  return {
    type: DELETE_FROM_CART,
    cart,
  };
};

//ACTION THUNKS

export const checkCart = (user) => async (dispatch) => {
  const cart = await axios.get(`/api/orders/${user}`);
  console.log(cart);
};

export const getCart = (user) => async (dispatch) => {
  //console.log(user);
  const cart = await (await axios.get(`/api/orders/carts/${user.id}`)).data;
  console.log(cart["order items"]);

  dispatch(_getCart(cart["order items"]));
};

export const deleteCart = (cart) => async (dispatch) => {
  await axios.delete(`api/items/${cart.id}`);
  //console.log(cart);
  dispatch(_deleteCart(cart));
};
//Reducer
export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return [...state, action.cart];
    case DELETE_FROM_CART:
      return state[0].filter((cart) => {
        console.log(cart, action.cart);
        cart.id !== action.cart.id;
      });

    default:
      return state;
  }
};
