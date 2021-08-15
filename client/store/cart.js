import axios from "axios";

//ACTION TYPES
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

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

export const getCart = (user) => async (dispatch) => {
  //console.log(user);
  const cart = await (await axios.get(`/api/orders/carts/${user.id}`)).data;

  dispatch(_getCart(cart));
};

export const deleteCart = (cart) => async (dispatch) => {
  await axios.delete(`api/items/${cart.id}`);
  console.log(cart);
  dispatch(_deleteCart(cart));
};
//Reducer
export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case DELETE_FROM_CART:
      return state.cart.filter((cart) => cart.id !== action.cart.id * 1);

    default:
      return state;
  }
};
