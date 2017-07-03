import React from 'react';

import BinaryFractionVizRuler from './BinaryFractionVizRuler';

class BinaryFractionViz extends React.Component {
  // tickMarks({yTop, xLeft, width, height, bitInfoArray, color, maxStrokeWidth}) {
  //   let ticks = [];
  //   let labels = [];
  //   for (let outer = 1; outer <= bitInfoArray.length; outer += 1) {
  //     const denominator = Math.pow(2, outer);
  //     const root = Math.sqrt(denominator);
  //     const tickHeight = 1 / root * height;
  //     const strokeWidth = 1 / root * maxStrokeWidth;
  //
  //     for (let inner = 1; inner < denominator; inner += 2) {
  //       const xCoord = inner / denominator * width;
  //
  //       ticks.push(
  //         <line key={xCoord + "T"} x1={xLeft + xCoord} y1={yTop} x2={xLeft + xCoord} y2={yTop + tickHeight} stroke={color} strokeWidth={strokeWidth} />
  //       );
  //       if (denominator <= 16) {
  //         const textStyle = {
  //           fontSize: tickHeight * 0.55,
  //           fontFamily: "monospace",
  //           fontWeight: "normal"
  //         }
  //         labels.push(
  //           <text key={xCoord + "L"} x={xLeft + xCoord} y={yTop + tickHeight * 1.6} textAnchor="middle" strokeWidth={0} style={textStyle}>{`${inner}/${denominator}`}</text>
  //         );
  //       }
  //     }
  //   }
  //
  //   const textStyle = {
  //     fontSize: height * 0.55,
  //     fontFamily: "monospace",
  //     fontWeight: "normal"
  //   }
  //
  //   return (
  //     <g stroke={color}>
  //       { /* First two lines are for 0 on the left, 1 on the right */ }
  //       <line x1={xLeft} y1={yTop} x2={xLeft} y2={yTop + height * 0.9} strokeWidth={4}/>
  //       <line x1={xLeft + width} y1={yTop} x2={xLeft + width} y2={yTop + height * 0.9} strokeWidth={4} />
  //       {ticks}
  //       { /* First two labels are for 0 on the left, 1 on the right */ }
  //       <text x={xLeft} y={yTop + height * 1.4} textAnchor="middle" strokeWidth={0} style={textStyle}>0</text>
  //       <text x={xLeft + width} y={yTop + height * 1.4} textAnchor="middle" strokeWidth={0} style={textStyle}>1</text>
  //       {labels}
  //     </g>
  //   )
  // }

  // ruler({yTop, xLeft, width, height, bitInfoArray}) {
  //   const color = "black";
  //   const strokeWidth = 4;
  //   return (
  //     <g>
  //       <line x1={xLeft - strokeWidth / 2} y1={yTop} x2={xLeft + width + strokeWidth / 2} y2={yTop} stroke={"black"} strokeWidth={4}/>
  //       {this.tickMarks({
  //         xLeft,
  //         width,
  //         yTop,
  //         height,
  //         bitInfoArray,
  //         color,
  //         maxStrokeWidth: strokeWidth
  //       })}
  //     </g>
  //   )
  // }

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
