import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, onDeleteConfirmation, cardId }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteConfirmation(cardId);
  };

  return (
    <PopupWithForm
      name="confirm"
      formTitle="Вы уверены?"
      submitButtonTitle="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmDeletePopup;