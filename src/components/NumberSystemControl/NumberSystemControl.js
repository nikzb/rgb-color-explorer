import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
// import { Colors, Button} from 'react-foundation';

import './NumberSystemControl.css';

class NumberSystemControl extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // Call the function passed down from parent that updates the code correctly
  }

  render() {
    let buttons = [{label: 'Binary'}, {label: 'Hex'}];

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
