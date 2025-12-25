import React, { useState } from 'react';
import { useModal } from '../utils/modalContext';

const ReviewForm = ({ restaurants, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurant: '',
    rating: 0,
    text: ''
  });
  const [stars, setStars] = useState([false, false, false, false, false]);
  const { showModal } = useModal();

  const handleStarClick = (index) => {
    const newStars = stars.map((_, i) => i <= index);
    setStars(newStars);
    setFormData({...formData, rating: index + 1});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.restaurant || !formData.rating || !formData.text) {
      showModal('Ошибка', 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    const newReview = {
      author_name: formData.name,
      restaurant_id: parseInt(formData.restaurant),
      rating: formData.rating,
      text: formData.text
    };

    onSubmit(newReview);
    
    setFormData({
      name: '',
      email: '',
      restaurant: '',
      rating: 0,
      text: ''
    });
    setStars([false, false, false, false, false]);
    showModal('Спасибо!', 'Ваш отзыв успешно отправлен. Он появится после модерации.');
  };

  return (
    <div className="add-review-form">
      <h3>Оставить отзыв</h3>
      <form id="reviewForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reviewName">Ваше имя *</label>
            <input type="text" id="reviewName" className="form-control" placeholder="Введите ваше имя" 
                   name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="reviewEmail">Email</label>
            <input type="email" id="reviewEmail" className="form-control" placeholder="Введите ваш email" 
                   name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reviewRestaurant">Ресторан *</label>
            <select id="reviewRestaurant" className="form-control" 
                    name="restaurant" value={formData.restaurant} onChange={handleChange} required>
              <option value="">Выберите ресторан</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Оценка *</label>
            <div className="rating-input">
              {stars.map((active, index) => (
                <span 
                  key={index} 
                  className={`rating-star ${active ? 'active' : ''}`} 
                  onClick={() => handleStarClick(index)}
                  style={{cursor: 'pointer', fontSize: '24px', color: active ? '#FFD700' : '#ddd'}}
                >
                  ★
                </span>
              ))}
            </div>
            <input type="hidden" id="reviewRating" value={formData.rating} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="reviewText">Текст отзыва *</label>
          <textarea id="reviewText" className="form-control" placeholder="Поделитесь вашим опытом..." 
                    name="text" value={formData.text} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="submit-btn">Отправить отзыв</button>
      </form>
    </div>
  );
};

export default ReviewForm;