import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../AuthForm";
import { Link } from "react-router-dom";
import { getCart, deleteCart } from "../../store/cart";

// const Cart = ({ isLoggedIn, cart }) => {
class Cart extends Component {
  constructor(props) {
    super(props);
  }
  // async componentDidMount() {
  //   const { user } = this.props;

  //   await this.props.getCart(user);
  // }
  // async componentDidUpdate(prev) {
  //   if (prev.cart.length !== this.props.length) {
  //     const { user } = this.props;
  //     await this.props.getCart(user);
  //   }
  // }
  render() {
    const { isLoggedIn, cart, user, products } = this.props;

    const orderItems = cart.orderItems || [];

    return (
      <div className="pt-20">
        {orderItems.length === 0 ? (
          <div className="cart cart-header"> Cart is empty </div>
        ) : (
          <div className="cart cart-header">
            You have {orderItems.length} in the cart
          </div>
        )}
        <div className="down">
          {orderItems.length !== 0 && (
            <div className="cart">
              <ul className="cart-items">
                {orderItems.map((item) => {
                  console.log(item.id);
                  const product = item.product;

                  return (
                    <li key={item.id}>
                      <div>
                        <img src={product.image_URL} alt={product.category} />
                      </div>
                      <div>{product.category}</div>
                      <button
                        onClick={() =>
                          this.props.deleteCart(item.id * 1, user.id * 1)
                        }
                      >
                        x
                      </button>
                    </li>
                  );
                })}
                <div>
                  <Link to="/checkout">
                    <button>Proceed to checkout</button>
                  </Link>
                </div>
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
    cart: state.cart || {},
    user: state.auth || {},
    // products: state.products,
  };
};
const mapDispatchToProps = {
  getCart,
  deleteCart,
};

export default connect(mapState, mapDispatchToProps)(Cart);
