import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRestaurants } from '../data/mockData';

const MapComponent = ({ restaurants = mockRestaurants }) => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [center, setCenter] = useState([39.9042, 116.4074]);
  const [sortedRestaurants, setSortedRestaurants] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const [apiKey] = useState('413ff08a-b2de-4ef8-ad5f-9edc42547ed5');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const sortRestaurantsByDistance = useCallback((centerCoords, restaurantsList = restaurants) => {
    const restaurantsWithDistance = restaurantsList.map(restaurant => ({
      ...restaurant,
      distance: calculateDistance(
        centerCoords[0], centerCoords[1],
        restaurant.latitude, restaurant.longitude
      )
    })).sort((a, b) => a.distance - b.distance);
    
    setSortedRestaurants(restaurantsWithDistance);
  }, [restaurants]);

  const filterRestaurants = useCallback(() => {
    if (!searchQuery.trim()) {
      sortRestaurantsByDistance(center, restaurants);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.city.toLowerCase().includes(query) ||
      restaurant.address.toLowerCase().includes(query) ||
      restaurant.description.toLowerCase().includes(query)
    );

    sortRestaurantsByDistance(center, filtered);
  }, [searchQuery, restaurants, center, sortRestaurantsByDistance]);

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, filterRestaurants]);

  useEffect(() => {
    if (mapLoaded || mapError) return;
    loadYandexMaps();
  }, [restaurants, mapLoaded, mapError]);

  useEffect(() => {
    if (mapLoaded && center) {
      sortRestaurantsByDistance(center);
    }
  }, [mapLoaded, center, sortRestaurantsByDistance]);

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
      center: center,
      zoom: 4,
      controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
    });

    setMapInstance(map);

    map.events.add('boundschange', (event) => {
      const newCenter = map.getCenter();
      const newCenterCoords = [newCenter[0], newCenter[1]];
      setCenter(newCenterCoords);
    });

    const markers = [];
    
    restaurants.forEach(restaurant => {
      try {
        const balloonContent = `
          <div style="padding: 15px; max-width: 250px; font-family: Arial, sans-serif;">
            <div style="font-size: 16px; font-weight: bold; color: #8B0000; margin-bottom: 8px;">
              ${restaurant.name}
            </div>
            <div style="color: #666; margin-bottom: 8px;">
              <i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i>
              ${restaurant.address}
            </div>
            <div style="color: #666; margin-bottom: 12px;">
              <i class="fas fa-star" style="color: #FFD700; margin-right: 5px;"></i>
              <strong>${restaurant.rating}/5</strong>
            </div>
            <button 
              onclick="window.openRestaurant(${restaurant.id})"
              style="
                background: #8B0000;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                width: 100%;
                transition: background-color 0.3s;
              "
              onmouseover="this.style.backgroundColor='#A00000'"
              onmouseout="this.style.backgroundColor='#8B0000'"
            >
              <i class="fas fa-utensils" style="margin-right: 8px;"></i>
              Перейти к ресторану
            </button>
          </div>
        `;

        const marker = new window.ymaps.Placemark(
          [restaurant.latitude, restaurant.longitude],
          {
            hintContent: `${restaurant.name} (${restaurant.rating}/5)`,
            balloonContent: balloonContent,
            balloonCloseButton: true
          },
          {
            preset: 'islands#redIcon',
            iconColor: '#8B0000',
            balloonMaxWidth: 300,
            balloonCloseButton: true
          }
        );

        marker.events.add('click', (e) => {
          e.preventDefault();
          navigate(`/restaurants/${restaurant.id}`);
        });

        marker.events.add('mouseenter', () => {
          setSelectedRestaurant(restaurant.id);
        });

        marker.events.add('mouseleave', () => {
          setSelectedRestaurant(null);
        });

        markers.push(marker);
        map.geoObjects.add(marker);
        
      } catch (error) {
        console.error('Ошибка создания маркера:', error);
      }
    });

    window.openRestaurant = (restaurantId) => {
      navigate(`/restaurants/${restaurantId}`);
    };

    return () => {
      if (map) {
        markers.forEach(marker => {
          map.geoObjects.remove(marker);
        });
        delete window.openRestaurant;
      }
    };
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
      </div>
    `;
  };

  const goToRestaurant = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  const centerMapOnRestaurant = (restaurant) => {
    if (mapInstance && window.ymaps) {
      mapInstance.setCenter([restaurant.latitude, restaurant.longitude], 14);
      setSelectedRestaurant(restaurant.id);
      
      mapInstance.geoObjects.each((geoObject) => {
        if (geoObject.geometry && 
            geoObject.geometry.getCoordinates()[0] === restaurant.latitude &&
            geoObject.geometry.getCoordinates()[1] === restaurant.longitude) {
          geoObject.balloon.open();
        }
      });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '30px', width: '100%', marginTop: '20px' }}>
      <div style={{ flex: '0 0 65%' }}>
        <div 
          ref={mapRef} 
          style={{ 
            width: '100%', 
            height: '600px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
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
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '15px' }}></div>
                <div style={{ fontSize: '16px' }}>Загрузка интерактивной карты...</div>
                <div style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
                  Пока загружается карта, вы можете просмотреть список ресторанов справа
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div style={{
          marginTop: '15px',
          padding: '15px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          fontSize: '14px',
          color: '#666'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              background: '#8B0000', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px'
            }}>•</div>
            <span>Кликните на метку, чтобы увидеть информацию о ресторане</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              border: '2px solid #8B0000', 
              borderRadius: '50%'
            }}></div>
            <span>Нажмите "На карте" в списке справа, чтобы переместиться к ресторану</span>
          </div>
        </div>
      </div>

      <div style={{ flex: '0 0 35%' }}>
        <div style={{ 
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #eee',
            background: 'linear-gradient(135deg, #8B0000 0%, #A00000 100%)',
            color: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '15px'
            }}>
              <i className="fas fa-list" style={{ fontSize: '20px' }}></i>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
                Список ресторанов
                <span style={{
                  fontSize: '14px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  marginLeft: '10px',
                  fontWeight: 'normal'
                }}>
                  {sortedRestaurants.length} из {restaurants.length}
                </span>
              </h3>
            </div>
            
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Поиск ресторанов по названию, городу или адресу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 40px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#333'
                }}
              />
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666'
              }}></i>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          <div style={{ 
            flex: 1, 
            overflowY: 'auto',
            padding: '10px'
          }}>
            {sortedRestaurants.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedRestaurants.map((restaurant, index) => (
                  <div 
                    key={restaurant.id}
                    style={{
                      padding: '15px',
                      backgroundColor: selectedRestaurant === restaurant.id ? '#fff5f5' : 
                                      index < 3 ? '#f9f9f9' : '#fff',
                      borderRadius: '8px',
                      border: selectedRestaurant === restaurant.id ? '2px solid #8B0000' : 
                              index < 3 ? '1px solid #8B0000' : '1px solid #eee',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      position: 'relative',
                      opacity: searchQuery && !(
                        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        restaurant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
                      ) ? 0.6 : 1
                    }}
                    onMouseEnter={() => setSelectedRestaurant(restaurant.id)}
                    onMouseLeave={() => setSelectedRestaurant(null)}
                    onClick={() => goToRestaurant(restaurant.id)}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        backgroundColor: index < 3 ? '#8B0000' : '#666',
                        color: 'white',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </span>
                      
                      
                      <h4 style={{ 
                        margin: 0, 
                        color: '#8B0000',
                        fontSize: '16px',
                        fontWeight: '600',
                        flex: 1
                      }}>
                        {restaurant.name}
                      </h4>
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '5px',
                        fontSize: '14px',
                        color: '#FFD700',
                        flexShrink: 0
                      }}>
                        <i className="fas fa-star"></i>
                        <span style={{ color: '#666', fontWeight: 'bold' }}>{restaurant.rating}/5</span>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <i className="fas fa-map-marker-alt" style={{ fontSize: '12px' }}></i>
                        <span>{restaurant.city}</span>
                      </div>
                      
                      <div style={{ 
                        fontSize: '13px', 
                        color: '#8B0000',
                        fontWeight: 'bold',
                        background: '#f5f5f5',
                        padding: '3px 8px',
                        borderRadius: '12px'
                      }}>
                        <i className="fas fa-ruler" style={{ marginRight: '5px' }}></i>
                        {restaurant.distance.toFixed(1)} км
                      </div>
                    </div>
                    
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#888',
                      marginBottom: '10px',
                      lineHeight: '1.4'
                    }}>
                      <i className="fas fa-map-pin" style={{ marginRight: '5px', fontSize: '11px' }}></i>
                      {restaurant.address}
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      marginTop: '10px'
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToRestaurant(restaurant.id);
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#8B0000',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'background-color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#A00000'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B0000'}
                      >
                        <i className="fas fa-utensils"></i>
                        Подробнее
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          centerMapOnRestaurant(restaurant);
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#f0f0f0',
                          color: '#666',
                          border: '1px solid #ddd',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#8B0000';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#8B0000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f0f0f0';
                          e.currentTarget.style.color = '#666';
                          e.currentTarget.style.borderColor = '#ddd';
                        }}
                      >
                        <i className="fas fa-map-marker-alt"></i>
                        На карте
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}></div>
                <h4 style={{ marginBottom: '10px', color: '#8B0000' }}>Рестораны не найдены</h4>
                <p style={{ marginBottom: '20px' }}>
                  {searchQuery ? `По запросу "${searchQuery}" ничего не найдено` : 'Нет доступных ресторанов'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: '#8B0000',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    <i className="fas fa-times" style={{ marginRight: '8px' }}></i>
                    Очистить поиск
                  </button>
                )}
              </div>
            )}
          </div>

          <div style={{ 
            padding: '15px 20px', 
            borderTop: '1px solid #eee',
            background: '#f9f9f9',
            fontSize: '13px',
            color: '#666'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-info-circle" style={{ color: '#8B0000' }}></i>
                <span>Сортировка по удаленности от центра карты</span>
              </div>
              <div style={{ 
                background: '#8B0000', 
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {sortedRestaurants.length} шт.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;