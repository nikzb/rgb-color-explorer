import React, { Component } from 'react';

class Logo extends Component {
  render() {
    const mainColor = '#333';
    return (
      <svg className='logo' width="64" height="64" viewBox="0 0 520 520">

      	<circle cx="260" cy="260" r="254" stroke="#F8E6B6" strokeWidth="1" fill="#F8E6B6" />

        <polygon points="35,500 130,405 115,390 20,485" fill={mainColor} stroke={mainColor} strokeWidth="1" />

        <polygon points="405,130 410,125 490,30 395,110 390,115" fill={mainColor} stroke={mainColor} strokeWidth="1" />

        <ellipse cx="260" cy="260" rx="65" ry="40" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,260,260)"/>

        <ellipse cx="160" cy="360" rx="65" ry="40" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,160,360)"/>

        <ellipse cx="360" cy="160" rx="65" ry="42" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,360,160)"/>

        <ellipse cx="210" cy="310" rx="70" ry="14" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,210,310)" />

        <ellipse cx="310" cy="210" rx="70" ry="14" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,310,210)" />
      </svg>
    );
  }
}

export default Logo;
