import React from 'react';
import Header from './Header';
import Spinner from './Spinner';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }
  
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }
  
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  const handleCardClick = ({ name, link }) => {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  return (
    <>
      <div className="page__container">
        <Header />
        <Spinner />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        name="profile"
        formTitle="Редактировать профиль"
        submitButtonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="form__input"
          type="text"
          name="newProfileFullName"
          placeholder="Полное имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__error" id="newProfileFullName-error"></span>

        <input
          className="form__input"
          type="text"
          name="newProfileBio"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="form__error" id="newProfileBio-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="place"
        formTitle="Новое место"
        submitButtonTitle="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="form__input"
          type="text"
          name="newPlaceCaption"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="form__error" id="newPlaceCaption-error"></span>

        <input
          className="form__input"
          type="url"
          name="newPlaceLink"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__error" id="newPlaceLink-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        formTitle="Обновить аватар"
        submitButtonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="form__input"
          type="url"
          name="newAvatarLink"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__error" id="newAvatarLink-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        formTitle="Вы уверены?"
        submitButtonTitle="Да"
      />

      <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} {...selectedCard}/>
    </>
  );
}

export default App;