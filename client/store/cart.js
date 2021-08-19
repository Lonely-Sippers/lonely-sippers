import axios from 'axios';

//ACTION TYPES
const GET_CART = 'GET_CART';
const CHECK_CART = 'CHECK_CART';
const CREATE_CART = 'CREATE_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';

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

const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};
//ACTION THUNKS

export const createCart = (user) => async (dispatch) => {
  const cart = { inProgress: true, userId: user };
  await axios.post('/api/orders/', cart);
};

export const checkCart = (user) => async (dispatch) => {
  const cart = (await axios.get(`/api/orders/carts/${user.id}`)).data;
  return cart;
};

export const getCart = (user) => {
  return async (dispatch) => {
    const cart = await (await axios.get(`/api/orders/carts/${user.id}`)).data;

    dispatch(_getCart(cart));
  };
};

export const deleteCart = (itemId, userId) => async (dispatch) => {
  console.log('in thunk itemId', itemId);
  await axios.delete(`api/items/${itemId}`);
  const cart = await axios.get(`/api/orders/carts/${userId}`);
  dispatch(_deleteCart(cart.data));
};

export const addToCart = (userId, productId) => {
  return async function (dispatch) {
    let cart = await (await axios.get(`/api/orders/carts/${userId}`)).data;

    await axios.post('/api/items', { orderId: cart.id, productId });

    cart = await (await axios.get(`/api/orders/carts/${userId}`)).data;

    dispatch(_addToCart(cart));
  };
};

//Reducer
export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case DELETE_FROM_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;

    default:
      return state;
  }
};
