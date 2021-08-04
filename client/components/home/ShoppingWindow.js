import React from 'react';
import DetailWindow from './DetailWindow';

const ShoppingWindow = () => {
  return (
    <div className="border padding twoThird">
      <h1>shop</h1>
      <hr></hr>
      <div className="flex">
        <ul className="list">
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
          <li>Product</li>
        </ul>
        <DetailWindow />
      </div>
    </div>
  );
};

export default ShoppingWindow;
