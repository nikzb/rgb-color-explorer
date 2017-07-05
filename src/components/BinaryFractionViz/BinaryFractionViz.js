import React from 'react';

import BinaryFractionVizRuler from './BinaryFractionVizRuler';

class BinaryFractionViz extends React.Component {
  bar({width, height, xLeft, value}) {
    let rectStyle = {
      transition: 'width 1s'
    }
    return (
      <g>
        <rect x={xLeft} y={height * 0.2} width={value * width} height={height * 0.4} style={rectStyle} stroke="#357AB6" fill="#357AB6"/>
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
        {this.bar({width, height: height * 0.4, xLeft: buffer, value: this.props.value})}
        <BinaryFractionVizRuler yTop={height * 0.32} xLeft={buffer} width={width} height={height * 0.4} numberOfBits={this.props.numberOfBits} />
      </svg>
    )
  }
}

export default BinaryFractionViz;
