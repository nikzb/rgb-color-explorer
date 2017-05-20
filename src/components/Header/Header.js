import React, { Component } from 'react';
// import logo from '../../logo.svg';
import Logo from '../Logo/Logo';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header__container">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        
        <h1 className="Header__title">souvlaki.<span className="Header__title--io">io</span></h1>
        <Logo />
      </div>
    );
  }
}

export default Header;
