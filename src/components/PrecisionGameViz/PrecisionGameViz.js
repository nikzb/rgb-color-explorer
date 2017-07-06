import React from 'react';

import BinaryFractionVizRuler from './BinaryFractionVizRuler';

class PrecisionGameViz extends React.Component {
  bar({width, height, xLeft, yTop, value, color}) {
    const rectStyle = {
      transition: 'width 1s'
    }
    const textStyle = {
      fontSize: height * 0.4,
      fontFamily: "monospace",
      fontWeight: "normal"
    }
    return (
      <g>
        <rect x={xLeft} y={yTop} width={value * width} height={height * 0.4} style={rectStyle} stroke={color} fill={color}/>
        <text x={xLeft + width * 0.015} y={yTop + height * 0.325} strokeWidth={0} style={textStyle}>{value}</text>
      </g>
    )
  }

  render() {
    // The buffer as a percentage of the full width that will be included as a margin on each side
    const bufferPercentage = 0.02;
    const buffer = this.props.width * bufferPercentage;
    const width = this.props.width - 2 * buffer;
    const height = this.props.width * 0.3;

    return (
      <svg width={this.props.width} height={height}>
        {this.bar({width, height: height * 0.4, xLeft: buffer, yTop: 0.1 * height, value: this.props.guessValue, color: '#6E6'})}
        {this.bar({width, height: height * 0.4, xLeft: buffer, yTop: 0.3 * height, value: this.props.puzzleValue, color: '#DDD'})}
        <BinaryFractionVizRuler yTop={height * 0.5} xLeft={buffer} width={width} height={height * 0.2} numberOfBits={this.props.numberOfBits} />
      </svg>
    )
  }
}

export default PrecisionGameViz;
