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
          console.log('in button panel click handler');
          const selectionStart = this.props.codeInputElement.selectionStart;
          const selectionEnd = this.props.codeInputElement.selectionEnd;

          console.log('selection start ' + selectionStart);
          console.log('selection end ' + selectionEnd);

          const colorCode = this.props.colorCode;

          console.log("existing code: " + colorCode.getCode());
          console.log("length of existing code: " + colorCode.getCode().length);

          let before;
          let after;

          if (colorCode.getBase() === 2) {
            // Figure out the piece of the code that is being kept before and after the new symbol that will be added
            before = colorCode.getCode().slice(0, selectionStart - 1);
            after = colorCode.getCode().slice(selectionEnd - 1, colorCode.getCode().length);
            const totalSymbols = before.length + after.length;

            // if the code input box is full, do nothing
            if (colorCode.getBits() === totalSymbols) {
              return;
            }
          } else if (colorCode.getBase() === 16) {
            // Figure out the piece of the code that is being kept before and after the new symbol that will be added
            before = colorCode.getCode().slice(0, selectionStart - 1);
            after = colorCode.getCode().slice(selectionEnd - 1, colorCode.getCode().length);

            console.log('part before selection ' + before);
            console.log('part after selection ' + after);
            const totalSymbols = before.length + after.length;

            // if the code input box is full, do nothing
            if (colorCode.getBits() / 4 === totalSymbols) {
              return;
            }
          }
          console.log('code before modification' + colorCode.getCode());
          const newCode = before + buttonLabel + after;
          console.log('code after modification' + newCode);

          if (newCode.length === colorCode.getCode().length) {
            this.props.setCodeEditMode(false);
          }
          this.props.setCursorPosition(this.props.codeInputElement.selectionStart);

          this.props.onColorChange({
            newCode,
            base: colorCode.getBase(),
            bits: colorCode.getBits()
          });
        };
      }
      return <button key={buttonLabel} className={'button ColorCodeButtonPanel__button'} onMouseDown={getClickHandler(buttonLabel)}>{buttonLabel}</button>
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
