import React from 'react';

class BinaryFractionVizRuler extends React.PureComponent {
  tickMarks({yTop, xLeft, width, height, numberOfBits, color, maxStrokeWidth}) {
    let ticks = [];
    let labels = [];
    for (let outer = 1; outer <= numberOfBits; outer += 1) {
      const denominator = Math.pow(2, outer);
      const root = Math.sqrt(denominator);
      const tickHeight = 1 / root * height;
      const strokeWidth = 1 / root * maxStrokeWidth;

      for (let inner = 1; inner < denominator; inner += 2) {
        const xCoord = inner / denominator * width;

        ticks.push(
          <line key={xCoord + "T"} x1={xLeft + xCoord} y1={yTop} x2={xLeft + xCoord} y2={yTop + tickHeight} stroke={color} strokeWidth={strokeWidth} />
        );
        if (denominator <= 16) {
          const textStyle = {
            fontSize: tickHeight * 0.55,
            fontFamily: "monospace",
            fontWeight: "normal",
          }
          labels.push(
            <text key={xCoord + "L"} x={xLeft + xCoord} y={yTop + tickHeight * 1.6} textAnchor="middle" stroke="none" fill={color} strokeWidth={0} style={textStyle}>{`${inner}/${denominator}`}</text>
          );
        }
      }
    }

    const textStyle = {
      fontSize: height * 0.55,
      fontFamily: "monospace",
      fontWeight: "normal",
      color: color
    }

    return (
      <g stroke={color}>
        { /* First two lines are for 0 on the left, 1 on the right */ }
        <line x1={xLeft} y1={yTop} x2={xLeft} y2={yTop + height * 0.9} stroke={color} strokeWidth={4}/>
        <line x1={xLeft + width} y1={yTop} x2={xLeft + width} y2={yTop + height * 0.9} stroke={color} strokeWidth={4} />
        {ticks}
        { /* First two labels are for 0 on the left, 1 on the right */ }
        <text x={xLeft} y={yTop + height * 1.4} textAnchor="middle" stroke="none" fill={color} strokeWidth={0} style={textStyle}>0</text>
        <text x={xLeft + width} y={yTop + height * 1.4} textAnchor="middle" stroke="none" fill={color} strokeWidth={0} style={textStyle}>1</text>
        {labels}
      </g>
    )
  }

  ruler({yTop, xLeft, width, height, numberOfBits}) {
    const color = '#555';
    const strokeWidth = 4;
    return (
      <g>
        <line x1={xLeft - strokeWidth / 2} y1={yTop} x2={xLeft + width + strokeWidth / 2} y2={yTop} stroke={color} strokeWidth={4}/>
        {this.tickMarks({
          xLeft,
          width,
          yTop,
          height,
          numberOfBits,
          color,
          maxStrokeWidth: strokeWidth
        })}
      </g>
    )
  }

  // shouldComponentUpdate() {
  //
  // }

  render() {
    return this.ruler({yTop: this.props.yTop, xLeft: this.props.xLeft, width: this.props.width, height: this.props.height, numberOfBits: this.props.numberOfBits});
  }
}

export default BinaryFractionVizRuler;
