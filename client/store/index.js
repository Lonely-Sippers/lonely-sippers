import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import { productReducer } from "./products";
import { cartReducer } from "./cart";
import { userReducer } from "./user";
import { adminReducer } from "./admin";
import { orderRecucer } from "./orders";

const reducer = combineReducers({
  auth,
  products: productReducer,
  cart: cartReducer,
  user: userReducer,
  admin: adminReducer,
  orders: orderRecucer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
