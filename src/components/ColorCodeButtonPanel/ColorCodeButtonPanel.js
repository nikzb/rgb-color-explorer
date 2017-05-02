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
          const newCode = this.props.colorCode.getCode() + buttonLabel;
          console.log(newCode);
          this.props.onColorChange({
            newCode,
            base: this.props.colorCode.getBase(),
            bits: this.props.colorCode.getBits()
          });
        };
      }
      return <button key={buttonLabel} className={'button'} onClick={getClickHandler(buttonLabel)}>{buttonLabel}</button>
    });
  }

  render() {
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

export default ColorCodeButtonPanel;
