import React from 'react';
import DetailWindow from './DetailWindow';
import { connect } from 'react-redux';

const ShoppingWindow = ({ products }) => {
  console.log(products);
  return (
    <div className="border padding twoThird">
      <h1>shop</h1>
      <hr></hr>
      <div className="flex">
        <ul className="list">
          {products.map((product) => (
            <li key={product.id}>{product.category}</li>
          ))}
        </ul>
        <DetailWindow />
      </div>
    </div>
  );
};

const mapState = (state) => ({ products: state.products });

export default connect(mapState)(ShoppingWindow);
