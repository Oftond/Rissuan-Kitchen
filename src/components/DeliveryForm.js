import React, { useState } from 'react';
import { showModal } from '../utils/helpers';

const DeliveryForm = ({ restaurant }) => {
  const [formData, setFormData] = useState({
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showModal('Заказ принят', 'Заказ на доставку принят! С вами свяжутся в течение 15 минут.');
    setFormData({ phone: '', address: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="delivery-form-container">
      <h3 className="delivery-form-title">Доставка на дом</h3>
      <p className="delivery-form-subtitle">Заполните форму и мы свяжемся с вами в течение 15 минут</p>

      <form id="deliveryForm" onSubmit={handleSubmit}>
        <div className="delivery-form-group">
          <label className="delivery-form-label">Номер телефона *</label>
          <input type="tel" className="delivery-form-input" placeholder="+86 123 4567 890" 
                 name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="delivery-form-group">
          <label className="delivery-form-label">Адрес доставки *</label>
          <input type="text" className="delivery-form-input" placeholder="Улица, дом, квартира" 
                 name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="centered-buttons">
          <button type="submit" className="btn" style={{padding: '15px 40px', fontSize: '18px'}}>
            Заказать доставку
          </button>
        </div>
      </form>

      <div className="delivery-contact-info">
        <div className="delivery-contact-title">Связаться с нами:</div>
        <div className="delivery-contact-phone">{restaurant.phone}</div>
        <p>Доставка работает: {restaurant.working_hours}</p>
      </div>
    </div>
  );
};

export default DeliveryForm;