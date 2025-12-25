import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantTabs from '../components/RestaurantTabs';
import Cart from '../components/Cart';
import { mockRestaurants, mockRestaurantMenu } from '../data/mockData';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState(() => {
    // Загружаем корзину из localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const foundRestaurant = mockRestaurants.find(r => r.id === parseInt(id));
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    } else {
      navigate('/restaurants');
    }
  }, [id, navigate]);

  useEffect(() => {
    // Сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (itemName, price, weight, restaurantName) => {
    const existingItem = cart.find(item => 
      item.name === itemName && item.restaurant === restaurantName
    );
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.name === itemName && item.restaurant === restaurantName 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, { 
        name: itemName, 
        price: price, 
        weight: weight,
        restaurant: restaurantName,
        quantity: 1 
      }]);
    }
  };

  if (!restaurant) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="restaurant-page">
          <div className="restaurant-header-detail">
            <h1 className="restaurant-title">{restaurant.name}</h1>
            <div className="restaurant-rating">{restaurant.rating}/5</div>
          </div>

          <div className="restaurant-content">
            <div className="restaurant-left">
              <RestaurantTabs restaurant={restaurant} addToCart={addToCart} />
            </div>
            <div className="restaurant-right">
              <Cart cart={cart} restaurantName={restaurant.name} setCart={setCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;