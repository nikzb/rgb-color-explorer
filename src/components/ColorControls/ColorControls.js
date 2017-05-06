import React, { Component } from 'react';

import ColorCodeControl from '../ColorCodeControl/ColorCodeControl';
import ColorComponentsControls from '../ColorComponentsControls/ColorComponentsControls';
import NumberSettingsControls from '../NumberSettingsControls/NumberSettingsControls';
import ColorCodeButtonPanel from '../ColorCodeButtonPanel/ColorCodeButtonPanel';

import './ColorControls.css';

class ColorControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCodeEditMode: false,
      shouldReset: false
    }
    this.setCodeEditMode = this.setCodeEditMode.bind(this);
    this.setShouldReset = this.setShouldReset.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  setCodeEditMode(newValue) {
    this.setState({
      inCodeEditMode: newValue
    });
  }

  setShouldReset(newValue) {
    this.setState({
      shouldReset: newValue
    });
  }

  getControlPanel() {
    if (this.state.inCodeEditMode) {
      return <ColorCodeButtonPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} setCursorPosition={this.setCursorPosition} setCodeEditMode={this.setCodeEditMode} setShouldReset={this.setShouldReset} />;
    } else {
      return <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} />;
    }
  }

  handleDocumentClick(e) {
    console.log('in handle document click');


    if (!e.target.className.includes('ColorCodeComponentDisplay') && !e.target.className.includes('ColorCodeButtonPanel__button')) {
      if (this.state.inCodeEditMode) {
        this.setCodeEditMode(false);
        if (this.props.colorCode.isPartial) {
          // Replace with a full code
          this.props.onColorChange({
            newCode: this.props.colorCode.getCode(),
          });
        }
      }
    } else if (this.state.shouldReset) {
      this.setCodeEditMode(false);
      this.setShouldReset(false);
    } else if (!this.state.inCodeEditMode) {
      this.setCodeEditMode(true);
    }
  }

  componentDidMount() {
	  document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div className="ColorControls__container">
        <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.state.inCodeEditMode} />
        {this.getControlPanel()}
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
