import React from 'react';

function Card({ id, name, link, likes, ownerId, onCardClick }) {

  return (
    <li className="card">
      <div className="card__photo-container">
        <img className="card__photo" src={link} alt={name} onClick={() => {onCardClick({ name, link });}}/>
      </div>
      <div className="card__info">
        <h2 className="card__caption">{name}</h2>
        <div className="card__like-container">
        <button className="card__like-button" type="button"></button>
        <p className="card__likes">{likes.length}</p>
      </div>
      </div>
      <button className="card__delete-button" type="button"></button>
    </li>
  );
}

export default Card;