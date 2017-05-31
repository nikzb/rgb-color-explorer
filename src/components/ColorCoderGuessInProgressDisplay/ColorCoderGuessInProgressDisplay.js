import React, { Component } from 'react';
import _ from 'lodash';
import ColorCodeComponentDisplay from '../ColorCodeComponentDisplay/ColorCodeComponentDisplay';
import ColorComponentViewToggle from '../ColorComponentViewToggle/ColorComponentViewToggle';

import './ColorCoderGuessInProgressDisplay.css';

class ColorCoderGuessInProgressDisplay extends Component {
  getLabelElement() {
    return <label className='ColorCoderGuessInProgressDisplay__label'>Guess the RGB Color Code:</label>;
  }

  getColorCodeComponentDisplay() {
    let classNameRed = 'ColorCodeComponentDisplay';
    let classNameGreen = 'ColorCodeComponentDisplay';
    let classNameBlue = 'ColorCodeComponentDisplay';

    const colorCode = this.props.guessInProgress;

    let codeAsString;

    if (colorCode.isPartial) {
      codeAsString = colorCode.getPartial();
    } else {
      codeAsString = colorCode.getCode();
    }

    classNameRed += ' ColorCodeComponentDisplay--red';
    classNameGreen += ' ColorCodeComponentDisplay--green';
    classNameBlue += ' ColorCodeComponentDisplay--blue';

    let redCompString = '';
    let greenCompString = '';
    let blueCompString = '';

    if (codeAsString.length === 0 || codeAsString.length === colorCode.getFullCodeLength()) {
      classNameRed += ' ColorCodeComponentDisplay--placeholder';
      classNameGreen += ' ColorCodeComponentDisplay--placeholder';
      classNameBlue += ' ColorCodeComponentDisplay--placeholder';
      if (colorCode.getFullCodeLength() === 3) {
        redCompString = 'R';
        greenCompString = 'G';
        blueCompString = 'B';
      } else if (colorCode.getFullCodeLength() === 6) {
        redCompString = 'RR';
        greenCompString = 'GG';
        blueCompString = 'BB';
      } else {
        throw Error('Code length is not 3 or 6');
      }
    } else {
      classNameRed += ' ColorCodeComponentDisplay--red';
      classNameGreen += ' ColorCodeComponentDisplay--green';
      classNameBlue += ' ColorCodeComponentDisplay--blue';

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
        } else {

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
    }

    return (
      <div className='ColorCodeComponentDisplay__container' >
        <ColorCodeComponentDisplay className={classNameRed} codeAsString={redCompString} />
        <ColorCodeComponentDisplay className={classNameGreen} codeAsString={greenCompString} />
        <ColorCodeComponentDisplay className={classNameBlue} codeAsString={blueCompString} />
      </div>
    );
  }

  getDeleteButton({isHidden}) {
    let classes = 'button ColorCoderGuessInProgressDisplay__delete-button';
    if (isHidden) {
      classes += ' hidden';
    }
    if (this.props.isDeleteButtonActive) {
      classes += ' button--active';
    }
    return <button className={classes} onClick={this.props.handleDeleteButtonClick}>⌫</button>
  }

  render() {
    return (
      <div className='ColorCoderGuessInProgressDisplay__container'>
        {this.getLabelElement()}
        <div className='ColorCoderGuessInProgressDisplay__bottom-row'>
          <ColorComponentViewToggle hidden={true} showColorComponents={false} onClick={() => { throw Error('Toggle should be hidden, should not be able to be clicked') }}/>
          {this.getColorCodeComponentDisplay()}
          {this.getDeleteButton({isHidden:false})}
        </div>
      </div>
    );
  }
}

export default ColorCoderGuessInProgressDisplay;
