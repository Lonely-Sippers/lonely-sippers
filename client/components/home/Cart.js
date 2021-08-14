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
    const { isLoggedIn, cart, user, products } = this.props;
    console.log(cart, products);
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
        <div>
          {cart.length !== 0 && (
            <div className="cart">
              <ul className="cart-items">
                {cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.productId
                  );
                  return (
                    <li key={item.id}>
                      <div>
                        <img src={product.image_URL} alt={product.category} />
                      </div>
                      <div>{product.category}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart.cart || [],
    user: state.auth,
    products: state.products,
  };
};
const mapDispatchToProps = {
  getCart,
};

export default connect(mapState, mapDispatchToProps)(Cart);
