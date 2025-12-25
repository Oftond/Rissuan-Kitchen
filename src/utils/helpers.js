export const getStarsHTML = (rating) => {
  let starsHTML = '';
  const fullStars = Math.floor(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHTML += '<i class="fas fa-star"></i>';
    } else {
      starsHTML += '<i class="far fa-star"></i>';
    }
  }

  return starsHTML;
};

export const showModal = (title, message) => {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 10000;
    min-width: 300px;
    max-width: 500px;
    text-align: center;
  `;
  
  modal.innerHTML = `
    <h3 style="color: #8B0000; margin-bottom: 15px;">${title}</h3>
    <p style="margin-bottom: 20px;">${message}</p>
    <button id="modalClose" style="
      background: #8B0000;
      color: white;
      border: none;
      padding: 10px 30px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    ">OK</button>
  `;
  
  document.body.appendChild(modal);
  
  document.getElementById('modalClose').onclick = () => {
    document.body.removeChild(modal);
  };
};

export const formatPrice = (price) => {
  return price.toLocaleString('ru-RU') + '₽';
};