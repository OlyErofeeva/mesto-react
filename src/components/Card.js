import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ name, link, likes, owner, _id, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwner ? "" : "card__delete-button_hidden"
  }`;
  const isLiked = likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const cardClickHandler = () => {
    onCardClick({ name, link });
  };

  const cardLikeHandler = () => {
    onCardLike(likes, _id);
  };

  const cardDeleteHandler = () => {
    onCardDelete(_id);
  };

  return (
    <li className="card">
      <div className="card__photo-container">
        <img
          className="card__photo"
          src={link}
          alt={name}
          onClick={cardClickHandler}
        />
      </div>
      <div className="card__info">
        <h2 className="card__caption">{name}</h2>
        <div className="card__like-container">
          <button 
            className={cardLikeButtonClassName} 
            type="button" 
            onClick={cardLikeHandler}
          ></button>
          <p className="card__likes">{likes.length}</p>
        </div>
      </div>
      <button 
        className={cardDeleteButtonClassName} 
        type="button"
        onClick={cardDeleteHandler}
      ></button>
    </li>
  );
}

export default Card;