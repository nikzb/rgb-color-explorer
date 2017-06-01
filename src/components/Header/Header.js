import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../logo.svg';
import Logo from '../Logo/Logo';
import SouvlakiTitle from '../SouvlakiTitle/SouvlakiTitle';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <div className="Header__container">
        <div className="Header__title-container">
          <SouvlakiTitle bg={this.props.bg} title={this.props.title} size={'medium'}/>
        </div>
        <Link to='/'>
          <Logo size={'64'}/>
        </Link>
      </div>
    );
  }
}

export default Header;
