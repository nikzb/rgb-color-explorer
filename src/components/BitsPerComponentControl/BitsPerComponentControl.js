import React, { Component } from 'react';

import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
import { Colors, Button} from 'react-foundation';
import './BitsPerComponentControl.css';

class BitsPerComponentControl extends Component {
  render() {
    return (
      <div className='BitsPerComponentControl__container'>
        <label className='BitsPerComponentControl__label'>Bits Per Component</label>
        <ButtonGroupMenu>
          <Button color={Colors.PRIMARY}>4</Button>
          <Button>8</Button>
        </ButtonGroupMenu>
      </div>
    );
  }
}

export default BitsPerComponentControl;
