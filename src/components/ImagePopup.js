import React from 'react';

function ImagePopup({ name, link, isOpen, onClose }) {
  return (
    <div className={`modal modal_for_photo ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <figure className="modal__full-photo-view">
          <img className="modal__full-photo" src={link} alt={name}/>
          <figcaption className="modal__full-photo-caption">{name}</figcaption>
        </figure>
        <button className="modal__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;