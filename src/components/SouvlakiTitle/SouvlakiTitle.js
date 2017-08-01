import React from 'react';
// import PropTypes from 'prop-types';

import './SouvlakiTitle.css';

const SouvlakiTitle = ({size='med', title, bg}) => {
  if (!title) {
    return <h1 className={`SouvlakiTitle SouvlakiTitle--${size} SouvlakiTitle--${bg}`}>souvlaki<span className="SouvlakiTitle--dot">.</span><span className="SouvlakiTitle--io">io</span></h1>;
  } else if (title === 'ColorCoder') {
    let colorClass = 'SouvlakiTitle--color';
    let coderClass = 'SouvlakiTitle--coder';
    if (bg === 'dark') {
      colorClass += '-dark';
      coderClass += '-dark';
    }
    return <h1 className={`SouvlakiTitle SouvlakiTitle--${size}`}><span className={colorClass}>Color</span><span className={coderClass}>Coder</span></h1>;
  } else if (title === 'RGB Color Explorer') {
    return (
      <h1 className={`SouvlakiTitle SouvlakiTitle--${size} SouvlakiTitle--${bg}`}>
        <span className="SouvlakiTitle--R">R</span>
        <span className="SouvlakiTitle--G">G</span>
        <span className="SouvlakiTitle--B">B</span>
        <span className="SouvlakiTitle--colors"> Colors</span>
      </h1>
    );
  } else if (title === 'Binary Fractions' || title === 'Count in Binary') {
    return (
      <h1 className={`SouvlakiTitle SouvlakiTitle--${size} SouvlakiTitle--bit-panel-colors`}>{title}</h1>
    );
  } else {
    return (
      <h1 className={`SouvlakiTitle SouvlakiTitle--${size}`}>{title}</h1>
    );
  }
};

export default SouvlakiTitle;
