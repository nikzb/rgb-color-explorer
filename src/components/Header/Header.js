import React, { Component } from 'react';
// import logo from '../../logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header-title">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>RGB Color Explorer</h1>
      </div>
    );
  }
}

export default Header;
