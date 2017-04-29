import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ColorCircleGroup from '../../classes/ColorCircleGroup/ColorCircleGroup';

import './ColorViz.css';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

class ColorViz extends Component {
  // constructor(props) {
  //   super(props);
  // }

  updateCanvas() {
    const vizCanvas = ReactDOM.findDOMNode(this.refs.vizCanvas);
    const context = vizCanvas.getContext('2d');
    context.globalCompositeOperation = "lighter";

    const circleGroup = new ColorCircleGroup({
      colorCode: this.props.colorCode,
      x: 0,
      y: 0,
      radius: 150,
      context
    });

    context.clearRect(0, 0, vizCanvas.width, vizCanvas.height);

    // Translate canvas coordinate system before drawing
    context.save();
    context.translate(vizCanvas.width / 2, vizCanvas.height / 2);
    circleGroup.draw();
    context.restore();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  render() {
    return (
      <div className='ColorViz__container'>
        <canvas ref='vizCanvas' className='ColorViz__canvas' width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
      </div>
    );
  }
}

export default ColorViz;
