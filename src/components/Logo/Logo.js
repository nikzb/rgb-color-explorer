import React, { Component } from 'react';

const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
// import Snap from 'snapsvg';

//import './Header.css';

class Logo extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.snap = Snap('.Logo__container');
  // }

  getIconAsGroup({width}) {
    const snapWidth = width;
    //const snapHeight = width;

    // Snap constructor, add svg element to DOM
    const s = Snap(snapWidth, snapWidth);

    //s.rect(0,0,snapWidth,snapHeight);
    const iconSize = snapWidth;

    const circleCenterX = iconSize / 2;
    const circleCenterY = iconSize / 2;
    const circleRadius = iconSize * 0.4615;
    const circle = s.circle(circleCenterX,circleCenterY,circleRadius);
    circle.attr({ fill: '#F8E6B6'});

    const convertCoords = (value) => {
      return value * iconSize / 520;
    };

    const stickColor = '#333';

    const stickBottomCoords = [
      35,500, //+5
      130,405,
      115,390,
      20,485
    ].map(convertCoords);

    const stickBottom = s.polyline(stickBottomCoords);
    stickBottom.attr({
      fill: stickColor
    });

    const stickTopCoords = [
      405,130,
      410,125,
      490,30,
      395,110,
      390,115
    ].map(convertCoords);

    const stickTop = s.polyline(stickTopCoords);
    stickTop.attr({
      fill: stickColor
    });

    const kabobsColor = '#333';

    const spacing = circleRadius * 0.417;
    const zero1CenterX = circleCenterX;
    const zero1CenterY = circleCenterY;
    const zeroWidth = spacing * 0.65;
    const zeroHeight = spacing * 0.42;

    const zero1 = s.ellipse(zero1CenterX, zero1CenterY, zeroWidth, zeroHeight);
    zero1.attr({
      fill: kabobsColor,
      //filter: shadow
    });
    zero1.transform( `r45,${zero1CenterX},${zero1CenterY}`);

    const zero2CenterX = zero1CenterX - spacing;
    const zero2CenterY = zero1CenterY + spacing;

    const zero2 = s.ellipse(zero2CenterX, zero2CenterY, zeroWidth, zeroHeight);
    zero2.attr({
      fill: kabobsColor
    });
    zero2.transform( `r45,${zero2CenterX},${zero2CenterY}`);

    const zero3CenterX = zero1CenterX + spacing;
    const zero3CenterY = zero1CenterY - spacing;

    const zero3 = s.ellipse(zero3CenterX, zero3CenterY, zeroWidth, zeroHeight);
    zero3.attr({
      fill: kabobsColor
    });
    zero3.transform( `r45,${zero3CenterX},${zero3CenterY}`);

    const one1CenterX = zero1CenterX - spacing / 2;
    const one1CenterY = zero1CenterY + spacing / 2;

    const oneWidth = spacing * 0.70;
    const oneHeight = spacing * 0.17;
    var one1 = s.ellipse(one1CenterX, one1CenterY, oneWidth, oneHeight);
    one1.attr({
      fill: kabobsColor
    });
    one1.transform( `r45,${one1CenterX},${one1CenterY}`);

    const one2CenterX = zero1CenterX + spacing / 2;
    const one2CenterY = zero1CenterY - spacing / 2;
    var one2 = s.ellipse(one2CenterX, one2CenterY, oneWidth, oneHeight);
    one2.attr({
      fill: kabobsColor
    });
    one2.transform( `r45,${one2CenterX},${one2CenterY}`);


    // Group for the icon
    const icon = s.g(
      circle,
      stickBottom,
      stickTop,
      zero1,
      zero2,
      zero3,
      one1,
      one2
    );

    return icon;

  }

  getLogoImage() {

    const width = 140;
    const icon = this.getIconAsGroup({width});
    return icon;
  }

  render() {
    this.getLogoImage();
    return (
      <div className="Logo__container">
      </div>
    );
  }
}

export default Logo;
