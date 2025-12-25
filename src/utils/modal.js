export const showModal = (title, message) => {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const modal = document.createElement('div');
  modal.className = 'modal-content';
  modal.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  `;
  
  modal.innerHTML = `
    <h3 class="modal-title" style="color: #8B0000; margin-bottom: 15px; font-size: 20px;">${title}</h3>
    <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.5;">${message}</p>
    <button id="modalClose" class="modal-button" style="
      background: #8B0000;
      color: white;
      border: none;
      padding: 10px 30px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 16px;
      transition: background-color 0.3s;
    ">OK</button>
  `;
  
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
  document.body.style.overflow = 'hidden'; 

  document.getElementById('modalClose').onclick = () => {
    document.body.removeChild(backdrop);
    document.body.style.overflow = 'auto';
  };
  
  backdrop.onclick = (e) => {
    if (e.target === backdrop) {
      document.body.removeChild(backdrop);
      document.body.style.overflow = 'auto';
    }
  };
  
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      document.body.removeChild(backdrop);
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    }
  };
  
  document.addEventListener('keydown', handleEscape);
};