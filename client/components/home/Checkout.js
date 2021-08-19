import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../AuthForm";

class Checkout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    const { user, cart } = this.props;
    const orderItems = cart.orderItems;
    console.log(user, orderItems);

    return (
      <div className="checkout-container">
        <div className={"pt-20"}>
          <div>
            <p>
              <strong>Checkout:</strong>
            </p>
          </div>
          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.address}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  //console.log(auth);
  return { cart: state.cart || [], user: state.auth || {} };
};

export default connect(mapState)(Checkout);
