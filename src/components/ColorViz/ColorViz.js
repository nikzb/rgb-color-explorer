import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './ColorViz.css';

class ColorViz extends Component {
  componentDidMount() {
    const vizCanvas = ReactDOM.findDOMNode(this.refs.vizCanvas);
    const ctx = vizCanvas.getContext('2d');

    ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fill();
  }

  render() {
    return (
      <div className='ColorViz__container'>
        <canvas ref='vizCanvas' className='ColorViz__canvas' width='300' height='300'/>
      </div>
    );
  }
}

export default ColorViz;
