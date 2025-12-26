import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img 
            src="../images/logo.png" 
            style={{
              height: '40px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Link>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link></li>
          <li><Link to="/map" onClick={() => setMenuOpen(false)}>Карта</Link></li>
          <li><Link to="/restaurants" onClick={() => setMenuOpen(false)}>Рестораны</Link></li>
          <li><Link to="/reviews" onClick={() => setMenuOpen(false)}>Отзывы</Link></li>
        </ul>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;