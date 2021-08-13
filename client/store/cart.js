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
    itemsTotal: itemsTotal,
  };
};

//ACTION THUNKS

export const getCart = (user) => async (dispatch) => {
  //console.log(user);
  const cart = await (await axios.get(`/api/orders/carts/${user.id}`)).data;

  dispatch(_getCart(cart));
};

//will dry out later
export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart,
      };

    default:
      return state;
  }
};
