import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ColorCircleGroup from '../../classes/ColorCircleGroup/ColorCircleGroup';

import './ColorViz.css';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const PERCENT_CHANGE = 0.03;

class ColorViz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentFromCenter: 1.00
      // wasShowingComponents: true,
      // transition: 'join', // 'join' or 'separate'
      // transitionProgress: 0
    }
    this.updateViz = this.updateViz.bind(this);
  }

  drawCircleGroup() {
    const vizCanvas = ReactDOM.findDOMNode(this.refs.vizCanvas);
    const context = vizCanvas.getContext('2d');

    console.log("updating viz " + this.state.percentFromCenter);
    const circleGroup = new ColorCircleGroup({
      colorCode: this.props.colorCode,
      x: 0,
      y: 0,
      radius: 150,
      percentFromCenter: this.state.percentFromCenter,
      context
    });

    context.clearRect(0, 0, vizCanvas.width, vizCanvas.height);

    // Translate canvas coordinate system before drawing
    context.save();
    context.translate(vizCanvas.width / 2, vizCanvas.height / 2);
    context.rotate(this.state.percentFromCenter * 2 * Math.PI);
    circleGroup.draw();
    context.restore();
  }

  updateViz() {
    this.drawCircleGroup();

    this.setState({
      percentFromCenter: this.state.percentFromCenter - PERCENT_CHANGE
    });

    if (this.state.percentFromCenter > 0) {
      requestAnimationFrame(this.updateViz);
    } else {
      this.setState({
        percentFromCenter: 0
      });
    }
  }

  updateCanvas() {

    console.log('update canvas');
    const vizCanvas = ReactDOM.findDOMNode(this.refs.vizCanvas);
    const context = vizCanvas.getContext('2d');
    context.globalCompositeOperation = "lighter";

    // Was showing and hide was just clicked
    console.log('percent from center ' + this.state.percentFromCenter);
    console.log('show' + this.props.showColorComponents);
    //debugger;
    if (this.state.percentFromCenter === 1.00 && !this.props.showColorComponents) {
      console.log('updating state first time');
      this.setState({
        percentFromCenter: this.state.percentFromCenter - PERCENT_CHANGE
      });
      requestAnimationFrame(this.updateViz);
    } else {
      this.drawCircleGroup();
    }

    // // Was showing and hide was just clicked
    // if (this.state.wasShowingComponents && !this.props.showColorComponents) {
    //   // Need to initiate join transition
    //   this.setState({
    //     wasShowingComponents: false
    //   });
    //   joinTransition();
    // }
    // else if (!this.state.wasShowingComponents && this.props.showColorComponents) {
    //   // Need to initiate separate transition
    //   this.setState({
    //     wasShowingComponents: true
    //   });
    // }


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
