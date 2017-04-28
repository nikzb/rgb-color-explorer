import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
// import { Colors, Button} from 'react-foundation';

import './NumberSystemControl.css';

class NumberSystemControl extends Component {
  // Return a function that can be called when one of the number system buttons is clicked
  // @param newBase - the base to use in the new ColorCode
  onButtonClick(newBase) {
    return () => {
      if (newBase !== this.props.base) {
        this.props.onColorChange({newBase});
      }
    }
  }

  render() {
    let buttons = [{label: 'Binary', onClick: this.onButtonClick(2)}, {label: 'Hex', onClick: this.onButtonClick(16)}];

    if (this.props.base===2) {
      buttons[0].classes = 'NumberSystemControl__button is-active';
      buttons[1].classes = 'NumberSystemControl__button';
    } else {// assuming that (this.props.base===16) {
      buttons[0].classes = 'NumberSystemControl__button';
      buttons[1].classes = 'NumberSystemControl__button is-active';
    }

    return (
      <div className='NumberSystemControl__container'>
        <label className="NumberSystemControl__label">Number System</label>
        <ButtonGroupMenu buttons={buttons} />
      </div>
    );
  }
}

export default NumberSystemControl;
