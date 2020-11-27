import React from "react";

function PopupWithForm({
  name,
  formTitle,
  submitButtonTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled
}) {
  return (
    <div className={`modal modal_for_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <form 
          className="form" 
          name={name} 
          action="#" 
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="form__title">{formTitle}</h2>
          {children}
          <button 
            className={`form__submit-button 
              ${isSubmitDisabled ? "form__submit-button_disabled" : ""}
            `} 
            type="submit" 
            disabled={isSubmitDisabled}
          >
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
