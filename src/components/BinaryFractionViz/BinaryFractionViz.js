import React from 'react';

class BinaryFractionViz extends React.Component {
  tickMarks({yTop, xLeft, width, height, bitInfoArray, color, maxStrokeWidth}) {
    let ticks = [];
    let labels = [];
    for (let outer = 1; outer <= bitInfoArray.length; outer += 1) {
      const denominator = Math.pow(2, outer);
      const root = Math.sqrt(denominator)
      const tickHeight = 1 / root * height;
      const strokeWidth = 1 / root * maxStrokeWidth;

      for (let inner = 1; inner < denominator; inner += 2) {
        const xCoord = inner / denominator * width;

        ticks.push(
          <line x1={xLeft + xCoord} y1={yTop} x2={xLeft + xCoord} y2={yTop + tickHeight} stroke={color} strokeWidth={strokeWidth} />
        );
        // labels.push(
        //
        // );
      }
    }

    return (
      <g stroke={color}>
        <line x1={xLeft} y1={yTop} x2={xLeft} y2={yTop + height} strokeWidth={4}/>
        <line x1={xLeft + width} y1={yTop} x2={xLeft + width} y2={yTop + height} strokeWidth={4} />
        {ticks}
      </g>
    )
  }

  ruler({yTop, xLeft, width, height, bitInfoArray}) {
    const color = "black";
    const strokeWidth = 4;
    return (
      <g>
        <line x1={xLeft - strokeWidth / 2} y1={yTop} x2={xLeft + width + strokeWidth / 2} y2={yTop} stroke={"black"} strokeWidth={4}/>
        {this.tickMarks({
          xLeft,
          width,
          yTop,
          height,
          bitInfoArray,
          color,
          maxStrokeWidth: strokeWidth
        })}
      </g>
    )
  }

  bars({width, height, xLeft, value}) {
    let rectStyle = {
      transition: 'width 1s'
    }
    return (
      <g>
        <rect x={xLeft} y={height * 0.2} width={value * width} height={height * 0.2} style={rectStyle}/>
      </g>
    )
  }

  render() {
    // The buffer as a percentage of the full width that will be included as a margin on each side
    const bufferPercentage = 0.02;
    const buffer = this.props.width * bufferPercentage;
    const width = this.props.width - 2 * buffer;
    const height = this.props.height;


    return (
      <svg width={this.props.width} height={this.props.height}>
        {this.bars({width, height: height, xLeft: buffer, value: this.props.value})}
        {this.ruler({yTop: height / 2, xLeft: buffer, width: width, height: height / 2, bitInfoArray: this.props.bitInfoArray})}
      </svg>
    )
  }
}

export default BinaryFractionViz;
