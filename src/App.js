import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './utils/modalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Reviews from './pages/Reviews';
import About from './pages/About';
import './index.css';
import './components/Modal.css';

function App() {
  return (
    <ModalProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;