import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRating from './icons/StarRating';
import { addToCart } from '../../store/cart';
import { Quantity } from './Quantity';

const DetailWindow = ({ itemId, products, count, auth, addToCart }) => {
  const product = products.find((product) => product.id === itemId) || {};
  let rating =
    product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length;

  let classes =
    'nick   transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:bg-blue-300 hover:scale-110 hover:opacity-100 m-8 p-8 relative';
  count > 2 ? (classes += ' col-span-2') : (classes += ' col-span-3');

  const [quant, setquant] = useState(1);

  return (
    <div className={classes}>
      <img
        src={product.image_URL}
        alt=""
        className="mx-auto rounded-lg"
        width="60%"
      />

      <div className="px-4">
        <div className="mt-8   text-center">
          <StarRating rating={rating} editable={true} />
          <h5>{product.reviews.length} reviews</h5>
        </div>
        <div className="md:flex md:justify-between py-8">
          <h3 className="font-semibold">{product.category}</h3>
          <h4>{product.alcohol_type}</h4>
        </div>

        {/* <p>{product.description}</p> */}

        <h4 className="">Country of Origin: {product.region}</h4>

        <div>
          <h4>Alcohol Percentage: {product.alcohol_percentage}</h4>
        </div>
        <h4 className="mb-16">Price: ${product.price}</h4>

        <div className="md:flex md:justify-between py-8 absolute bottom-0 detailWide items-center">
          <div>
            <Quantity setquant={setquant} quant={quant} />

            <button
              className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-6"
              onClick={() => addToCart(auth.id, product.id, quant)}
            >
              Add to Cart
            </button>
          </div>
          <Link to={`/products/${product.id}`}>
            <button className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-6">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ products, auth }) => {
  return {
    products,
    auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    addToCart: (userId, productId, total) =>
      dispatch(addToCart(userId, productId, total)),
  };
};

export default connect(mapState, mapDispatch)(DetailWindow);
