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
          className="form form_theme_light"
          name={name}
          action="#"
          noValidate
          onSubmit={onSubmit}
        >
          <div>
            <h2 className="form__title form__title_theme_light">{formTitle}</h2>
            {children}
          </div>
          <div>
            <button
              className={`form__submit-button 
                ${
                  isSubmitDisabled
                    ? "form__submit-button_disabled"
                    : "form__submit-button_theme_light"
                }
              `}
              type="submit"
              disabled={isSubmitDisabled}
            >
              {submitButtonTitle}
            </button>
          </div>
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
