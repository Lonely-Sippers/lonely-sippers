import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const StarRating = ({
  rating,
  editable,
  writeReview,
  userId,
  productId,
  isLoggedIn,
}) => {
  const [userRating, setUserRating] = useState(0);
  let stars = [];
  useEffect(() => {
    setUserRating(rating);
  }, []);

  const ratingToUse = userRating || rating;

  const [rated, setRated] = useState(false);
  let fullStars = Math.floor(ratingToUse / 2);
  let starCount = 1;

  let color = ' starColor';
  if (rated) {
    color = ' wood1';
  }

  let mouseEnter = () => {};

  if (editable && isLoggedIn) {
    mouseEnter = (currentRate) => {
      setRated(true);
      setUserRating(Math.floor(currentRate * 2));
    };
  }

  let review = () => {};

  if (writeReview && isLoggedIn) {
    review = (rating, userId, productId, written) => {
      writeReview(rating, userId, productId, written);
    };
  }

  for (let i = 0; i < fullStars; i++) {
    let currentRate = starCount;
    starCount++;

    stars.push(
      <i
        className={'fas fa-star cursor-pointer' + color}
        key={starCount}
        onMouseEnter={() => {
          mouseEnter(currentRate);
        }}
        onClick={() => {
          review(currentRate * 2, userId, productId);
        }}
      />
    );
  }

  if (userRating % 2) {
    let currentRate = starCount;
    starCount++;

    stars.push(
      <i
        className={'fas fa-star-half-alt cursor-pointer' + color}
        key={starCount}
        onMouseEnter={() => {
          mouseEnter(currentRate);
        }}
        onClick={() => {
          review(currentRate * 2, userId, productId);
        }}
      />
    );
  }

  while (stars.length < 5) {
    let currentRate = starCount;
    starCount++;

    stars.push(
      <i
        className={'far fa-star cursor-pointer' + color}
        key={starCount}
        onMouseEnter={() => {
          mouseEnter(currentRate);
        }}
        onClick={() => {
          review(currentRate * 2, userId, productId);
        }}
      />
    );
  }

  return (
    <div
      onMouseLeave={() => {
        setUserRating(rating);
        setRated(false);
      }}
    >
      {stars.map((star) => star)}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(StarRating);
