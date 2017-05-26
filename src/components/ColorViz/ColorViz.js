import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ColorCircleGroup from '../../classes/ColorCircleGroup/ColorCircleGroup';

import './ColorViz.css';

const PERCENT_CHANGE = 0.025;

class ColorViz extends Component {
  constructor(props) {
    super(props);

    // Default values assume that we are going to show the color components
    let percentFromCenter = 1.00;
    let wasShowingComponents = true;

    // Alter defaults if needed based on prop
    if (!this.props.showColorComponents) {
      percentFromCenter = 0;
      wasShowingComponents = false;
    }

    this.state = {

      // A measure of what percentage of the fully separated distance the circles are apart.
      // Note that this goes over 1 during the animation
      // A value of 0 would imply that you would only see one circle
      percentFromCenter,

      // Keep track of whether components are shown to compare with new props value upon update
      wasShowingComponents,

      // Keeps track of what transition is currently being executed
      // Values are 'none', 'join', 'separate'
      transition: 'none',

      // Progress measure starts as 0 and increases until the animation transition is over
      transitionProgress: 0,

      // The radius of the circles that will be drawing
      radius: 108
    }
    this.updateViz = this.updateViz.bind(this);
    this.setCanvasSizeAndRadius = this.setCanvasSizeAndRadius.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
  }

  // Given the time of the animation transition, return a change in distance
  transitionFunction(time) {
    // linear derivative of quadratic distance function
    // const m = -0.1;
    // const xIntercept = 0.4;
    //
    // return m * progress + -m * xIntercept;

    // quartic derivate of pentic distance function
    // const a = -0.5;
    // const b = 0.5;
    //
    // const timeCubed = Math.pow(time, 3);
    //
    // return a * timeCubed * time + b * timeCubed;

    // quadratic derivative of cubic distance function
    // const a = -.25;
    // const b = .2;
    // return a * time * time + b * time;

    // trig function
    if (this.state.transition ==='join') {
      return 0.095 * Math.cos(time + 1.47) + 0.05;
    } else if (this.state.transition === 'separate') {
      return -(0.095 * Math.cos(time + 2.83) + 0.05);
      //return 0.1 * Math.cos(time + 5.7) + 0.05;
    }
  }

  drawCircleGroup() {
    const vizCanvas = ReactDOM.findDOMNode(this.refs.vizCanvas);
    const context = vizCanvas.getContext('2d');

    const circleGroup = new ColorCircleGroup({
      colorCode: this.props.colorCode,
      x: 0,
      y: 0,
      radius: this.state.radius, //140
      percentFromCenter: this.state.percentFromCenter,
      context
    });

    context.clearRect(0, 0, vizCanvas.width, vizCanvas.height);

    // Translate canvas coordinate system before drawing
    context.save();
    context.translate(vizCanvas.width / 2, vizCanvas.height / 2);
    context.rotate(this.state.transitionProgress * Math.PI);
    circleGroup.draw();
    context.restore();
  }

  updateViz() {
    this.drawCircleGroup();

    const percentFromCenterBeforeUpdate = this.state.percentFromCenter;

    this.setState({
      percentFromCenter: this.state.percentFromCenter + this.transitionFunction(this.state.transitionProgress),
      transitionProgress: this.state.transitionProgress + PERCENT_CHANGE
    });

    // For join transition animation, stop when circles get to center
    if (this.state.transition === 'join') {
      if (this.state.percentFromCenter > 0) {
        requestAnimationFrame(this.updateViz);
      }
      else {
        this.setState({
          percentFromCenter: 0,
          transition: 'none',
          transitionProgress: 0
        });
      }
    }
    // For separate transition animation, stop when percentFromCenter passes 1 when decreasing
    // It will pass 1 when increasing then start decreasing and pass 1 again.
    else if (this.state.transition === 'separate') {
      if (percentFromCenterBeforeUpdate > 1 && this.state.percentFromCenter < 1.0) {
        this.setState({
          percentFromCenter: 1,
          transition: 'none',
          transitionProgress: 0
        });
      } else {
        requestAnimationFrame(this.updateViz);
      }
    }
  }

  updateCanvas() {
    const vizCanvas = ReactDOM.findDOMNode(this.refs.vizCanvas);
    const context = vizCanvas.getContext('2d');
    context.globalCompositeOperation = "lighter";

    // console.log('show' + this.props.showColorComponents);
    // If Else Chain has three parts:
    // 1) Check for transition from showing components to not
    // 2) Check for transition from not showing components to showing
    // 3) If neither, then just show draw in current position
    if (this.state.wasShowingComponents && !this.props.showColorComponents) {
      this.setState({
        percentFromCenter: this.state.percentFromCenter - PERCENT_CHANGE,
        transition: 'join',
        wasShowingComponents: false
      });
      requestAnimationFrame(this.updateViz);
    } else if (!this.state.wasShowingComponents && this.props.showColorComponents) {
      this.setState({
        percentFromCenter: this.state.percentFromCenter + PERCENT_CHANGE,
        transition: 'separate',
        wasShowingComponents: true
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

  setCanvasSizeAndRadius(canvasDimension, radius) {
    this.refs.vizCanvas.width = canvasDimension;
    this.refs.vizCanvas.height = canvasDimension;
    this.setState({
      radius
    });
  }

  resizeCanvas() {
    const lowResMedia = "(-webkit-max-device-pixel-ratio: 1.99) and (min-width: 25em), (max-resolution: 191dpi) and (min-width: 25em)";
    const lowResMediaQuery = window.matchMedia(lowResMedia);

    // use multiplier to make the canvas smaller in some situations
    let multiplier = 1;
    if (this.props.size === 'small') {
      multiplier = 0.8;
    } else if (this.props.size === 'tiny') {
      multiplier = 0.3;
    }
    if (window.innerWidth < 400 || lowResMediaQuery.matches) {
      this.setCanvasSizeAndRadius(300 * multiplier, 100 * multiplier);
    } else if (window.innerWidth < 600) {
      this.setCanvasSizeAndRadius(340 * multiplier, 114 * multiplier);
    } else { // if (window.innerWidth < 890) {
      this.setCanvasSizeAndRadius(370 * multiplier, 124 * multiplier);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCanvas, false);

    this.resizeCanvas();
    this.updateCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvas, false);
  }

  componentDidUpdate() {
    if (this.state.transition === 'none') {
      this.updateCanvas();
    }
  }

  render() {
    return (
      <div className='ColorViz__container'>
        {/* <canvas ref='vizCanvas' className={`ColorViz__canvas${this.props.canvasClassesToAdd}`} width={370} height={370} onClick={this.props.onClick}/> */}
        <canvas ref='vizCanvas' className={`ColorViz__canvas${this.props.canvasClassesToAdd}`} width={370} height={370} onClick={this.props.onClick}/>
      </div>
    );
  }
}

export default ColorViz;
