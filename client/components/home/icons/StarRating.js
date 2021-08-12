import React, { useState } from 'react';

const StarRating = ({ rating }) => {
  //   const [userRating, setUserRating] = useState(rating);
  let stars = [];
  const [userRating, setUserRating] = useState(rating);
  const [rated, setRated] = useState(false);
  let fullStars = Math.floor(userRating / 2);
  let starCount = 1;

  let color = ' starColor';
  if (rated) {
    color = ' wood1';
  }

  for (let i = 0; i < fullStars; i++) {
    let currentRate = starCount;
    starCount++;

    stars.push(
      <i
        className={'fas fa-star' + color}
        key={starCount}
        onMouseEnter={() => {
          setRated(true);
          setUserRating(Math.floor(currentRate * 2));
        }}
      />
    );
  }

  if (userRating % 2) {
    let currentRate = starCount;
    starCount++;

    stars.push(
      <i
        className={'fas fa-star-half-alt' + color}
        key={starCount}
        onMouseEnter={() => {
          setRated(true);
          setUserRating(Math.floor(currentRate * 2));
        }}
      />
    );
  }

  while (stars.length < 5) {
    let currentRate = starCount;
    starCount++;

    stars.push(
      <i
        className={'far fa-star' + color}
        key={starCount}
        onMouseEnter={() => {
          setRated(true);
          setUserRating(Math.floor(currentRate * 2));
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
      {stars.map((star, idx) => {
        if (idx < 5) {
          return star;
        }
      })}
    </div>
  );
};

export default StarRating;
