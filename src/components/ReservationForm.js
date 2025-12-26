import React, { useState } from 'react';

function ReservationForm({ restaurant }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    datetime: '',
    guests: '2'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Заявка на бронирование отправлена! С вами свяжутся для подтверждения.');
    setFormData({ name: '', phone: '', datetime: '', guests: '2' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="reservation-form">
      <h3 className="delivery-form-title">Забронировать столик</h3>
      <p className="delivery-form-subtitle">Заполните форму для бронирования столика в ресторане "{restaurant.name}"</p>

      <form id="reservationForm" onSubmit={handleSubmit}>
        <div className="delivery-form-group">
          <label className="delivery-form-label">Ваше имя *</label>
          <input type="text" className="delivery-form-input" placeholder="Введите ваше имя" 
                 name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="delivery-form-group">
          <label className="delivery-form-label">Номер телефона *</label>
          <input type="tel" className="delivery-form-input" placeholder="+7 (___) ___-__-__" 
                 name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="delivery-form-group">
          <label className="delivery-form-label">Дата и время *</label>
          <input type="datetime-local" className="delivery-form-input" 
                 name="datetime" value={formData.datetime} onChange={handleChange} required />
        </div>
        <div className="delivery-form-group">
          <label className="delivery-form-label">Количество гостей *</label>
          <input type="number" className="delivery-form-input" placeholder="2" 
                 name="guests" value={formData.guests} onChange={handleChange} min="1" max="20" required />
        </div>
        <div className="centered-buttons">
          <button type="submit" className="btn" style={{padding: '15px 40px', fontSize: '18px'}}>
            Забронировать столик
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;