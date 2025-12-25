import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Русская кухня в Китае</h4>
            <p style={{color: '#ccc', marginBottom: '20px', lineHeight: '1.6'}}>
              Найди свою русскую кухню в Китае! Все рестораны с традиционными блюдами на одной платформе.
            </p>
          </div>
          <div className="footer-column">
            <h4>Навигация</h4>
            <ul className="footer-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/map">Карта</Link></li>
              <li><Link to="/restaurants">Рестораны</Link></li>
              <li><Link to="/reviews">Отзывы</Link></li>
              <li><Link to="/about">О нас</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Информация</h4>
            <ul className="footer-links">
              <li><Link to="/reviews">Отзывы</Link></li>
              <li><Link to="/about">О нас</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Контакты</h4>
            <ul className="footer-links">
              <li><i className="fas fa-envelope" style={{marginRight: '10px'}}></i> info@russiancuisine.club</li>
              <li><i className="fas fa-phone" style={{marginRight: '10px'}}></i> +86 123 4567 890</li>
              <li><i className="fas fa-map-marker-alt" style={{marginRight: '10px'}}></i> Пекин, Китай</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Русская кухня в Китае. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;