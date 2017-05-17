import React, { Component } from 'react';
import _ from 'lodash';
import ColorCodeComponentDisplay from '../ColorCodeComponentDisplay/ColorCodeComponentDisplay';
import ColorComponentViewToggle from '../ColorComponentViewToggle/ColorComponentViewToggle';

import './ColorCodeControl.css';

class ColorCodeControl extends Component {
  getLabelElement() {
    return <label className='ColorCodeControl__label'>RGB Color Code</label>;
  }

  getColorCodeComponentDisplay() {
    let classNameRed = 'ColorCodeComponentDisplay';
    let classNameGreen = 'ColorCodeComponentDisplay';
    let classNameBlue = 'ColorCodeComponentDisplay';

    const colorCode = this.props.colorCode;
    let codeAsString;

    if (colorCode.isPartial) {
      codeAsString = colorCode.getPartial();
      classNameRed += ' ColorCodeComponentDisplay--red';
      classNameGreen += ' ColorCodeComponentDisplay--green';
      classNameBlue += ' ColorCodeComponentDisplay--blue';
    } else {
      codeAsString = colorCode.getCode();
      if (this.props.inCodeEditMode) {
        classNameRed += ' ColorCodeComponentDisplay--placeholder';
        classNameGreen += ' ColorCodeComponentDisplay--placeholder';
        classNameBlue += ' ColorCodeComponentDisplay--placeholder';
      } else {
        classNameRed += ' ColorCodeComponentDisplay--red';
        classNameGreen += ' ColorCodeComponentDisplay--green';
        classNameBlue += ' ColorCodeComponentDisplay--blue';
      }
    }

    let redCompString = '';
    let greenCompString = '';
    let blueCompString = '';

    if (colorCode.getFullCodeLength() === 3) {
      if (codeAsString.length === 3) {
        redCompString = codeAsString.slice(0, 1);
        greenCompString = codeAsString.slice(1, 2);
        blueCompString = codeAsString.slice(2, 3);
      } else if (codeAsString.length === 2) {
        redCompString = codeAsString.slice(0, 1);
        greenCompString = codeAsString.slice(1, 2);
      } else if (codeAsString.length === 1) {
        redCompString = codeAsString.slice(0, 1);
      }
    } else if (colorCode.getFullCodeLength() === 6) {
      if (codeAsString.length === 6) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 4);
        blueCompString = codeAsString.slice(4, 6);
      } else if (codeAsString.length === 5) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 4);
        blueCompString = codeAsString.slice(4, 5);
      } else if (codeAsString.length === 4) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 4);
      } else if (codeAsString.length === 3) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 3);
      } else if (codeAsString.length === 2) {
        redCompString = codeAsString.slice(0, 2);
      } else if (codeAsString.length === 1) {
        redCompString = codeAsString.slice(0, 1);
      }
    }

    return (
      <div className='ColorCodeComponentDisplay__container' tabIndex={2}>
        <ColorCodeComponentDisplay className={classNameRed} codeAsString={redCompString} />
        <ColorCodeComponentDisplay className={classNameGreen} codeAsString={greenCompString} />
        <ColorCodeComponentDisplay className={classNameBlue} codeAsString={blueCompString} />
      </div>
    );
  }

  getDeleteButton({isHidden}) {
    let classes = 'button ColorCodeControl__delete-button';
    if (isHidden) {
      classes += ' hidden';
    }
    if (this.props.isDeleteButtonActive) {
      classes += ' button--active';
    }
    return <button className={classes} onClick={this.props.handleDeleteButtonClick}>⌫</button>
  }

  render() {
    let hideDeleteButton = true;
    if (this.props.inCodeEditMode) {
      hideDeleteButton = false;
    }
    return (
      <div className='ColorCodeControl__container'>
        {this.getLabelElement()}
        <div className='ColorCodeControl__bottom-row'>
          <ColorComponentViewToggle showColorComponents={this.props.showColorComponents} onClick={this.props.toggleShowColorComponents}/>
          {this.getColorCodeComponentDisplay()}
          {this.getDeleteButton({isHidden:hideDeleteButton})}
        </div>
      </div>
    );
  }
}

export default ColorCodeControl;
