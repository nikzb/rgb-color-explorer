import React from 'react';

import './ColorCoderGameTitle.css';

const ColorCoderGameTitle = ({size}) => {
  return <h1 className={`SouvlakiTitle SouvlakiTitle--${size}`}><span className="SouvlakiTitle--color">Color</span><span className="SouvlakiTitle--coder">Coder</span></h1>;
}

export default ColorCoderGameTitle;
