import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { mockRestaurants } from '../data/mockData';

const Restaurants = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="restaurants-page">
          <h2 className="section-title">Все рестораны</h2>

          <div className="restaurants-grid">
            {mockRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;