import React, { Component } from 'react';

import './ColorDisplay.css';
import ColorViz from '../ColorViz/ColorViz';
import ColorComponentViewToggle from '../ColorComponentViewToggle/ColorComponentViewToggle';

class ColorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorComponents: true
    }
    this.toggleShowColorComponents = this.toggleShowColorComponents.bind(this);
  }

  toggleShowColorComponents() {
    this.setState({
      showColorComponents: !this.state.showColorComponents
    });
  }

  render() {
    return (
      <div className='ColorDisplay__container'>
        <ColorViz colorCode={this.props.colorCode} showColorComponents={this.state.showColorComponents}/>
        <ColorComponentViewToggle showColorComponents={this.state.showColorComponents} onClick={this.toggleShowColorComponents}/>
      </div>
    );
  }
}

export default ColorDisplay;
