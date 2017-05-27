import React from 'react';
// import PropTypes from 'prop-types';

import './SouvlakiTitle.css';

const SouvlakiTitle = ({size}) => (
  <h1 className={`SouvlakiTitle SouvlakiTitle--${size}`}>souvlaki<span className="SouvlakiTitle--dot">.</span><span className="SouvlakiTitle--io">io</span></h1>
);

export default SouvlakiTitle;
