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
    return price.toLocaleString('ru-RU') + 'р';
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
    <div className="cart-new">
      <h3 className="cart-title-new">Корзина</h3>
      
      <div className="cart-order-title">Ваш заказ</div>
      
      <div className="cart-items-new">
        {restaurantCart.length > 0 ? (
          restaurantCart.map((item, index) => (
            <div className="cart-item-new" key={index}>
              <div className="cart-item-left">
                <div className="cart-item-name-new">{item.name}</div>
                <div className="cart-item-details">
                  <span className="cart-item-weight">{item.weight}</span>
                  <span className="cart-item-price-new">{formatPrice(item.price)}</span>
                </div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    className="quantity-btn minus"
                  >-</button>
                  <span className="quantity-number">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    className="quantity-btn plus"
                  >+</button>
                </div>
                <div className="cart-item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.name)}
                  className="remove-btn"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart-new">
            Корзина пуста
            <br/>
            <small>Добавьте блюда из меню</small>
          </div>
        )}
      </div>
      
      {restaurantCart.length > 0 && (
        <>
          <div className="cart-summary-new">
            <div className="summary-row">
              <span className="summary-label">Сумма заказа</span>
              <span className="summary-value" id="cartSubtotal">{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Скидка</span>
              <span className="summary-value discount" id="cartDiscount">
                {discount > 0 ? `${discount * 100}%` : '0%'}
              </span>
            </div>
            <div className="summary-row total-row">
              <span className="summary-label">С учетом скидки</span>
              <span className="summary-value total" id="cartTotal">{formatPrice(total)}</span>
            </div>
          </div>
          
          <div className="cart-promo-new">
            <input 
              type="text" 
              className="cart-promo-input-new" 
              placeholder="Введите промокод" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)} 
            />
            <button className="cart-promo-btn-new" onClick={applyPromo}>Применить</button>
          </div>
          
          <div className="cart-final-total-new">
            <span>Итого:</span>
            <span className="final-total-price">{formatPrice(total)}</span>
          </div>
          
          <button className="checkout-btn-new" onClick={checkout}>
            <i className="fas fa-shopping-cart" style={{marginRight: '10px'}}></i>
            Оформить заказ
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;