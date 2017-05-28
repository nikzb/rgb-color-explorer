import React from 'react';
// import PropTypes from 'prop-types';

import './SouvlakiTitle.css';

const SouvlakiTitle = ({size, title}) => {
  if (!title) {
    return <h1 className={`SouvlakiTitle SouvlakiTitle--${size}`}>souvlaki<span className="SouvlakiTitle--dot">.</span><span className="SouvlakiTitle--io">io</span></h1>;
  } else if (title === 'ColorCoder') {
    return <h1 className={`SouvlakiTitle SouvlakiTitle--${size}`}><span className="SouvlakiTitle--color">Color</span><span className="SouvlakiTitle--coder">Coder</span></h1>;
  } else if (title === 'RGB Color Explorer') {
    return (
      <h1 className={`SouvlakiTitle SouvlakiTitle--${size}`}>
        <span className="SouvlakiTitle--R">R</span>
        <span className="SouvlakiTitle--G">G</span>
        <span className="SouvlakiTitle--B">B</span>
        <span className="SouvlakiTitle--colors"> Colors</span>
      </h1>
    );
  }
}

export default SouvlakiTitle;
