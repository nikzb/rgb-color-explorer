import React, { Component } from 'react';

import './ColorCodeButtonPanel.css';

class ColorCodeButtonPanel extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  getButtonsRow(labels) {
    return labels.map((buttonLabel) => {
      const getClickHandler = (buttonLabel) => {
        return () => {
          const colorCode = this.props.colorCode;

          // if the code input box is full, do nothing
          if (colorCode.getBase() === 2) {
            if (colorCode.getBits() === colorCode.getCode().length) {
              return;
            }
          } else if (colorCode.getBase() === 16) {
            if (colorCode.getBits() / 4 === colorCode.getCode().length) {
              return;
            }
          }
          console.log('before' + colorCode.getCode());
          const newCode = colorCode.getCode() + buttonLabel;
          console.log('after' + newCode);
          this.props.onColorChange({
            newCode,
            base: colorCode.getBase(),
            bits: colorCode.getBits()
          });
        };
      }
      return <button key={buttonLabel} className={'button ColorCodeButtonPanel__button'} onClick={getClickHandler(buttonLabel)}>{buttonLabel}</button>
    });
  }

  render() {
    const colorCode = this.props.colorCode;
    if (colorCode.getBase() === 2) {
      const binaryButtonLabels = ['0', '1'];
      const binaryButtons = <div className='ColorCodeButtonPanel__single-row'>{this.getButtonsRow(binaryButtonLabels)}</div>;

      return (
        <div className='ColorCodeButtonPanel'>
          {binaryButtons}
        </div>
      );
    } else if (colorCode.getBase() === 16) {
      const buttonLabelsRow1 = ['0', '1', '2', '3', '4', '5', '6', '7'];
      const buttonLabelsRow2 = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

      let buttonRow1 = <div className='ColorCodeButtonPanel__top-row'>{this.getButtonsRow(buttonLabelsRow1)}</div>;
      let buttonRow2 = <div className='ColorCodeButtonPanel__bottom-row'>{this.getButtonsRow(buttonLabelsRow2)}</div>;

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
