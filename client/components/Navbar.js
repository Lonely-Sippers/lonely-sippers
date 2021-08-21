import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Home from './home/Home';
import { Login } from './AuthForm';
import { Signup } from './Signup';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserIcon from './home/icons/UserIcon';
import ShoppingBagIcon from './home/icons/ShoppingBagIcon';

const Navbar = ({
  handleClick,
  isLoggedIn,
  isAdmin,
  userImage,
  cart,
  history,
  id,
}) => {
  const [showCart, setshowCart] = useState(false);
  const [showUser, setshowUser] = useState(false);
  // const [localCart, setlocalCart] = useState(cart);

  // const useCart = localCart || cart;

  const orderItems = cart.orderItems || [];

  // useEffect(() => {
  //   setlocalCart(cart);
  // }, []);

  return (
    <nav className="md:flex md:justify-between md:items-center border-b-2 p-2 bg-wood5 px-4 text-wood1 nav">
      <Link to="/">
        <h1 className="md:flex text-justify items-end text-4xl font-bold items-center">
          <img src="/favicon.ico" width="50px"></img>Lonely Sippers
        </h1>
      </Link>

      {isAdmin ? (
        <div className="mx-4 flexy">
          {/* The navbar will show these links after you log in */}
          <div className="mx-4 space-x-3">
            <Link to="/admin/users">Manage Users</Link>
            <span />
            <Link to="/admin/products">Manage Products</Link>
            <span />
            <Link to="/admin/orders">View Orders</Link>
          </div>
        </div>
      ) : (
        <div />
      )}

      {isLoggedIn ? (
        <div className="mx-4 flexy items-center relative">
          {/* The navbar will show these links after you log in */}
          <div className="flexy items-center">
            <Home />
          </div>

          <Link to="/cart">
            <ShoppingBagIcon
              setshowCart={setshowCart}
              setshowUser={setshowUser}
            />
          </Link>

          {orderItems.length > 0 && (
            <h4 className="bagCount">
              {orderItems.reduce((a, oi) => a + oi.total, 0)}
            </h4>
          )}

          {userImage ? (
            <img
              src={userImage}
              className="navUserImage"
              onMouseEnter={() => {
                setshowUser(true);
                setshowCart(false);
              }}
            />
          ) : (
            <UserIcon setshowUser={setshowUser} setshowCart={setshowCart} />
          )}
        </div>
      ) : (
        <div className="mx-4">
          <div className="mx-4 flexy items-center">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="mx-4">
              Login
            </Link>
            <Link to="/signup">Sign Up</Link>

            <Link to="/cart">
              <ShoppingBagIcon
                setshowCart={setshowCart}
                setshowUser={setshowUser}
              />
            </Link>
            <UserIcon setshowUser={setshowUser} setshowCart={setshowCart} />
          </div>
        </div>
      )}
      {showCart && (
        <div className="cartDrop" onMouseLeave={() => setshowCart(false)}>
          <h4 className="font-semibold	m-1">
            <Link to="/cart">View Cart</Link>
          </h4>
          <hr className="text-wood4 mb-2"></hr>
          <ul className="">
            {orderItems.map((orderItem) => {
              return (
                <li key={orderItem.id}>
                  {orderItem.total} {orderItem.product.category}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {showUser && (
        <div className="userDrop" onMouseLeave={() => setshowUser(false)}>
          <h4 className="font-semibold	m-1">Account Details</h4>
          <hr className="text-wood4"></hr>
          <h4 className="font-semibold	m-1">
            <Link to="/orders">View Past Orders</Link>
          </h4>
          <hr className="text-wood4 mb-2"></hr>

          {isLoggedIn && (
            <div>
              <h4
                className="font-semibold	m-1 mt-4 logout"
                onClick={() => {
                  handleClick();
                }}
              >
                Logout
              </h4>
              <hr className="text-wood4"></hr>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

/**
 * CONTAINER
 */
const mapState = (state, { history }) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    userImage: state.auth.userImage,
    cart: state.cart || {},
    user: state.auth,
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
