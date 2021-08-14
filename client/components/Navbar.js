import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Home from './home/Home';
import { Login } from './AuthForm';
import { Signup } from './Signup';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserIcon from './home/icons/UserIcon';

const Navbar = ({ handleClick, isLoggedIn, isAdmin, userImage }) => (
  <nav className="md:flex md:justify-between md:items-center border-b p-4 bg-wood5 px-4 text-wood1 nav">
    <Link to="/">
      <h1 className="md:flex text-justify items-end text-6xl font-bold">
        <img src="/favicon.ico" width="60px"></img>Lonely Sippers
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
      <div className="mx-4 flexy">
        {userImage ? (
          <img src={userImage} className="navUserImage" />
        ) : (
          <UserIcon />
        )}

        <div className="mx-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        {/* The navbar will show these links after you log in */}
        <div>
          <Home />
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      </div>
    ) : (
      <div className="mx-4">
        {/* The navbar will show these links before you log in */}
        <Link to="/login" className="mx-4">
          Login
        </Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    )}
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state.auth);
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
