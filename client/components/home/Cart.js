import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../AuthForm";
import { getCart } from "../../store/cart";

// const Cart = ({ isLoggedIn, cart }) => {
class Cart extends Component {
  async componentDidMount() {
    // const { user } = this.props;
    // const userz = Object.assign({}, user);
    // console.log(userz);
    //await this.props.getCart(userz);
  }
  async componentDidUpdate(prev) {
    const { user } = this.props;
    if (prev.user !== user) {
      await this.props.getCart(user);
    }
    //const userz = Object.assign({}, user);
    //console.log(userz);
    //await this.props.getCart(user);
  }
  render() {
    const { isLoggedIn, cart, user } = this.props;
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
            You have {cart.cart.length} in the cart
          </div>
        )}
        <div>
          {/* <div className="cart">
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{cart.total}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
    user: state.auth,
  };
};
const mapDispatchToProps = {
  getCart,
};

export default connect(mapState, mapDispatchToProps)(Cart);
