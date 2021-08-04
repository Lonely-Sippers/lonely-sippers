import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../AuthForm';

const Cart = ({ isLoggedIn }) => {
  return (
    <div className="border padding oneThird">
      {isLoggedIn ? <h1>You're cart is empty!</h1> : <Login />}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(Cart);
