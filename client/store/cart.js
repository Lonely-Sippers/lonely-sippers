import axios from 'axios';

//ACTION TYPES
const GET_CART = 'GET_CART';
const CHECK_CART = 'CHECK_CART';
const CREATE_CART = 'CREATE_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_CART = 'UPDATE_CAR';

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

const _updateCart = (cart) => {
  return {};
};

//ACTION THUNKS

export const checkCart = (user) => async (dispatch) => {
  const cart = (await axios.get(`/api/orders/carts/${user.id}`)).data;
  return cart;
};

export const getCart = (user) => {
  return async (dispatch) => {
    let res = await axios.get(`/api/orders/carts/${user.id}`);

    let cart = res.data;

    if (!cart) {
      res = await axios.post(`/api/orders`, {
        inProgress: true,
        userId: user.id,
      });
      cart = res.data;
    }

    dispatch(_getCart(cart));
  };
};

export const deleteCart = (itemId, userId) => async (dispatch) => {
  await axios.delete(`api/items/${itemId}`);
  const cart = await axios.get(`/api/orders/carts/${userId}`);
  dispatch(_deleteCart(cart.data));
};

export const addToCart = (userId, productId, quant) => {
  const total = quant || 1;
  return async function (dispatch) {
    let cart = await (await axios.get(`/api/orders/carts/${userId}`)).data;

    let orderItem = cart.orderItems.find(
      (item) => item.product.id === productId
    );

    if (orderItem) {
      await axios.put(`/api/items/${orderItem.id}`, { total });
    } else {
      await axios.post('/api/items', { orderId: cart.id, productId, total });
    }

    cart = await (await axios.get(`/api/orders/carts/${userId}`)).data;

    dispatch(_addToCart(cart));
  };
};

//here
export const updateCart = (user, carts) => {
  return async function (dispatch) {
    carts.inProgress = false;
    console.log(user.id);
    const cart = await axios.put(`/api/orders/carts/${carts.id}`, carts).data;
    createCart(user.id);
  };
};

export const createCart = (user) => async (dispatch) => {
  const res = { inProgress: true, userId: user };
  const cart = await axios.post('/api/orders', res);
  dispatch(_addToCart(cart));
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
