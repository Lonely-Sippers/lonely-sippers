import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Home from "./home/Home";
import { Login } from "./AuthForm";
import { Signup } from "./Signup";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="fixed w-screen nav">
    <nav className="md:flex md:justify-between md:items-center border-b-2 p-4 bg-wood5 px-4 text-wood1 nav">
      {/* <div> */}
      <a href="/" className="mx-4">
        <h1 className="md:flex text-justify items-end text-6xl font-bold">
          <img src="/favicon.ico" width="60px"></img>Lonely Sippers
        </h1>
      </a>
      {/* </div> */}
      {isAdmin ? (
        <div className="mx-4 flexy">
          {/* The navbar will show these links after you log in */}
          <div className="mx-4">
          <Link to="/admin/users">Manage Users</Link>
          <span />
          <Link to="/admin/products">Manage Products</Link>
          </div>
        </div>
      ) : (
        <div />
      )}

      {isLoggedIn ? (
        <div className="mx-4 flexy">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
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
    <div className="bg-white ">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
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
