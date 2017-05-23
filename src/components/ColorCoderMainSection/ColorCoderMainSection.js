import React, { Component } from 'react';

import ColorDisplay from '../ColorDisplay/ColorDisplay';
import ColorCode from '../../classes/ColorCode/ColorCode';
import GameLevelsMenu from '../GameLevelsMenu/GameLevelsMenu';

import './ColorCoderMainSection.css';

class ColorCoderMainSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logoColor: new ColorCode({
        base: 16,
        bits: 24,
        red: 255,
        green: 255,
        blue: 255
      }),
      showColorComponents: true
    }
  }

  getLevelInfoList() {
    return [
      {
        title: 'Beginner',
        bits: '6',
        system: 'Binary',
        colors: '64',
      },
      {
        title: 'Intermediate',
        bits: '12',
        system: 'Hex',
        colors: '4,096',
      },
      {
        title: 'Expert',
        bits: '24',
        system: 'Hex',
        colors: '16,777,216',
      }
    ]
  }

  render() {
    return (
      <div className='MainSection__container'>
        <h1 className='MainSection__title'>ColorCoder</h1>
        <ColorDisplay colorCode={this.state.logoColor} showColorComponents={this.state.showColorComponents} size={'small'}/>
        <GameLevelsMenu getLevelInfoList={this.getLevelInfoList} />
      </div>
    );
  }
}

export default ColorCoderMainSection;
