import React, { Component } from 'react';
import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
import { Colors, Button} from 'react-foundation';

// import ButtonGroup from '../ButtonGroup/ButtonGroup';
import './NumberSystemControl.css';

class NumberSystemControl extends Component {
  render() {
    return (
      <div className='NumberSystemControl__container'>
        <label className="NumberSystemControl__label">Number System</label>
        <ButtonGroupMenu>
          <Button color={Colors.PRIMARY}>Binary</Button>
          <Button>Hex</Button>
        </ButtonGroupMenu>
      </div>
    );
  }
}

export default NumberSystemControl;
