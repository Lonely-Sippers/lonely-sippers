import axios from 'axios';

//ACTION TYPES
const GOT_PRODUCTS = 'GOT_PRODUCTS';

//ACTION CREATOR
const gotProducts = (products) => {
  return {
    type: GOT_PRODUCTS,
    products,
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/products');
    const products = res.data;
    dispatch(gotProducts(products));
  };
};

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
