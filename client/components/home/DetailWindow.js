import React from 'react';
import { connect } from 'react-redux';

const DetailWindow = (props) => {
  const { products } = props;
  const id = props.match.params.id * 1 || '';
  const product = products.find((product) => product.id === id) || {};

  return (
    <div className="padding margin detail">
      <h3>{product.category}</h3>

      <img src={product.image_URL} alt="" className="bottle" />
      <h4>{product.alcohol_type}</h4>
      <h4>Country of Origin: {product.region}</h4>

      <div>
        <h4>
          Price: ${product.price}, Alcohol Percentage:{' '}
          {product.alcohol_percentage}
        </h4>
      </div>
      <button>Add to Cart</button>
    </div>
  );
};

const mapState = ({ products }) => {
  return {
    products,
  };
};

export default connect(mapState)(DetailWindow);
