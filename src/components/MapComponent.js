import React, { useEffect, useRef, useState } from 'react';
import { mockRestaurants } from '../data/mockData';

const MapComponent = ({ restaurants = mockRestaurants }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [apiKey] = useState('413ff08a-b2de-4ef8-ad5f-9edc42547ed5');

  useEffect(() => {
    if (mapLoaded || mapError) return;

    loadYandexMaps();
  }, [restaurants, mapLoaded, mapError]);

  const loadYandexMaps = () => {
    const scriptId = 'yandex-maps-script';
    
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`;
    script.async = true;
    
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          try {
            initYandexMap();
            setMapLoaded(true);
          } catch (error) {
            console.error('Ошибка инициализации карты:', error);
            setMapError(true);
            showFallback();
          }
        });
      } else {
        setMapError(true);
        showFallback();
      }
    };

    script.onerror = () => {
      console.log('Не удалось загрузить Яндекс.Карты');
      setMapError(true);
      showFallback();
    };

    document.head.appendChild(script);
  };

  const initYandexMap = () => {
    if (!window.ymaps || !mapRef.current) {
      throw new Error('API Яндекс.Карт не загружено или контейнер не найден');
    }

    
    const map = new window.ymaps.Map(mapRef.current, {
      center: [39.9042, 116.4074],
      zoom: 4,
      controls: ['zoomControl', 'fullscreenControl']
    });

    restaurants.forEach(restaurant => {
      try {
        const marker = new window.ymaps.Placemark(
          [restaurant.latitude, restaurant.longitude],
          {
            hintContent: restaurant.name,
            balloonContent: `
              <div style="padding: 10px; max-width: 200px;">
                <strong style="color: #8B0000;">${restaurant.name}</strong><br>
                <span style="color: #666;">${restaurant.address}</span><br>
                <span style="color: #666;">Рейтинг: ${restaurant.rating}/5</span>
              </div>
            `
          },
          {
            preset: 'islands#redIcon',
            iconColor: '#8B0000'
          }
        );
        
        map.geoObjects.add(marker);
      } catch (error) {
        console.error('Ошибка создания маркера:', error);
      }
    });
  };

  const showFallback = () => {
    if (!mapRef.current) return;
    
    mapRef.current.innerHTML = `
      <div style="
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        height: 100%;
        background: #f5f5f5;
        color: #666;
        text-align: center;
        padding: 20px;
      ">
        <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
        <h3 style="margin-bottom: 10px; color: #8B0000;">Карта временно недоступна</h3>
        <p style="margin-bottom: 20px;">Список ресторанов доступен справа</p>
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
          width: 100%;
          max-width: 400px;
        ">
          ${restaurants.map(restaurant => `
            <div style="
              background: white;
              padding: 10px;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              text-align: left;
            ">
              <div style="font-weight: bold; color: #8B0000; font-size: 14px;">${restaurant.name}</div>
              <div style="font-size: 12px; color: #666;">${restaurant.address}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '65%', 
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        position: 'relative'
      }}
    >
      {!mapLoaded && !mapError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          color: '#666',
          zIndex: 10
        }}>
          Загрузка Яндекс.Карт...
        </div>
      )}
    </div>
  );
};

export default MapComponent;