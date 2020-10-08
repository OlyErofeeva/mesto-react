import React from 'react';
import logo from '../images/logo_color_white.svg';

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип Mesto"/>
    </header>
  );
}

export default Header;