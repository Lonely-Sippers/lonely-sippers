//Capabilities: see all users, delete a user, see all orders, make user an admin/remove admin?, add/delete products
import axios from "axios";

//ACTION TYPES
const VIEW_USERS = "VIEW_USERS";
const DELETE_USER = "DELETE_USER";
const VIEW_ORDERS = "VIEW_ORDERS";
// const ADD_PRODUCT = "ADD_PRODUCT";
// const DELETE_PRODUCT = "DELETE_PRODUCT";
const ADMIN_STATUS = "ADMIN_STATUS";

//ACTION CREATORS
const getUsers = (users) => {
  return {
    type: VIEW_USERS,
    users,
  };
};

const deleteUsers = (userId) => {
  return {
    type: DELETE_USER,
    userId,
  };
};

const getOrders = (orders) => {
  return {
    type: VIEW_ORDERS,
    orders,
  };
};

const adminStat = (user) => {
  return {
    type: ADMIN_STATUS,
    user,
  };
};

//ACTION THUNKS
const adminState = {
  users: [],
  products: [],
  orders: [],
  user: {},
  product: {}
};

export const fetchAllUsers = (users) => {
  return async (dispatch) => {
    const res = await axios.get("/api/admin/users");
    const allUsers = res.data;
    dispatch(getUsers(allUsers));
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/admin/users/${userId}`);
    const removedUser = res.data;
    dispatch(deleteUsers(removedUser));
  };
};

export const fetchAllOrders = (orders) => {
  return async (dispatch) => {
    const res = await axios.get("/api/admin/orders");
    const allOrders = res.data;
    dispatch(getOrders(allOrders));
  };
};

export const changeAdminStat = (userId) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/admin/users/${userId}`, { isAdmin });
    const changeAdmin = res.data;
    dispatch(adminStat(changeAdmin));
  };
};

//REDUCER

export const adminReducer = (state = adminState, action) => {
  switch (action.type) {
    case VIEW_USERS:
      return {
        ...state,
        users: action.users,
      };
    case DELETE_USER:
      return {
        ...state,
        user: state.users.filter((user) => user.id !== action.userId),
      };
    case VIEW_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case ADMIN_STATUS:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
