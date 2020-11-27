import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameInput, setNameInput] = React.useState({
    value: '',
    errorMessage: '',
    isValid: false
  });
  const [descriptionInput, setDescriptionInput] = React.useState({
    value: '',
    errorMessage: '',
    isValid: false
  });
  const [submitButtonTitle, setSubmitButtonTitle] = React.useState('Сохранить');

  const handleNameChange = (e) => {
    setNameInput({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      isValid: (e.target.validationMessage ? false : true)
    });
  };

  const handleDescriptionChange = (e) => {
    setDescriptionInput({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      isValid: (e.target.validationMessage ? false : true)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButtonTitle('Сохранение...');
    onUpdateUser({
      name: nameInput.value,
      about: descriptionInput.value
    })
    .finally(() => {
      setSubmitButtonTitle('Сохранить');
    })
  };

  const resetInputs = (userContext) => {
    setNameInput({
      value: userContext.name,
      errorMessage: '',
      isValid: true
    });
    setDescriptionInput({
      value: userContext.about,
      errorMessage: '',
      isValid: true
    });
  };

  const handleClose = () => {
    onClose();
    resetInputs(currentUser);
  }

  React.useEffect(() => {
    resetInputs(currentUser);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      formTitle="Редактировать профиль"
      submitButtonTitle={submitButtonTitle}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!nameInput.isValid || !descriptionInput.isValid}
    >
      <input
        className="form__input form__input_theme_light"
        type="text"
        name="newProfileFullName"
        placeholder="Полное имя"
        required
        minLength="2"
        maxLength="40"
        value={nameInput.value}
        onChange={handleNameChange}
      />
      <span className="form__error" id="newProfileFullName-error">
        {nameInput.errorMessage}
      </span>

      <input
        className="form__input form__input_theme_light"
        type="text"
        name="newProfileBio"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={descriptionInput.value}
        onChange={handleDescriptionChange}
      />
      <span className="form__error" id="newProfileBio-error">
        {descriptionInput.errorMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
