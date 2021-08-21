import React, { useState } from 'react';
import { writeReview } from '../../store/products';
import StarRating from './icons/StarRating';
import { connect } from 'react-redux';

const ReviewForm = ({
  rating,
  writeReview,
  userId,
  productId,
  setshowReview,
  product,
}) => {
  const [yourRating, setyourRating] = useState(rating);
  console.log('props', productId, userId, yourRating);

  return (
    <div className="mt-4  ">
      <hr className="wood1"></hr>
      <form
        className="flexy p-4 bigz items-center font-semibold flex-col"
        onSubmit={(evt) => {
          evt.preventDefault();
          console.log(yourRating, userId, productId, evt.target.review.value);
          writeReview(yourRating, userId, productId, evt.target.review.value);
        }}
      >
        <StarRating
          rating={yourRating}
          editable={true}
          //   writeReview={writeReview}
          userId={userId}
          productId={productId}
          setshowReview={setshowReview}
          setyourRating={setyourRating}
          className="my-2"
        />
        <div>
          {/* <label htmlFor="review" className="px-2">
            <small>Review</small>
          </label> */}
          <textarea
            name="review"
            type="text"
            rows="4"
            cols="50"
            defaultValue={`What did you think of ${product.category}?`}
            className="reviewBox my-4"
          />
        </div>
        <button
          className="btn transition-colors duration-300  mt-8 mb-4 lg:mt-0   rounded-full text-xs font-semibold text-white uppercase py-3 px-8 justify-around"
          type="submit"
        >
          Submit Review
        </button>
      </form>
      <hr className="wood1"></hr>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    writeReview: (rating, userId, productId, written) =>
      dispatch(
        writeReview({ rating, userId, productId, writtenReview: written })
      ),
  };
};

export default connect(null, mapDispatch)(ReviewForm);
