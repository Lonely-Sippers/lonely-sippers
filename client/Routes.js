import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import Advertisement from './components/home/Advertisement';
import { getCart, checkCart } from './store/cart';
import Navbar from './components/Navbar';

//import Home from './components/Home';

import { me } from './store';
import Cart from './components/home/Cart';
import ShoppingWindow from './components/home/ShoppingWindow';
import { getProducts } from '../client/store/products';
// import { addToCart, delFromCart, updateCart } from '../client/store/products';
import { Signup } from './components/Signup';
import SingleProduct from './components/home/SingleProduct';
import AdminManageUsers from './components/home/AdminAllUsers';
import AdminManageProducts from './components/home/AdminAllProducts';

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
    // }
  }
  async componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      const { user } = this.props;

      await this.props.getCart(user);
    }
    if (prevProps.isLoggedIn && !this.props.isLoggedIn) {
      console.log('logout firing!');
      const { user } = this.props;

      await this.props.getCart(user);
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
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/:filter?" component={ShoppingWindow} />
          <Route exact path="/admin/users" component={AdminManageUsers} />
          <Route exact path="/admin/products" component={AdminManageProducts} />
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
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
