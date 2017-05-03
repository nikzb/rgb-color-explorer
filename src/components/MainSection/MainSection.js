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
        red: 14,
        green: 11,
        blue: 15
      })
    };
    this.updateColor = this.updateColor.bind(this);
  }

  // Parameters:
  //   newCode: A string with a new color code to use
  //   comp: The color component gettig updated
  //   newValue: The new value of the color component being updated
  //   newBase: The base for the new color code, if different from the old base
  //   newBitsPerComponent: The new number of bits per component, if different then the old
  updateColor({newCode, comp, newValue, newBase, newBitsPerComponent}) {
    const oldCode = this.state.colorCode;

    const convertToNewNumberOfBits = ({base, newBitsPerComp}) => {
      const newMax = Math.pow(2, newBitsPerComp) - 1;
      const oldMax = oldCode.getMaxComponentValue();
      const factor = newMax / oldMax;
      this.setState({
        colorCode: new ColorCode({
          base,
          bits: newBitsPerComp * 3,
          red: Math.round(oldCode.getComponent('R') * factor),
          green: Math.round(oldCode.getComponent('G') * factor),
          blue: Math.round(oldCode.getComponent('B') * factor)
        })
      });
    };

    // If a code is include in the parameter object, use the code to update the color
    if (newCode || newCode === '') {
      // let baseUsedInCode;
      // if (newCode.charAt(0) === '#') {
      //   baseUsedInCode = 16;
      // } else {
      //   baseUsedInCode = 2;
      // }
      this.setState({
        colorCode: new ColorCode({
          base: oldCode.getBase(),
          bits: oldCode.getBits(),
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
      // Convert to new base. This assumes that it will only be run if the base is actually changing
      if (newBase === 16) {
        convertToNewNumberOfBits({
          base: newBase,
          newBitsPerComp: 4
        });
      } else {
        convertToNewNumberOfBits({
          base: newBase,
          newBitsPerComp: 3
        });
      }
    } else if (newBitsPerComponent) {
      // convert to new number of bits (keeping same base)
      convertToNewNumberOfBits({
        base: oldCode.getBase(),
        newBitsPerComp: newBitsPerComponent
      });
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
