import React, { Component } from 'react';
import { Colors, Button, Sizes} from 'react-foundation';

import './ColorComponentViewToggle.css';

class ColorComponentViewToggle extends Component {
  render() {
    return (
      <div>
        <Button className='ColorComponentViewToggle__button' isHollow color={Colors.SECONDARY} size={Sizes.SMALL}>Hide Color Components</Button>
      </div>
    );
  }
}

export default ColorComponentViewToggle;
