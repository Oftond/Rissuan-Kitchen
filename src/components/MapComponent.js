import React, { useEffect, useRef } from 'react';

const MapComponent = ({ restaurants }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Если Яндекс.Карты не загружаются, используем Google Maps
    if (!window.ymaps) {
      loadGoogleMaps();
    } else {
      loadYandexMaps();
    }
  }, [restaurants]);

  const loadYandexMaps = () => {
    if (!window.ymaps || !mapContainerRef.current) return;

    try {
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: [39.9042, 116.4074],
        zoom: 4,
        controls: []
      });

      restaurants.forEach(restaurant => {
        const marker = new window.ymaps.Placemark(
          [restaurant.latitude, restaurant.longitude],
          {
            hintContent: restaurant.name,
            balloonContent: `<b>${restaurant.name}</b><br>${restaurant.address}`
          },
          {
            preset: 'islands#redIcon'
          }
        );
        map.geoObjects.add(marker);
      });

    } catch (error) {
      console.log('Ошибка Яндекс.Карт, переключаемся на Google Maps');
      loadGoogleMaps();
    }
  };

  const loadGoogleMaps = () => {
    if (!mapContainerRef.current) return;
    
    // Google Maps через iframe
    const center = restaurants.length > 0 ? `${restaurants[0].latitude},${restaurants[0].longitude}` : '39.9042,116.4074';
    
    mapContainerRef.current.innerHTML = `
      <iframe
        title="Карта ресторанов"
        width="100%"
        height="100%"
        style="border:0; border-radius: 8px;"
        src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${center}&zoom=4&language=ru"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    `;
  };

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        width: '100%', 
        height: '300px', // Уменьшили высоту
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#f5f5f5'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#666'
      }}>
        Загрузка карты...
      </div>
    </div>
  );
};

export default MapComponent;