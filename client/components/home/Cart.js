import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../AuthForm";

const Cart = ({ isLoggedIn, cart }) => {
  console.log(cart);
  return (
    // <div className="border padding oneThird backgroundWhite">
    //   {isLoggedIn ? <h1>Your cart is empty!</h1> : <Login />}
    // </div>
    <div>
      {cart.length === 0 ? (
        <div className="cart cart-header"> Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          You have {cart.length} in the cart
        </div>
      )}
      <div></div>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

export default connect(mapState)(Cart);
