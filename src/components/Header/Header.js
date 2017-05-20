import React, { Component } from 'react';
// import logo from '../../logo.svg';
import Logo from '../Logo/Logo';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header__container">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Logo className="Logo" /> */}
        <h1 className="Header__title">RGB Color Explorer</h1>
      </div>
    );
  }
}

export default Header;
