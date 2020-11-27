import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo_color_white.svg';

function Header() {
  return (
    <header className="header page__header">
      <div className="header__container">
          <img className="header__logo" src={logo} alt="Логотип Mesto"/>
          <Link to="/sign-in" className="header__link">Войти</Link>
          {/* <Link to="/sign-up" className="header__link">Регистрация</Link> */}
          {/* <button className="header__hamburger-button" type="button"></button> */}
          <div className="header__logout-container">
            <p>email@mail.com</p>
            <button type="button">Выйти</button>
          </div>
      </div>
    </header>
  );
}

export default Header;