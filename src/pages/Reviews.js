import React, { useState, useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewSlider from '../components/ReviewSlider';
import { mockRestaurants, initialReviews } from '../data/mockData';

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [restaurants] = useState(mockRestaurants);

  const handleSubmitReview = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: reviews.length + 1,
      created_at: new Date().toISOString()
    };
    setReviews([...reviews, reviewWithId]);
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="reviews-page">
          <h2 className="section-title">Отзывы наших клиентов</h2>

          <ReviewSlider reviews={reviews} restaurants={restaurants} />
          
          <ReviewForm restaurants={restaurants} onSubmit={handleSubmitReview} />
        </div>
      </div>
    </div>
  );
}

export default Reviews;