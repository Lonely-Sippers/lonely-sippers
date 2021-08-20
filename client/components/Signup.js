import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const SignupForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="bg-primary bigz">
      <form
        onSubmit={handleSubmit}
        name={name}
        className="flexy p-4 bigz items-center font-semibold"
      >
        <div>
          <label htmlFor="username" className="px-2">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password" className="px-2">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="email" className="px-2">
            <small>Email</small>
          </label>
          <input name="email" type="e-mail" />
        </div>
        <div>
          <label htmlFor="firstName" className="px-2">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName" className="px-2">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="address" className="px-2">
            <small>Address</small>
          </label>
          <input name="address" type="text" />
        </div>
        <div>
          <button
            type="submit"
            className="formbtn transition-colors duration-300    lg:ml-3 rounded-full text-xs font-semibold text-white uppercase py-2 px-8 items-center"
          >
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const address = evt.target.address.value;
      dispatch(
        authenticate(
          username,
          password,
          formName,
          email,
          firstName,
          lastName,
          address
        )
      );
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignupForm);
