import React, { useState } from 'react';
import DeliveryForm from './DeliveryForm';
import ReservationForm from './ReservationForm';
import { mockRestaurantMenu } from '../data/mockData';

const RestaurantTabs = ({ restaurant, addToCart }) => {
  const [activeTab, setActiveTab] = useState('menu');

  const menu = mockRestaurantMenu[restaurant.id] || mockRestaurantMenu[1];

  const handleAddToCart = (item) => {
    addToCart(item.name, item.price, item.weight, restaurant.name);

  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'about':
        return (
          <>
            <div className="restaurant-info-box">
              <h3 className="restaurant-info-title">О ресторане</h3>
              <p>{restaurant.description}</p>
            </div>
            <div className="restaurant-info-box">
              <h3 className="restaurant-info-title">Контакты</h3>
              <div className="restaurant-info-item">
                <div className="restaurant-info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="restaurant-info-text">
                  <h4>Адрес</h4>
                  <p>{restaurant.address}</p>
                </div>
              </div>
              <div className="restaurant-info-item">
                <div className="restaurant-info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="restaurant-info-text">
                  <h4>Телефон</h4>
                  <p>{restaurant.phone}</p>
                </div>
              </div>
              <div className="restaurant-info-item">
                <div className="restaurant-info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="restaurant-info-text">
                  <h4>Часы работы</h4>
                  <p>{restaurant.working_hours}</p>
                </div>
              </div>
            </div>
          </>
        );
        
      case 'menu':
        return (
          <>
            <h3 className="menu-section-title">Меню</h3>
            
            <h4 className="menu-subtitle">Популярное</h4>
            <div className="menu-items-list">
              {menu.popular.map((item) => (
                <div className="menu-item-detail" key={item.id}>
                  <div className="menu-item-header">
                    <div className="menu-item-name">{item.name}</div>
                    <div className="menu-item-price">{item.price}₽</div>
                  </div>
                  <div className="menu-item-weight">{item.weight}</div>
                  <div className="menu-item-description">{item.description}</div>
                  <button className="add-to-cart-btn" 
                          onClick={() => handleAddToCart(item)}>
                    Добавить в корзину
                  </button>
                </div>
              ))}
            </div>

            {menu.soups && menu.soups.length > 0 && (
              <>
                <h4 className="menu-subtitle">Супы</h4>
                <div className="menu-items-list">
                  {menu.soups.map((item) => (
                    <div className="menu-item-detail" key={item.id}>
                      <div className="menu-item-header">
                        <div className="menu-item-name">{item.name}</div>
                        <div className="menu-item-price">{item.price}₽</div>
                      </div>
                      <div className="menu-item-weight">{item.weight}</div>
                      <div className="menu-item-description">{item.description}</div>
                      <button className="add-to-cart-btn" 
                              onClick={() => handleAddToCart(item)}>
                        Добавить в корзину
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {menu.mains && menu.mains.length > 0 && (
              <>
                <h4 className="menu-subtitle">Горячие блюда</h4>
                <div className="menu-items-list">
                  {menu.mains.map((item) => (
                    <div className="menu-item-detail" key={item.id}>
                      <div className="menu-item-header">
                        <div className="menu-item-name">{item.name}</div>
                        <div className="menu-item-price">{item.price}₽</div>
                      </div>
                      <div className="menu-item-weight">{item.weight}</div>
                      <div className="menu-item-description">{item.description}</div>
                      <button className="add-to-cart-btn" 
                              onClick={() => handleAddToCart(item)}>
                        Добавить в корзину
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        );
        
      case 'delivery':
        return <DeliveryForm restaurant={restaurant} />;
        
      case 'reservation':
        return <ReservationForm restaurant={restaurant} />;
        
      default:
        return null;
    }
  };

  return (
    <>
      <div className="restaurant-nav">
        <div className={`restaurant-nav-item ${activeTab === 'about' ? 'active' : ''}`} 
             onClick={() => setActiveTab('about')}>О нас</div>
        <div className={`restaurant-nav-item ${activeTab === 'menu' ? 'active' : ''}`} 
             onClick={() => setActiveTab('menu')}>Меню</div>
        <div className={`restaurant-nav-item ${activeTab === 'delivery' ? 'active' : ''}`} 
             onClick={() => setActiveTab('delivery')}>Доставка</div>
        <div className={`restaurant-nav-item ${activeTab === 'reservation' ? 'active' : ''}`} 
             onClick={() => setActiveTab('reservation')}>Бронирование</div>
      </div>
      {renderTabContent()}
    </>
  );
};

export default RestaurantTabs;