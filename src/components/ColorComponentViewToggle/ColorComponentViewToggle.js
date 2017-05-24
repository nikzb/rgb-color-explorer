import React, { Component } from 'react';

import './ColorComponentViewToggle.css';

class ColorComponentViewToggle extends Component {
  render() {
    const message = this.props.showColorComponents ? 'Hide' : 'Show';
    let classes = 'button';
    if (this.props.hidden) {
      classes += ' hidden';
    }
    return (
      <div className='ColorComponentViewToggle__container'>
        <button className={classes} tabIndex={1} onClick={this.props.onClick}>{message}</button>
      </div>
    );
  }
}

export default ColorComponentViewToggle;
