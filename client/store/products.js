import axios from 'axios';

//ACTION TYPES
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT';

//ACTION CREATOR
const gotProducts = (products) => {
  return {
    type: GOT_PRODUCTS,
    products,
  };
};

const gotSingleProduct = (product) => {
  return {
    type: GOT_SINGLE_PRODUCT,
    product,
  };
};

export const getSingleProduct = (id) => {
  console.log('in the STORE!', id);
  return async (dispatch) => {
    const res = await axios.get(`/api/products/${id}`);
    const product = res.data;
    dispatch(gotSingleProduct(product));
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
    case GOT_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
