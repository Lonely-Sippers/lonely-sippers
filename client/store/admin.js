//Capabilities: see all users, delete a user, see all orders, make user an admin/remove admin?, add/delete products
import axios from "axios";
import history from "../history";

//ACTION TYPES
const VIEW_USERS = "VIEW_USERS";
const GET_USER = "GET_USER";
const VIEW_ORDERS = "VIEW_ORDERS";
const ADMIN_STATUS = "ADMIN_STATUS";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";

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

const getSingleUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

const getOrders = (orders) => {
  return {
    type: VIEW_ORDERS,
    orders,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};

const updateProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
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
  product: {},
};

export const fetchAllUsers = (users) => {
  return async (dispatch) => {
    const res = await axios.get("/api/admin/users");
    const allUsers = res.data;
    dispatch(getUsers(allUsers));
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/admin/users/${userId}`);
    const gotUser = res.data;
    dispatch(getSingleUser(gotUser));
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

export const editProduct = (id, productInfo) => {
  console.log("EDIT in the STORE!", id);
  return async (dispatch) => {
    const res = await axios.put(`/api/products/${id}`, productInfo);
    const product = res.data;
    dispatch(updateProduct(product));
    history.push(`/admin/products/${id}`);
  };
};

export const postProduct = (product) => {
  console.log("IN STORE", product);
  return async (dispatch) => {
    const res = await axios.post("/api/products", product);
    const newProduct = res.data;
    dispatch(addProduct(newProduct));
    history.push("/admin/products");
    console.log("NEW PRODUCT", newProduct);
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
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case VIEW_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: [...state.products, action.product],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        product: action.product,
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
