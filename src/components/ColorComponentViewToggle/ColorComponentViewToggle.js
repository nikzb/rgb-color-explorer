import React, { Component } from 'react';

import './ColorComponentViewToggle.css';

class ColorComponentViewToggle extends Component {
  render() {
    const message = this.props.showColorComponents ? 'Hide' : 'Show';
    console.log(message);
    return (
      <div className='ColorComponentViewToggle'>
        <button className='button' onClick={this.props.onClick}>{message} Color Components</button>
      </div>
    );
  }
}

export default ColorComponentViewToggle;
