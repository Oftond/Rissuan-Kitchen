import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import RestaurantListItem from '../components/RestaurantListItem';
import { mockRestaurants } from '../data/mockData';

const MapPage = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    
    if (city === 'all') {
      setFilteredRestaurants(mockRestaurants);
    } else {
      const cityNames = {
        beijing: 'Пекин',
        shanghai: 'Шанхай',
        guangzhou: 'Гуанчжоу'
      };
      const cityName = cityNames[city];
      const filtered = mockRestaurants.filter(restaurant => restaurant.city === cityName);
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <div className="map-page-container">
      <div className="container">
        <div className="map-header">
          <h1 className="map-title">Карта ресторанов</h1>
          <p className="map-subtitle">Найдите ближайший ресторан на карте</p>
        </div>

        <div className="city-filters">
          <button className={`city-filter-btn ${selectedCity === 'all' ? 'active' : ''}`} 
                  onClick={() => handleCityFilter('all')}>Все города</button>
          <button className={`city-filter-btn ${selectedCity === 'beijing' ? 'active' : ''}`} 
                  onClick={() => handleCityFilter('beijing')}>Пекин</button>
          <button className={`city-filter-btn ${selectedCity === 'shanghai' ? 'active' : ''}`} 
                  onClick={() => handleCityFilter('shanghai')}>Шанхай</button>
          <button className={`city-filter-btn ${selectedCity === 'guangzhou' ? 'active' : ''}`} 
                  onClick={() => handleCityFilter('guangzhou')}>Гуанчжоу</button>
        </div>

        <div className="map-content">
          <MapComponent restaurants={filteredRestaurants} />

          <div className="map-restaurants-sidebar">
            <h3 className="map-restaurants-title">Рестораны</h3>
            <div id="mapRestaurantsList">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map(restaurant => (
                  <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
                ))
              ) : (
                <p style={{textAlign: 'center', color: '#888', padding: '20px'}}>Рестораны не найдены</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;