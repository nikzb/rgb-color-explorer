import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';

import './UpDownControl.css';

class UpDownControl extends Component {
  constructor(props) {
    super(props);
  }

  // Return a function that will change a given value by a specified amount
  onClick(amountToChangeBy) {
    return () => {
      this.props.onClick(amountToChangeBy);
    };
  }

  render() {
    let buttons = [{label: '−', classNames: 'UpDownControl__button', onClick: this.onClick(-1)}, {label: '+', classNames: 'UpDownControl__button', onClick: this.onClick(1)}];
    return (
      <div className='UpDownControl__container'>
        <ButtonGroupMenu buttons={buttons} size='small'/>
      </div>
    );
  }
}

export default UpDownControl;
