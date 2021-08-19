import axios from "axios";

//ACTION TYPES
const GET_ORDER = "GET_ORDER";
const CHECK_ORDER = "CHECK_ORDER";
const CREATE_ORDER = "CREATE_ORDER";
const ADD_TO_ORDER = "ADD_TO_ORDER";
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

// export const createOrder = (user) => async (dispatch) => {
//   const ORDER = { inProgress: true, userId: user };
//   await axios.post("/api/orders/", ORDER);
// };

export const getOrder = (user) => {
  return async (dispatch) => {
    console.log(user);
    const res = await axios.get(`/api/orders/${user}`);
    const order = res.data;
    // console.log(ORDER);
    console.log(order);

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
      return [...state, action.order];

    default:
      return state;
  }
};
