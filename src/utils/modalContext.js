import React, { createContext, useState, useContext } from 'react';
import Modal from '../components/Modal';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const showModal = (title, message, onConfirm = null) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  const hideModal = () => {
    setModal({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null
    });
  };

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    hideModal();
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        isOpen={modal.isOpen}
        onClose={hideModal}
        title={modal.title}
      >
        <p style={{ marginBottom: '20px', lineHeight: '1.5' }}>{modal.message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button 
            onClick={hideModal}
            style={{
              background: '#f5f5f5',
              color: '#333',
              border: '1px solid #ddd',
              padding: '8px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Отмена
          </button>
          <button 
            onClick={handleConfirm}
            style={{
              background: '#8B0000',
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            OK
          </button>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
};