import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = React.useRef();
  const [avatarValidity, setAvatarValidity] = React.useState({
    errorMessage: '',
    isValid: false
  });
  const [submitButtonTitle, setSubmitButtonTitle] = React.useState('Сохранить');

  const clearInputs = () => {
    avatarInputRef.current.value = '';
    setAvatarValidity({
      errorMessage: '',
      isValid: false
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButtonTitle('Сохранение...');
    onUpdateAvatar(avatarInputRef.current.value)
    .finally(() => {
      setSubmitButtonTitle('Сохранить');
      clearInputs();
    });
  }

  const validateInput = () => {
    setAvatarValidity({
      errorMessage: avatarInputRef.current.validationMessage,
      isValid: (avatarInputRef.current.validationMessage ? false : true)
    });
  }

  const handleClose = () => {
    onClose();
    clearInputs();
  }

  return (
    <PopupWithForm
      name="avatar"
      formTitle="Обновить аватар"
      submitButtonTitle={submitButtonTitle}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!avatarValidity.isValid}
    >
      <input
        className="form__input"
        type="url"
        name="newAvatarLink"
        placeholder="Ссылка на картинку"
        required
        ref={avatarInputRef}
        onChange={validateInput}
      />
      <span className="form__error" id="newAvatarLink-error">
        {avatarValidity.errorMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;