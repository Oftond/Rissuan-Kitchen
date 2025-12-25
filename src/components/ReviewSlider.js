import React, { useState } from 'react';
import { getStarsHTML } from '../utils/helpers';

const ReviewSlider = ({ reviews, restaurants }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getRestaurantName = (id) => {
    const restaurant = restaurants.find(r => r.id === id);
    return restaurant ? restaurant.name : 'Ресторан';
  };

  const nextSlide = () => {
    if (currentSlide < reviews.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="reviews-slider">
      <div className="reviews-container" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
        {reviews.map(review => (
          <div className="review-card" key={review.id}>
            <div className="review-content">
              <div className="review-header">
                <div className="review-avatar">{review.author_name.charAt(0)}</div>
                <div className="review-author">
                  <h4>{review.author_name}</h4>
                  <p>{getRestaurantName(review.restaurant_id)}</p>
                  <div className="testimonial-rating">
                    <div dangerouslySetInnerHTML={{__html: getStarsHTML(review.rating)}}></div>
                  </div>
                </div>
              </div>
              <div className="review-text">{review.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button className="slider-btn" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-btn" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;