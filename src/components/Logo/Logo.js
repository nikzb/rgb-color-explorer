import React from 'react';

// class Logo extends Component {
const Logo = ({size}) => {
  const mainColor = '#333';
  return (
    <svg className='logo' width={size} height={size} viewBox="0 0 520 520">
      <circle cx="260" cy="260" r="254" stroke="#F8E6B6" strokeWidth="1" fill="#F8E6B6" />
      <polygon points="35,500 130,405 115,390 20,485" fill={mainColor} stroke={mainColor} strokeWidth="1" />
      <polygon points="405,130 410,125 490,30 395,110 390,115" fill={mainColor} stroke={mainColor} strokeWidth="1" />
      <ellipse cx="260" cy="260" rx="65" ry="40" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,260,260)"/>
      <ellipse cx="160" cy="360" rx="65" ry="40" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,160,360)"/>
      <ellipse cx="360" cy="160" rx="65" ry="42" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,360,160)"/>
      <rect x="145" y="295" width="130" height="30" rx="35" ry="20" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,210,310)"/>
      <rect x="245" y="195" width="130" height="30" rx="35" ry="20" stroke={mainColor} strokeWidth="1" fill={mainColor} transform="rotate(45,310,210)"/>
    </svg>
  );
}

export default Logo;
