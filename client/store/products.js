import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT';
const WROTE_REVIEW = 'WROTE_REVIEW';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

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

const removeProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

const wroteReview = (product) => {
  return {
    type: WROTE_REVIEW,
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

export const deleteProduct = (id, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${id}`);

    dispatch(removeProduct(id));
    history.history.push('/admin/products');
  };
};

export const writeReview = (review) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/reviews', review);

    const res = await axios.get(`/api/products/${review.productId}`);
    const product = res.data;
    console.log('thunk', product);
    dispatch(wroteReview(product));
  };
};

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    case GOT_SINGLE_PRODUCT:
      return action.product;
    case DELETE_PRODUCT:
      return [...state].filter((product) => product.id !== action.productId);
    case WROTE_REVIEW:
      return [
        ...state.filter((prod) => prod.id !== action.product.id),
        action.product,
      ];
    default:
      return state;
  }
};
