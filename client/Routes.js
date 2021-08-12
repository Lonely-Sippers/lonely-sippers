import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import Advertisement from './components/home/Advertisement';
//import Home from './components/Home';
import { me } from './store';
import Cart from './components/home/Cart';
import ShoppingWindow from './components/home/ShoppingWindow';
import { getProducts } from '../client/store/products';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.getProducts();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="">
        <Advertisement />

        <div className="container mx-auto ">
          <ShoppingWindow />
          <Cart />
        </div>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    getProducts: () => dispatch(getProducts()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
