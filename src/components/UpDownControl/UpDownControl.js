import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';

import './UpDownControl.css';

class UpDownControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null
    }
  }
  // Return a function that will change a given value by a specified amount
  onButtonClick(amountToChangeBy) {
    return () => {
      this.props.onClick(amountToChangeBy);
    };
  }

  onMouseDown(amountToChangeBy) {
    return () => {
      console.log('mouse is down');
      this.setState({
        interval: setInterval(() => {
          this.props.onClick(amountToChangeBy);
        }, 120)
      });
    }
  }

  onMouseUp() {
    return () => {
      console.log('mouse is up again');
      clearInterval(this.state.interval);
      this.setState({
        interval: null
      });
    }
  }

  render() {
    let buttons = [
      {
        label: '−',
        classNames: 'UpDownControl__button',
        onClick: this.onButtonClick(-1),
        onMouseDown: this.onMouseDown(-1),
        onMouseUp: this.onMouseUp()
      },
      {
        label: '+',
        classNames: 'UpDownControl__button',
        onClick: this.onButtonClick(1),
        onMouseDown: this.onMouseDown(1),
        onMouseUp: this.onMouseUp()
      }
    ];
    return (
      <div className='UpDownControl__container'>
        <ButtonGroupMenu buttons={buttons} size='small'/>
      </div>
    );
  }
}

export default UpDownControl;
