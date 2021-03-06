import React from 'react';

const ShoppingBagIcon = ({ setshowCart, setshowUser }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 mx-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onMouseEnter={() => {
        setshowCart(true);
        setshowUser(false);
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
};

export default ShoppingBagIcon;
