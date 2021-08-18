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
    //console.log(user);
    const cart = await (await axios.get(`/api/orders/carts/${user.id}`)).data;
    // console.log(cart);

    dispatch(_getCart(cart));
  };
};

export const deleteCart = (cart) => async (dispatch) => {
  await axios.delete(`api/items/${cart.id}`);
  //console.log(cart);
  dispatch(_deleteCart(cart));
};

export const addToCart = (product, user) => async (dispatch) => {
  const order = await (await axios.get(`/api/orders/carts/${user}`)).data;
  console.log(order, product);
  const orderItem = { orderId: order.id, productId: product };
  console.log(orderItem);
  const cart = await axios.post('/api/items', orderItem).data;
  dispatch(_addToCart(cart));
};

//Reducer
export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case DELETE_FROM_CART:
      return state[0].filter((cart) => {
        console.log(cart, action.cart);
        cart.id !== action.cart.id;
      });
    case ADD_TO_CART:
      return [...state, action.cart];

    default:
      return state;
  }
};
