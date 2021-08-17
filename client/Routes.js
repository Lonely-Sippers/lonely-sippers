import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import Advertisement from './components/home/Advertisement';
import { getCart } from './store/cart';
import Navbar from './components/Navbar';

//import Home from './components/Home';

import { me } from './store';
// import Cart from './components/home/Cart';
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
  componentDidMount() {
    this.props.loadInitialData();
    this.props.getProducts();
  }
  async componentDidUpdate(bananaProps) {
    if (bananaProps.isLoggedIn !== this.props.isLoggedIn) {
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
            {/* <Route exact path="/cart" component={Cart} /> */}
          </Switch>
        </div>

        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/:filter?" component={ShoppingWindow} />
        <Route exact path="/admin/users" component={AdminManageUsers} />
        <Route exact path="/admin/products" component={AdminManageProducts} />

        {/* <Cart /> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    user: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    getProducts: () => dispatch(getProducts())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
