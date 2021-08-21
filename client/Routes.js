import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import Advertisement from './components/home/Advertisement';
import { getCart, checkCart } from './store/cart';
import { getOrder } from './store/orders';
import Navbar from './components/Navbar';

//import Home from './components/Home';

import { me } from './store';
import Cart from './components/home/Cart';
import ShoppingWindow from './components/home/ShoppingWindow';
import { getProducts } from '../client/store/products';
// import { addToCart, delFromCart, updateCart } from '../client/store/products';

import { Signup } from './components/Signup';
import SingleProduct from './components/home/SingleProduct';
import AdminManageUsers from './components/home/Admin_AllUsers';
import AdminManageProducts from './components/home/Admin_AllProducts';
import AdminSingleProduct from './components/home/Admin_SingleProduct';
import AddProduct from './components/home/Admin_AddProduct';
import EditProduct from './components/home/Admin_EditProduct';

import Checkout from './components/home/Checkout';
import Orders from './components/home/Orders';

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.getProducts();
    const { user } = this.props;
    // if (user) {
    await this.props.getCart(user);
    await this.props.getOrder(user);
    // }
  }
  async componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      const { user } = this.props;

      await this.props.getCart(user);
    }
    if (prevProps.isLoggedIn && !this.props.isLoggedIn) {
      // console.log('logout firing!');
      // const { user } = this.props;
      // await this.props.getCart(user);
    }
  }

  render() {
    // const { isLoggedIn } = this.props;

    return (
      <div className="">
        <div className="fixed w-screen nav bigz">
          <Navbar />

          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>

        <Route exact path="/admin/users" component={AdminManageUsers} />
        <Route exact path="/admin/products" component={AdminManageProducts} />
        <Route
          exact
          path="/admin/products/:id"
          component={AdminSingleProduct}
        />
        <Route exact path="/admin/product/add" component={AddProduct} />
        <Route exact path="/admin/product/edit" component={EditProduct} />

        <Switch>
          <Route exact path="/products/:id" component={SingleProduct} />

          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/:filter?" component={ShoppingWindow} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, history) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    user: state.auth,
    cart: state.cart || {},
    orders: state.orders || {},
    history,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    getProducts: () => dispatch(getProducts()),
    getCart: (user) => dispatch(getCart(user)),
    checkCart,
    getOrder: (user) => dispatch(getOrder(user)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
