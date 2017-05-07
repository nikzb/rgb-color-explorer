import React, { Component } from 'react';

import './ColorCodeButtonPanel.css';

class ColorCodeButtonPanel extends Component {
  getButtonsRow(labels, numberSystem) {
    return labels.map((buttonLabel) => {
      const getClickHandler = (buttonLabel) => {
        return () => {
          this.props.addSymbolToCode(buttonLabel, true);
        }
      }
      const classes = `button ColorCodeButtonPanel__button ColorCodeButtonPanel__button--${numberSystem}`;
      return <button key={buttonLabel} className={classes} onClick={getClickHandler(buttonLabel)}>{buttonLabel}</button>
    });
  }

  render() {
    const colorCode = this.props.colorCode;
    if (colorCode.getBase() === 2) {
      const binaryButtonLabels = ['0', '1'];
      const binaryButtons = <div className='ColorCodeButtonPanel__single-row'>{this.getButtonsRow(binaryButtonLabels, 'binary')}</div>;

      return (
        <div className='ColorCodeButtonPanel'>
          {binaryButtons}
        </div>
      );
    } else if (colorCode.getBase() === 16) {
      const buttonLabelsRow1 = ['0', '1', '2', '3', '4', '5', '6', '7'];
      const buttonLabelsRow2 = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

      let buttonRow1 = <div className='ColorCodeButtonPanel__top-row'>{this.getButtonsRow(buttonLabelsRow1, 'hex')}</div>;
      let buttonRow2 = <div className='ColorCodeButtonPanel__bottom-row'>{this.getButtonsRow(buttonLabelsRow2, 'hex')}</div>;

      return (
        <div className='ColorCodeButtonPanel'>
          {buttonRow1}
          {buttonRow2}
        </div>
      );
    }
  }
}

export default ColorCodeButtonPanel;
