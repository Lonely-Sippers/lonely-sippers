import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../AuthForm";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { getCart, deleteCart, updateCart } from "../../store/cart";

// const Cart = ({ isLoggedIn, cart }) => {
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: false,
    };
  }
  componentDidMount() {}

  render() {
    const { isLoggedIn, cart, user, products } = this.props;
    let { checkout } = this.state;

    const orderItems = cart.orderItems || [];
    console.log(cart);
    const handleToken = (token, addresses) => {
      this.setState({ checkout: false });
      this.props.updateCart(user, cart);
    };

    let total = 0;
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
                  total += product.price * 1;

                  return (
                    <li key={item.id}>
                      <div>
                        <img src={product.image_URL} alt={product.category} />
                      </div>
                      <div>
                        <div>{product.category}</div>
                        <p>{` $ ${product.price}`}</p>
                      </div>

                      <button
                        onClick={() =>
                          this.props.deleteCart(item.id * 1, user.id * 1)
                        }
                      >
                        Remove item
                      </button>
                    </li>
                  );
                })}
                <div>
                  {/* <Link to="/checkout"> */}
                  <button
                    onClick={() => {
                      this.setState({ checkout: true });
                    }}
                  >
                    Proceed to checkout
                  </button>
                  {/* </Link> */}
                </div>
              </ul>
            </div>
          )}
          {checkout && (
            <StripeCheckout
              stripeKey="pk_test_51JQIRkBCNADMq9vuUSF0VtLWEcRAifyQBMZUkkXkjBcqwpE1dLKmnhJUtboCGdKA03eI4IjImmkXJDGQQDwWTN7600gtdbdYhd"
              token={handleToken}
              billingAddress
              shippingAddress
              amount={total * 100}
            />
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
  updateCart,
};

export default connect(mapState, mapDispatchToProps)(Cart);
