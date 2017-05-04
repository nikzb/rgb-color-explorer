import React, { Component } from 'react';
import UpDownControl from '../UpDownControl/UpDownControl';
import ColorToggleButton from '../ColorToggleButton/ColorToggleButton';

import './ColorComponentSlider.css';

class ColorComponentSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggledOff: false,
      savedValue: {
        intensity: 0,
        max: this.props.max
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const comp = this.props.colorComp.charAt(0);

    if (this.state.toggledOff) {
      this.setState({
        toggledOff: false
      });

      // Calculate the correct intensity to use. This needs to be done because the number of bits used may have changed.
      const newIntensity = Math.round(this.state.savedValue.intensity / this.state.savedValue.max * this.props.max);

      this.props.onColorChange({
        comp,
        newValue: newIntensity
      });
    } else {
      this.setState({
        toggledOff: true,
        savedValue: {
          intensity: this.props.intensity,
          max: this.props.max
        }
      });
      this.props.onColorChange({
        comp,
        newValue: 0
      })
    }
  }

  handleChange(e) {
    this.setState({
      toggledOff: false,
    });
    this.props.onColorChange({
      comp: this.props.colorComp.charAt(0),
      newValue: parseInt(e.target.value, 10)
    });
  }

  // returns a function that can be used to call onColorChange with the given component
  // @param comp - color component ('R', 'G', or 'B')
  // @param oldValue - the current value of the component that will be adjusted when a button is clicked
  updateColor(comp, oldValue) {
    return (changeByAmount) => {
      this.setState({
        toggledOff: false
      });
      this.props.onColorChange({
        comp,
        newValue: oldValue + changeByAmount
      });
    };
  }

  render() {
    const containerClassNames = `ColorComponentSlider__container ColorComponentSlider__container--${this.props.colorComp.toLowerCase()}`;

    return (
      <div className={containerClassNames}>
        <ColorToggleButton onClick={this.handleToggle} colorComp={this.props.colorComp} toggledOff={this.state.toggledOff}/>
        <input className='ColorComponentSlider__slider' type='range' min={0} max={this.props.max} value={this.props.intensity} step={1} onChange={this.handleChange}/>
        <UpDownControl onClick={this.updateColor(this.props.colorComp.charAt(0), this.props.intensity)}/>
      </div>
    );
  }
}

export default ColorComponentSlider;
