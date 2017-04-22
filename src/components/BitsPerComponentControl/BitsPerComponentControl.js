import React, { Component } from 'react';

import ButtonGroup from '../ButtonGroup/ButtonGroup';
// import './NumberSystemControl.css';

class BitsPerComponentControl extends Component {
  render() {
    return (
      <div>
        <label>Bits Per Component</label>
        <ButtonGroup />
      </div>
    );
  }
}

export default BitsPerComponentControl;
