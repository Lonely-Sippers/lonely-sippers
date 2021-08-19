import axios from 'axios';

//ACTION TYPES
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT';
const WROTE_REVIEW = 'WROTE_REVIEW';

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

export const writeReview = (review) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/reviews', review);

    const res = await axios.get(`/api/products/${review.productId}`);
    const product = res.data;

    dispatch(wroteReview(product));
  };
};

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    case GOT_SINGLE_PRODUCT:
      return action.product;
    case WROTE_REVIEW:
      return [
        ...state.filter((prod) => prod.id !== action.product.id),
        action.product,
      ];
    default:
      return state;
  }
};
