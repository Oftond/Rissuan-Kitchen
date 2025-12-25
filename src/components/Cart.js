import React, { useState } from 'react';
import { useModal } from '../utils/modalContext';

const Cart = ({ cart, restaurantName, setCart }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const { showModal } = useModal();

  const restaurantCart = cart.filter(item => item.restaurant === restaurantName);
  
  const subtotal = restaurantCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = discount > 0 ? Math.floor(subtotal * (1 - discount)) : subtotal;

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + '₽';
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter(item => 
      !(item.name === itemName && item.restaurant === restaurantName)
    ));
  };

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemName);
      return;
    }
    
    setCart(cart.map(item => 
      item.name === itemName && item.restaurant === restaurantName
        ? {...item, quantity: newQuantity}
        : item
    ));
  };

  const applyPromo = () => {
    if (promoCode === 'RUSSIA10') {
      setDiscount(0.1);
      showModal('Промокод применен', 'Промокод RUSSIA10 успешно применен! Скидка 10%');
    } else {
      showModal('Ошибка', 'Неверный промокод. Попробуйте RUSSIA10');
    }
  };

  const checkout = () => {
    if (restaurantCart.length === 0) {
      showModal('Корзина пуста', 'Добавьте блюда в корзину из меню');
      return;
    }
    showModal('Заказ оформлен', 
      `Ваш заказ на сумму ${formatPrice(total)} успешно оформлен!\nС вами свяжутся в течение 15 минут для подтверждения.`,
      () => {
        setCart(cart.filter(item => item.restaurant !== restaurantName));
      }
    );
  };

  return (
    <div className="cart-container">
      <h3 className="cart-title">Корзина</h3>
      <div className="cart-items">
        {restaurantCart.length > 0 ? (
          restaurantCart.map((item, index) => (
            <div className="cart-item" key={index}>
              <div style={{flex: 1}}>
                <div className="cart-item-name">{item.name}</div>
                <div style={{fontSize: '12px', color: '#666', marginTop: '2px'}}>
                  {item.weight} • {formatPrice(item.price)}
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px'}}>
                  <button 
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1px solid #ddd',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1px solid #ddd',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >+</button>
                </div>
              </div>
              <div>
                <div className="cart-item-price">{formatPrice(item.price * item.quantity)}</div>
                <button 
                  onClick={() => removeFromCart(item.name)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff4444',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginTop: '5px'
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart" style={{textAlign: 'center', padding: '20px', color: '#666'}}>
            Корзина пуста
            <br/>
            <small>Добавьте блюда из меню</small>
          </div>
        )}
      </div>
      
      {restaurantCart.length > 0 && (
        <>
          <div className="cart-summary">
            <div className="cart-summary-item">
              <span>Сумма заказа</span>
              <span id="cartSubtotal">{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary-item">
              <span>Скидка</span>
              <span id="cartDiscount">{discount * 100}%</span>
            </div>
            <div className="cart-summary-total">
              <span>Итого:</span>
              <span id="cartTotal">{formatPrice(total)}</span>
            </div>
          </div>
          <div className="cart-promo">
            <input 
              type="text" 
              className="cart-promo-input" 
              placeholder="Введите промокод" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)} 
            />
            <button className="cart-promo-btn" onClick={applyPromo}>Применить</button>
          </div>
          <div className="cart-final-total">Итого: {formatPrice(total)}</div>
          <button className="checkout-btn" onClick={checkout}>Оформить заказ</button>
        </>
      )}
    </div>
  );
};

export default Cart;