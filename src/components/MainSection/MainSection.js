import React, { Component } from 'react';
import ColorCode from '../../classes/ColorCode/ColorCode';
import ColorDisplay from '../ColorDisplay/ColorDisplay';
import ColorControls from '../ColorControls/ColorControls';

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // colorCode: new ColorCode({
      //   base: 2,
      //   bits: 9,
      //   red: 7,
      //   green: 1,
      //   blue: 0
      // })
      colorCode: new ColorCode({
        base: 16,
        bits: 12,
        red: 0,
        green: 3,
        blue: 15
      })
    };
    this.updateColor = this.updateColor.bind(this);
  }

  updateColor({newCode, comp, newValue, newBase, newBits}) {
    const oldCode = this.state.colorCode;

    // If a code is include in the parameter object, use the code to update the color
    if (newCode) {
      let baseUsedInCode;
      if (newCode.charAt(0) === '#') {
        baseUsedInCode = 16;
      } else {
        baseUsedInCode = 2;
      }
      this.setState({
        colorCode: new ColorCode({
          base: baseUsedInCode,
          code: newCode
        })
      });
    }
    else if (comp) { // if no code is included, check if a component is specified to be updated
      if (comp === 'R') {
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: oldCode.getBits(),
            red: newValue,
            green: oldCode.getComponent('G'),
            blue: oldCode.getComponent('B')
          })
        });
      } else if (comp === 'G') {
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: oldCode.getBits(),
            red: oldCode.getComponent('R'),
            green: newValue,
            blue: oldCode.getComponent('B')
          })
        });
      } else if (comp === 'B') {
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: oldCode.getBits(),
            red: oldCode.getComponent('R'),
            green: oldCode.getComponent('G'),
            blue: newValue
          })
        });
      }
    } else if (newBase) {
      // convert to new base
    } else if (newBits) {
      // convert to new number of bits (keeping same base)
    }
  }

  render() {
    return (
      <div>
        <ColorDisplay colorCode={this.state.colorCode} />
        <ColorControls colorCode={this.state.colorCode} onColorChange={this.updateColor} />
      </div>
    );
  }
}

export default MainSection;
