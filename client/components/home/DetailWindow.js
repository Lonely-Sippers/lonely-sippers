import React from 'react';
import { connect } from 'react-redux';

const DetailWindow = ({ itemId, products, count }) => {
  // const { products } = props;
  // const id = props.match.params.id * 1 || '';
  const product = products.find((product) => product.id === itemId) || {};

  let classes =
    'nick   transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:bg-blue-300 hover:scale-110 hover:opacity-100 m-8 p-8';
  count > 2 ? (classes += ' col-span-2') : (classes += ' col-span-3');

  let rating = product.rating;
  let stars = [];

  let fullStars = Math.floor(rating / 2);
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i className="fas fa-star" />);
  }

  if (rating % 2) {
    stars.push(<i className="fas fa-star-half-alt" />);
  }

  while (stars.length < 5) {
    stars.push(<i className="far fa-star" />);
  }

  return (
    <div className={classes}>
      <img
        src={product.image_URL}
        alt=""
        className="mx-auto rounded-lg"
        width="60%"
      />

      <div className="px-8">
        <div className="mt-8  md:flex md:justify-around">
          <div>{stars.map((star) => star)}</div>
        </div>
        <div className="md:flex md:justify-between py-8">
          <h3>{product.category}</h3>
          <h4>{product.alcohol_type}</h4>
        </div>

        <p>{product.description}</p>

        <h4 className="mt-8">Country of Origin: {product.region}</h4>

        <div className="">
          <h4>Alcohol Percentage: {product.alcohol_percentage}</h4>
        </div>
        <div className="md:flex md:justify-between py-8">
          <h4>Price: ${product.price}</h4>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ products }) => {
  return {
    products,
  };
};

export default connect(mapState)(DetailWindow);
