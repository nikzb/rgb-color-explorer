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

  updateColor({newCode, comp, newValue, newBase, newBitsPerComponent}) {
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
      // Convert to new base. This assumes that it will only be run if the base is actually changing
      if (newBase === 16) {
        const newBitsPerComp = 4;
        const factor = Math.pow(2, newBitsPerComp - oldCode.getBitsPerComponent());
        this.setState({
          colorCode: new ColorCode({
            base: newBase,
            bits: newBitsPerComp * 3,
            red: oldCode.getComponent('R') * factor,
            green: oldCode.getComponent('G') * factor,
            blue: oldCode.getComponent('B') * factor
          })
        });
      } else {
        const newBitsPerComp = 3;
        const factor = Math.pow(2, oldCode.getBitsPerComponent() - newBitsPerComp);
        console.log(factor);
        console.log(oldCode);
        this.setState({
          colorCode: new ColorCode({
            base: newBase,
            bits: newBitsPerComp * 3,
            red: Math.round(oldCode.getComponent('R') / factor),
            green: Math.round(oldCode.getComponent('G') / factor),
            blue: Math.round(oldCode.getComponent('B') / factor)
          })
        });
        console.log(this.state.colorCode);
      }
    } else if (newBitsPerComponent) {
      // convert to new number of bits (keeping same base)
      if (newBitsPerComponent > oldCode.getBitsPerComponent()) {
        const factor = Math.pow(2, newBitsPerComponent - oldCode.getBitsPerComponent());
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: newBitsPerComponent * 3,
            red: oldCode.getComponent('R') * factor,
            green: oldCode.getComponent('G') * factor,
            blue: oldCode.getComponent('B') * factor
          })
        });
      } else {
        const factor = Math.pow(2, oldCode.getBitsPerComponent() - newBitsPerComponent);
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: newBitsPerComponent * 3,
            red: Math.round(oldCode.getComponent('R') / factor),
            green: Math.round(oldCode.getComponent('G') / factor),
            blue: Math.round(oldCode.getComponent('B') / factor)
          })
        });
      }
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
