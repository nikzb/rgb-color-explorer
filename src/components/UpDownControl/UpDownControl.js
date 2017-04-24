import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
import { Colors, Button, Sizes} from 'react-foundation';

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
    return (
      <div className='UpDownControl__container'>
        <ButtonGroupMenu className='UpDownControl__button-group-menu' size='tiny'>
          <Button className='UpDownControl__button hollow' onClick={this.handleClick} color={Colors.SECONDARY} size={Sizes.TINY}>▼</Button>
          <Button className='UpDownControl__button hollow' onClick={this.handleClick} color={Colors.SECONDARY} size={Sizes.TINY}>▲</Button>
        </ButtonGroupMenu>
      </div>
    );
  }
}

export default UpDownControl;
