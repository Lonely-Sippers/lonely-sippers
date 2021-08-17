import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Home from './home/Home';
import { Login } from './AuthForm';
import { Signup } from './Signup';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserIcon from './home/icons/UserIcon';
import ShoppingBagIcon from './home/icons/ShoppingBagIcon';

const Navbar = ({ handleClick, isLoggedIn, isAdmin, userImage }) => (
  <nav className="md:flex md:justify-between md:items-center border-b-2 p-2 bg-wood5 px-4 text-wood1 nav">
    <Link to="/">
      <h1 className="md:flex text-justify items-end text-4xl font-bold items-center">
        <img src="/favicon.ico" width="50px"></img>Lonely Sippers
      </h1>
    </Link>

    {isAdmin ? (
      <div className="mx-4 flexy">
        {/* The navbar will show these links after you log in */}
        <div className="mx-4">
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
          <a href="#" onClick={handleClick} className="ml-4">
            Logout
          </a>
        </div>
        <ShoppingBagIcon />

        <h4 className="bagCount">3</h4>

        {userImage ? (
          <img src={userImage} className="navUserImage" />
        ) : (
          <UserIcon />
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

          <ShoppingBagIcon />
          <UserIcon />
        </div>
      </div>
    )}
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    userImage: state.auth.userImage,
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
