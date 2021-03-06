import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import StarRating from './icons/StarRating';
import { Link } from 'react-router-dom';
import { writeReview } from '../../store/products';
import axios from 'axios';
import { addToCart } from '../../store/cart';
import { Quantity } from './Quantity';
import ReviewForm from './ReviewForm';

const SingleProduct = ({ product, writeReview, user, addToCart }) => {
  let reviews = product.reviews || [];

  let rating = [];

  const [quant, setquant] = useState(1);
  const [showReview, setshowReview] = useState(false);

  if (reviews) {
    rating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  }

  let yourReview = null;

  if (reviews) {
    yourReview = reviews.find((rev) => rev.user.id === user.id);
  }

  return (
    <div className="container mx-auto wood4 pt-20  lg:grid lg:grid-cols-5">
      <div className="col-span-3">
        <img
          src={product.image_URL}
          alt=""
          className="mx-auto rounded-lg"
          width="50%"
        />

        <div className="px-8">
          <div className="mt-8  md:flex md:justify-around">
            <StarRating
              rating={rating}
              editable={true}
              writeReview={writeReview}
              userId={user.id}
              productId={product.id}
              setshowReview={setshowReview}
            />
          </div>
        </div>
        <div className="mx-12">
          {yourReview ? (
            <div>
              <h3 className="font-semibold py-4">Your Review</h3>
              <hr className="wood1 py-4"></hr>
              <div key={yourReview.id}>
                <h1 className="mb-2">
                  Thank you for leaving a review{' '}
                  <strong>{yourReview.user.username}</strong>!
                </h1>
                <div>
                  <StarRating rating={yourReview.rating} />
                </div>
                <p className="pb-8">{yourReview.writtenReview}</p>
                <button className="btn transition-colors duration-300  mt-2 mb-4 lg:mt-0   rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
                  Edit Review
                </button>
                <hr className="wood1 py-4"></hr>
              </div>
            </div>
          ) : (
            <div>
              {!showReview ? (
                <div className="md:flex md:justify-around p-4">
                  <button
                    onClick={() => {
                      setshowReview(!showReview);
                    }}
                    className="btn transition-colors duration-300  mt-8 mb-4 lg:mt-0   rounded-full text-xs font-semibold text-white uppercase py-3 px-8 justify-around"
                  >
                    Write a Customer Review
                  </button>
                </div>
              ) : (
                <ReviewForm
                  rating={yourReview ? yourReview.rating : 0}
                  writeReview={writeReview}
                  userId={user.id}
                  productId={product.id}
                  setshowReview={setshowReview}
                  product={product}
                />
              )}
            </div>
          )}

          <h3 className="font-semibold py-4 mb-4">User Reviews</h3>
          {/* <hr className="wood1 py-4"></hr> */}

          {reviews &&
            reviews.map((review) => {
              if (!yourReview || review.id !== yourReview.id) {
                return (
                  <div key={review.id}>
                    <div>
                      {review.user.username}{' '}
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="pb-8">{review.writtenReview}</p>
                    <hr className="wood1 py-4"></hr>
                  </div>
                );
              }
            })}
        </div>
      </div>

      <div className="col-span-2">
        <div>
          <h3 className="font-semibold py-8">{product.category}</h3>
          <h4>{product.alcohol_type}</h4>

          {/* <p>{product.description}</p> */}

          <h4 className="">Country of Origin: {product.region}</h4>

          <div>
            <h4>Alcohol Percentage: {product.alcohol_percentage}</h4>
          </div>
          <p className="py-8">{product.description}</p>
          <h4 className="">Price: ${product.price}</h4>
          <div className="md:flex md:justify-between py-8  wider">
            <div>
              <Quantity setquant={setquant} quant={quant} />
              <button
                className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-8"
                onClick={() => addToCart(user.id, product.id, quant)}
              >
                Add to Cart
              </button>
            </div>

            <Link to={`/`}>
              <button className="btn transition-colors duration-300  mt-4 lg:mt-0  lg:ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ products, auth }, history) => {
  const product =
    products.find((prod) => prod.id === history.match.params.id * 1) || {};

  return {
    product: product || {},
    // rating: rating,
    history,

    user: auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addToCart: (userId, productId, total) =>
      dispatch(addToCart(userId, productId, total)),
    writeReview: (rating, userId, productId, written) =>
      dispatch(
        writeReview({ rating, userId, productId, writtenReview: written })
      ),
    //update review. if yourReview, dispatch update, else writeReview
  };
};
export default connect(mapState, mapDispatch)(SingleProduct);
