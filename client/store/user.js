import axios from "axios";
// import history from "../history";

const initialState = {
  newUser: {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
  },
  currentUser: {},
};
//ACTION TYPES
const NEW_USER = "NEW_USER";
const GET_USER = "GET_USER";

//ACTION CREATORS
const addNewUser = (user) => {
  return {
    type: NEW_USER,
    user,
  };
};

const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

//ACTION THUNKS
export const addUser = (user) => {
  return async (dispatch) => {
    const res = await axios.post("/api/users", user);
    const addedUser = res.data;
    dispatch(addNewUser(addedUser));
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/users/${userId}`);
    const gotUser = res.data;
    dispatch(getUser(gotUser));
  };
};

//REDUCER

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_USER:
      return {
        ...state,
        newUser: action.user,
      };
    case GET_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    default:
      return state;
  }
};
