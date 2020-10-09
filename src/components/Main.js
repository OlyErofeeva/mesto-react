import React from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all(
      [
        api.getUserInfo(),
        api.getInitialCards()
      ]
    )
    .then((results) => {
      const userInfo = results[0];
      const initialCards = results[1];

      const items = initialCards.map(item => ({
        id: item._id,
        name: item.name,
        link: item.link,
        likes: item.likes,
        ownerId: item.owner._id
      }));

      setUserName(userInfo.name);
      setUserDescription(userInfo.about);
      setUserAvatar(userInfo.avatar);
    
      setCards(items.reverse());
    })
    .catch(err => alert(err));
  }, []);
  
  return (
    <main className="content page__content">
      <section className="profile page__profile">
        <div className="profile__container">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя"/>
          </div>
          <div className="profile__flex-column">
            <div className="profile__flex-row">
              <h1 className="profile__full-name">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__bio">{userDescription}</p>
          </div>
        </div>
        <button className="add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="gallery">
        <ul className="cards-container">
          {cards.map(item => <Card {...item} key={item.id} onCardClick={onCardClick}/>)}
        </ul>
      </section>
    </main>
  );
}

export default Main;