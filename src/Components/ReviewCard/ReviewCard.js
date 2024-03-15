import React, { useState } from 'react';

const ReviewCard = ({ review }) => {
    return (
      <div className="review-card">
        <p>Name: {review.name}</p>
        <p>Review: {review.review}</p>
        <p>Rating: 
          {'⭐'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </p>
      </div>
    );
  };
  
  export default ReviewCard;