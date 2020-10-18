import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
  const [captionInput, setCaptionInput] = React.useState({
    value: '',
    errorMessage: '',
    isValid: false
  });
  const [linkInput, setLinkInput] = React.useState({
    value: '',
    errorMessage: '',
    isValid: false
  });
  const [submitButtonTitle, setSubmitButtonTitle] = React.useState('Создать');

  const handleCaptionChange = (e) => {
    setCaptionInput({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      isValid: (e.target.validationMessage ? false : true)
    });
  };

  const handleLinkChange = (e) => {
    setLinkInput({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      isValid: (e.target.validationMessage ? false : true)
    });
  };

  const clearInputs = () => {
    setCaptionInput({
      value: '',
      errorMessage: '',
      isValid: false
    });

    setLinkInput({
      value: '',
      errorMessage: '',
      isValid: false
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButtonTitle('Сохранение...');
    onAddPlace({
      name: captionInput.value,
      link: linkInput.value
    })
    .finally(() => {
      setSubmitButtonTitle('Создать');
      clearInputs();  
    });
  };

  const handleClose = () => {
    onClose();
    clearInputs();
  }

  return (
    <PopupWithForm
          name="place"
          formTitle="Новое место"
          submitButtonTitle={submitButtonTitle}
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          isSubmitDisabled={!captionInput.isValid || !linkInput.isValid}
        >
          <input
            className="form__input"
            type="text"
            name="newPlaceCaption"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={captionInput.value}
            onChange={handleCaptionChange}
          />
          <span className="form__error" id="newPlaceCaption-error">{captionInput.errorMessage}</span>

          <input
            className="form__input"
            type="url"
            name="newPlaceLink"
            placeholder="Ссылка на картинку"
            required
            value={linkInput.value}
            onChange={handleLinkChange}
          />
          <span className="form__error" id="newPlaceLink-error">{linkInput.errorMessage}</span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;