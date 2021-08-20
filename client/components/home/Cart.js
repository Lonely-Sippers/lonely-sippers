import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../AuthForm';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { getCart, deleteCart, updateCart } from '../../store/cart';

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
      <div className="container mx-auto wood4 pt-20  lg:grid lg:grid-cols-5">
        <div className="col-span-3 ">
          <div>
            {orderItems.length !== 0 && (
              <div>
                {orderItems.map((item) => {
                  console.log(item.id);
                  const product = item.product;
                  total += product.price * 1;

                  return (
                    <div
                      className="card flexy justify-between m-4 relative"
                      key={item.id}
                    >
                      <img
                        src={product.image_URL}
                        alt={product.category}
                        width="20%"
                      />

                      <div>
                        <h1 className="font-semibold">{product.category}</h1>
                        <h1>Quantity: {item.total}</h1>
                      </div>

                      <div>
                        <p>{`Unit Price $ ${product.price}`}</p>
                        <p>
                          Total $
                          {Math.round(item.total * product.price * 100) / 100}
                        </p>
                        <button
                          onClick={() =>
                            this.props.deleteCart(item.id * 1, user.id * 1)
                          }
                          className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-6 cartLocal"
                        >
                          Remove item
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="checkoutBox col-span-2 pl-12 pt-12">
          {orderItems.length === 0 ? (
            <div className="cart cart-header font-semibold">
              {' '}
              You're cart is empty{' '}
            </div>
          ) : (
            <div>
              <div className="cart cart-header font-semibold">
                You have {orderItems.reduce((a, oi) => a + oi.total, 0)} items
                in your cart
              </div>

              <h1 className="py-8">
                Order Total:{' $'}
                {Math.round(
                  orderItems.reduce((a, item) => {
                    return a + item.total * item.product.price;
                  }, 0) * 100
                ) / 100}
              </h1>

              <div className="">
                <button
                  className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-6 mb-12"
                  onClick={() => {
                    this.setState({ checkout: !this.state.checkout });
                  }}
                >
                  Proceed to checkout
                </button>
              </div>
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
