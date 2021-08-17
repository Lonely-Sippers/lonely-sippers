import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../AuthForm";
import { getCart, deleteCart } from "../../store/cart";

// const Cart = ({ isLoggedIn, cart }) => {
class Cart extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { user } = this.props;
    console.log(user);
    await this.props.getCart(user);
  }
  async componentDidUpdate(prev) {
    if (prev.cart.length !== this.props.length) {
      const { user } = this.props;
      await this.props.getCart(user);
    }
  }
  render() {
    const { isLoggedIn, cart, user, products } = this.props;
    console.log(user);

    return (
      <div>
        {cart.length === 0 ? (
          <div className="cart cart-header"> Cart is empty </div>
        ) : (
          <div className="cart cart-header">
            You have {cart.length} in the cart
          </div>
        )}
        <div className="down">
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
                      <button onClick={() => this.props.deleteCart(item)}>
                        x
                      </button>
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
    cart: state.cart[0] || [],
    user: state.auth,
    products: state.products,
  };
};
const mapDispatchToProps = {
  getCart,
  deleteCart,
};

export default connect(mapState, mapDispatchToProps)(Cart);
