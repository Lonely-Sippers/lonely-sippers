import axios from "axios";

//ACTION TYPES
const GET_ORDER = "GET_ORDER";

const DELETE_FROM_ORDER = "DELETE_FROM_ORDER";

//ACTION CREATORS
const _getOrder = (order) => {
  return {
    type: GET_ORDER,
    order,
  };
};

const _deleteORDER = (order) => {
  return {
    type: DELETE_FROM_ORDER,
    order,
  };
};

//ACTION THUNKS

export const getOrder = (user) => {
  return async (dispatch) => {
    console.log(user);
    const res = await axios.get(`/api/orders/${user.id}`);
    const order = res.data;
    // console.log(ORDER);
    // console.log(order.orderItems);

    dispatch(_getOrder(order));
  };
};

export const deleteORDER = (ORDER) => async (dispatch) => {
  await axios.delete(`api/items/${ORDER.id}`);
  //console.log(ORDER);
  dispatch(_deleteORDER(ORDER));
};

export const addToORDER = (product, user) => async (dispatch) => {
  dispatch(_addToORDER(ORDER));
};

//Reducer
export const orderRecucer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order;

    default:
      return state;
  }
};
