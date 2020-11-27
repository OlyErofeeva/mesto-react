import React from 'react';

function Login() {
  return (
    <div className="auth-container">
<form 
    className="form form_theme_dark" 
    // name={name} 
    action="#" 
    noValidate
    // onSubmit={onSubmit}
  >
    <div>
      <h2 className="form__title form__title_theme_dark">Регистрация</h2>
      {/* {children} */}
   
    
    <input
        className="form__input form__input_theme_dark"
        type="email"
        // name="newProfileFullName"
        placeholder="Email"
        required
        // value={nameInput.value}
        // onChange={handleNameChange}
      />
      <span className="form__error" id="newProfileFullName-error">
        {/* {nameInput.errorMessage} */}
      </span>

      <input
        className="form__input form__input_theme_dark"
        type="password"
        // name="newProfileBio"
        placeholder="Пароль"
        required
        // value={descriptionInput.value}
        // onChange={handleDescriptionChange}
      />
    </div>
      <div>
          <button 
            className={`form__submit-button form__submit-button_theme_dark

            `} 
            type="submit" 
            // disabled={isSubmitDisabled}
          >
            Зарегистрироваться
          </button>
    </div>
  </form>
    </div>
  );
}

export default Login;