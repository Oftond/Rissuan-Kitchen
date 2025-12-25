import React, { useState } from 'react';

const ReviewSlider = ({ reviews, restaurants }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getRestaurantName = (id) => {
    const restaurant = restaurants.find(r => r.id === id);
    return restaurant ? restaurant.name : 'Ресторан';
  };

  const getStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return { __html: stars };
  };

  const nextSlide = () => {
    if (currentSlide < reviews.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(reviews.length - 1);
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
                </div>
              </div>
              <div className="review-text">{review.text}</div>
              <div className="testimonial-rating" dangerouslySetInnerHTML={getStars(review.rating)}></div>
            </div>
          </div>
        ))}
      </div>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px'}}>
        <button 
          onClick={prevSlide}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '28px',
            color: '#8B0000',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          ‹
        </button>
        
        <span style={{color: '#666'}}>
          {currentSlide + 1} / {reviews.length}
        </span>
        
        <button 
          onClick={nextSlide}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '28px',
            color: '#8B0000',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;