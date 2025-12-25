import React from 'react';
import { useNavigate } from 'react-router-dom';

function RestaurantListItem({ restaurant }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  const getStars = (rating) => {
    let stars = '';
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars += '<i class="fas fa-star"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    
    return { __html: stars };
  };

  return (
    <div className="map-restaurant-item" onClick={handleClick}>
      <div className="map-restaurant-name">{restaurant.name}</div>
      <div className="map-restaurant-address">{restaurant.address}</div>
      <div className="map-restaurant-rating">
        <span className="stars" dangerouslySetInnerHTML={getStars(restaurant.rating)}></span>
        <span>{restaurant.rating}/5</span>
      </div>
    </div>
  );
}

export default RestaurantListItem;