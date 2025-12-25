import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div 
        className="restaurant-img" 
        style={{backgroundImage: `url('${restaurant.image}')`}}
      ></div>
      <div className="restaurant-info">
        <div className="restaurant-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="restaurant-rating">{restaurant.rating}/5</div>
        </div>
        <p className="restaurant-location">
          <i className="fas fa-map-marker-alt"></i>
          {restaurant.address}
        </p>
        <p className="restaurant-description">{restaurant.description}</p>
        <button className="restaurant-link">Посмотреть меню →</button>
      </div>
    </div>
  );
};

export default RestaurantCard;