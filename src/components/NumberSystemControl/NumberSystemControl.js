import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
import { Colors, Button} from 'react-foundation';

import './NumberSystemControl.css';

class NumberSystemControl extends Component {
  render() {
    return (
      <div className='NumberSystemControl__container'>
        <label className="NumberSystemControl__label">Number System</label>
        <ButtonGroupMenu>
          <Button className='NumberSystemControl__button' color={Colors.PRIMARY}>Binary</Button>
          <Button className='NumberSystemControl__button'>Hex</Button>
        </ButtonGroupMenu>
      </div>
    );
  }
}

export default NumberSystemControl;
