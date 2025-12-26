import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
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
          <h1 className="map-title">Рестораны Русской кухни в Китае</h1>
          <p className="map-subtitle">Найдите ближайший ресторан с традиционной русской кухней</p>
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

        <MapComponent restaurants={filteredRestaurants} />
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '15px',
          color: '#666'
        }}>
          <i className="fas fa-info-circle" style={{ marginRight: '8px', color: '#8B0000' }}></i>
          Показано <strong>{filteredRestaurants.length}</strong> ресторанов 
          {selectedCity !== 'all' ? ` в городе ${selectedCity === 'beijing' ? 'Пекин' : selectedCity === 'shanghai' ? 'Шанхай' : 'Гуанчжоу'}` : ' во всех городах'}
          . Нажмите на ресторан в списке справа, чтобы увидеть его на карте.
        </div>
      </div>
    </div>
  );
};

export default MapPage;