import React, { Component } from 'react';
// import logo from '../../logo.svg';
import Logo from '../Logo/Logo';
import SouvlakiTitle from '../SouvlakiTitle/SouvlakiTitle';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <div className="Header__container">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        {/* <SouvlakiTitle size={'medium'}/> */}
        {/* <Logo size={'64'}/> */}
      </div>
    );
  }
}

export default Header;
