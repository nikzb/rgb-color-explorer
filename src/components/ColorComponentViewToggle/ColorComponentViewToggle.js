import React, { Component } from 'react';

import './ColorComponentViewToggle.css';

class ColorComponentViewToggle extends Component {
  render() {
    const message = this.props.showColorComponents ? 'Hide' : 'Show';
    return (
      <div className='ColorComponentViewToggle'>
        <button className='button' tabIndex={1} onClick={this.props.onClick}>{message}</button>
      </div>
    );
  }
}

export default ColorComponentViewToggle;
