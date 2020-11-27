import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './Header';
import Spinner from './Spinner';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '#'
  });
  const [cards, setCards] = React.useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  // Если закрывать поп-ап с картинкой через обнулление selectedCard, анимация закрытия будет не такой плавной: сначала из поп-апа пропадёт контент, останется "крестик" по центру экрана, потом крестик "растворится". Закрытие через isImagePopupOpen менее изящно и не так экономично (selectedCard остаётся в памяти), но нужно для визуально привычной анимации.
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardIdToDelete, setCardIdToDelete] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
  };

  const handleCardClick = ({ name, link }) => {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  };

  const handleCardLike = (cardLikes, cardId) => {
    const isLiked = cardLikes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(cardId, isLiked)
    .then(responseCard => {
      const newCards = cards.map(item => item._id === cardId ? responseCard : item);
      setCards(newCards);
    })
    .catch(err => alert(err));
  };

  const handleCardDelete = cardId => {
    setIsConfirmDeletePopupOpen(true);
    setCardIdToDelete(cardId);
  };

  const handleDeleteConfirmation = (cardId) => {
    api.deleteCard(cardId)
    .then(() => {
      const newCards = cards.filter(item => item._id !== cardId);
      setCards(newCards);
      closeAllPopups();
    })
    .catch(err => alert(err));
  };

  const updateUserOnResponse = (response) => {
    setCurrentUser({
      name: response.name,
      about: response.about,
      avatar: response.avatar,
      _id: response._id
    });
  };

  const handleUpdateUser = (newData) => {
    return (
      api.editProfile(newData)
      .then(response => {
        updateUserOnResponse(response);
        closeAllPopups();
      })
      .catch(err => alert(err))
    );
  };

  const handleUpdateAvatar = (newAvatarLink) => {
    return (
      api.changeAvatar(newAvatarLink)
      .then(response => {
        updateUserOnResponse(response);
        closeAllPopups();
      })
      .catch(err => alert(err))
    );
  };

  const handleAddPlace = (cardData) => {
    return(
      api.saveCard(cardData)
      .then(response => {
        const newCard = {
          _id: response._id,
          name: response.name,
          link: response.link,
          likes: response.likes,
          owner: response.owner
        }
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => alert(err))
    );
  };

  React.useEffect(() => {
    Promise.all(
      [
        api.getUserInfo(),
        api.getInitialCards()
      ]
    )
    .then(results => {
      const userInfo = results[0];
      const initialCards = results[1];
      const items = initialCards.map(item => ({
        _id: item._id,
        name: item.name,
        link: item.link,
        likes: item.likes,
        owner: item.owner
      }));

      updateUserOnResponse(userInfo);
      setCards(items);
      setIsLoading(false);
    })
    .catch(err => alert(err));
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header />
          <Switch>
            <Route path="/sign-in">
              <Login />
            </Route>

            <Route path="/sign-up">
              <Register />
            </Route>

            <Route exact path="/">
              {isLoading ? (
                <Spinner />
              ) : (
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              )}
            </Route>
          </Switch>
          <Footer />
        </div>

        <InfoTooltip />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteConfirmation={handleDeleteConfirmation}
          cardId={cardIdToDelete}
        />

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} {...selectedCard}/>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;