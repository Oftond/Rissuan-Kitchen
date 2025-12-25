import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import RestaurantCard from '../components/RestaurantCard';
import TestimonialCard from '../components/TestimonialCard';
import { mockRestaurants } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>СКУЧАЕШЬ ПО ВКУСУ ДОМА?</h1>
            <p>Найди свою русскую кухню в китае!</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Почему мы?</h2>
          <p className="section-subtitle">Больше не нужно искать! Мы собрали все для тебя:</p>
          <div className="features-grid">
            <FeatureCard 
              icon="fas fa-map-marked-alt"
              title="Точная карта"
              description="Все рестораны русской кухни на одной карте"
            />
            <FeatureCard 
              icon="fas fa-comment-dots"
              title="Честные отзывы"
              description="Реальные отзывы от посетителей для правильного выбора"
            />
            <FeatureCard 
              icon="fas fa-utensils"
              title="Открытое меню"
              description="Полные меню ресторанов с ценами и фотографиями"
            />
          </div>
        </div>
      </section>

      <section className="featured-restaurants">
        <div className="container">
          <h2 className="section-title">Популярные рестораны</h2>
          <div className="restaurants-grid">
            {mockRestaurants.slice(0, 4).map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Отзывы наших гостей</h2>
          <div className="testimonials-grid">
            <TestimonialCard 
              rating={5}
              text="Этот сервис стал настоящим спасением для меня. Благодаря точной карте и отзывам нашел отличный ресторан с борщом как у бабушки."
              author="Алексей И."
              position="Студент, Пекин"
            />
            <TestimonialCard 
              rating={5}
              text="Замечательный сервис! Все рестораны с русской кухни в одном месте. Особенно полезны честные отзывы и фотографии блюд."
              author="Екатерина С."
              position="Бизнесвумен, Шанхай"
            />
            <TestimonialCard 
              rating={5}
              text="Спасибо за такой полезный ресурс! Как новичок в Китае, часто скучал по русской еде. Теперь всегда знаю, куда пойти."
              author="Дмитрий К."
              position="Экспат, Гуанчжоу"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;