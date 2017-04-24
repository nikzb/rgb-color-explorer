import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
import { Colors, Button} from 'react-foundation';

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
    let binaryButtonClasses;
    let hexButtonClasses;
    if (this.props.base===2) {
      binaryButtonClasses = 'NumberSystemControl__button';
      hexButtonClasses = 'NumberSystemControl__button hollow';
    } else {// assuming that (this.props.base===16) {
      binaryButtonClasses = 'NumberSystemControl__button hollow';
      hexButtonClasses = 'NumberSystemControl__button';
    }

    return (
      <div className='NumberSystemControl__container'>
        <label className="NumberSystemControl__label">Number System</label>
        <ButtonGroupMenu>
          <Button className={binaryButtonClasses} onClick={this.handleClick} color={Colors.SECONDARY}>Binary</Button>
          <Button className={hexButtonClasses} onClick={this.handleClick} color={Colors.SECONDARY}>Hex</Button>
        </ButtonGroupMenu>
      </div>
    );
  }
}

export default NumberSystemControl;
