import React from "react";

function PopupWithForm({
  name,
  formTitle,
  submitButtonTitle,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`modal modal_for_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <form className="form" name={name} action="#" noValidate>
          <h2 className="form__title">{formTitle}</h2>
          {children}
          <button className="form__submit-button" type="submit">
            {submitButtonTitle}
          </button>
        </form>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
