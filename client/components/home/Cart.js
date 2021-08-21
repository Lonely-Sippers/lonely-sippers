import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../AuthForm';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { getCart, deleteCart, updateCart } from '../../store/cart';

const Cart = ({
  isLoggedIn,
  cart,
  user,
  products,
  updateCart,
  deleteCart,
  getCart,
  loadInitialData,
  getProducts,
  getOrder,
}) => {
  const [checkout, setcheckout] = useState(false);

  useEffect(() => {
    async function pleaseWork() {
      await getCart(user);
    }
    pleaseWork();
  }, []);

  let orderItems = cart.orderItems || [];

  const handleToken = async (token, addresses) => {
    setcheckout(false);
    await updateCart(user, cart);

    await getCart(user);
    window.location.reload(false);
  };

  let total = 0;

  return (
    <div className="container mx-auto wood4 pt-20  ">
      {orderItems.length === 0 ? (
        <div className="container mx-auto flexy flex-col">
          <h1 className="cart cart-header font-semibold justify-center text-center mt-4">
            {' '}
            You're cart is empty{' '}
          </h1>

          <Link
            to="/"
            className="btn transition-colors duration-300  mt-4   rounded-full text-xs font-semibold text-white uppercase py-3 px-6 justify-center m-auto"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-5">
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
                            onClick={() => deleteCart(item.id * 1, user.id * 1)}
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
                    setcheckout(!checkout);
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
          </div>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart || {},
    user: state.auth || {},
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (user) => dispatch(getCart(user)),
    deleteCart: (itemId, userId) => dispatch(deleteCart(itemId, userId)),
    updateCart: (user, cart) => dispatch(updateCart(user, cart)),
  };
};

export default connect(mapState, mapDispatchToProps)(Cart);
