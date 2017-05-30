import React, { Component } from 'react';

import './ColorDisplay.css';
import ColorViz from '../ColorViz/ColorViz';

class ColorDisplay extends Component {
  getOnClick() {
    if (this.props.userCanToggle) {
      return this.props.toggleShowColorComponents;
    }
    else {
      return () => {};
    }
  }

  getCanvasClassesToAdd() {
    if (this.props.userCanToggle) {
      return ' ColorViz__canvas--clickable';
    }
    else {
      return '';
    }
  }

  render() {
    let classes;
    if (this.props.classes) {
      classes = `ColorDisplay__container ${this.props.classes}`;
    } else {
      classes = 'ColorDisplay__container';
    }
    
    return (
      <div className={classes}>
        <ColorViz colorCode={this.props.colorCode}
                  showColorComponents={this.props.showColorComponents}
                  onClick={this.getOnClick()}
                  size={this.props.size}
                  canvasClassesToAdd={this.getCanvasClassesToAdd()}/>
      </div>
    );
  }
}

export default ColorDisplay;
