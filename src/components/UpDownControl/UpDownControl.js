import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';

import './UpDownControl.css';

class UpDownControl extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // Call the function passed down from parent that updates the code correctly
  }

  render() {
    let buttons = [{label: '−', classNames: 'UpDownControl__button'}, {label: '+', classNames: 'UpDownControl__button'}];
    return (
      <div className='UpDownControl__container'>
        <ButtonGroupMenu buttons={buttons} size='small'/>
      </div>
    );
  }
}

export default UpDownControl;
