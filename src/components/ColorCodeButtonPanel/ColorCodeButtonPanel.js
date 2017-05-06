import React, { Component } from 'react';

import './ColorCodeButtonPanel.css';

class ColorCodeButtonPanel extends Component {
  getButtonsRow(labels) {
    return labels.map((buttonLabel) => {
      const getClickHandler = (buttonLabel) => {
        return () => {
          const colorCode = this.props.colorCode;

          let newCode = '';
          if (colorCode.isPartial) {
            newCode = this.props.colorCode.getPartial() + buttonLabel;
          } else {
            newCode = buttonLabel;
          }

          this.props.onColorChange({
            newCode,
            base: colorCode.getBase(),
            bits: colorCode.getBits()
          });

          if (newCode.length === colorCode.getFullCodeLength()) {
            this.props.setCodeEditMode(false);
            this.props.setShouldReset(true);
          }
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
