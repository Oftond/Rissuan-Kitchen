import React from 'react';

function TestimonialCard({ rating, text, author, position }) {
  const getStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return { __html: stars };
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-rating" dangerouslySetInnerHTML={getStars(rating)}></div>
      <p className="testimonial-text">{text}</p>
      <div className="testimonial-author">
        <div className="author-avatar">{author.charAt(0)}</div>
        <div className="author-info">
          <h4>{author}</h4>
          <p>{position}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;