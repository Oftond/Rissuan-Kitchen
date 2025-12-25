import React, { useState } from 'react';

const ReservationForm = ({ restaurant }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    datetime: '',
    guests: '2'
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const message = `Заявка на бронирование столика в ресторане "${restaurant.name}" принята!\n\nДетали:\n• Имя: ${formData.name}\n• Телефон: ${formData.phone}\n• Дата и время: ${formData.datetime}\n• Количество гостей: ${formData.guests}\n\nС вами свяжутся для подтверждения.`;
    
    setModalMessage(message);
    setShowModal(true);
    setFormData({ name: '', phone: '', datetime: '', guests: '2' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <>
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
            <input type="tel" className="delivery-form-input" placeholder="+86 123 4567 890" 
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

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{color: '#8B0000', marginBottom: '15px', textAlign: 'center'}}>
              Столик забронирован!
            </h3>
            <div style={{
              whiteSpace: 'pre-line',
              marginBottom: '20px',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              {modalMessage}
            </div>
            <div style={{textAlign: 'center'}}>
              <button 
                onClick={closeModal}
                style={{
                  backgroundColor: '#8B0000',
                  color: 'white',
                  border: 'none',
                  padding: '10px 30px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationForm;