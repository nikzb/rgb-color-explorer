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
      levelScreenShowColorComponents: true,
      currentGame: null
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

  getLevelScreen() {
    return (
      <div className='ColorCoderMainSection__container'>
        <div>
          <h1 className='ColorCoderMainSection__title'>ColorCoder</h1>
          <ColorDisplay colorCode={this.state.logoColor} showColorComponents={this.state.levelScreenShowColorComponents} size={'small'}/>
          <GameLevelsMenu getLevelInfoList={this.getLevelInfoList} />
        </div>
      </div>
    )
  }

  render() {
    let currentGame = this.state.currentGame;

    if (currentGame === null) {
      return this.getLevelScreen();
    } else if (currentGame.currentPuzzleIndex === 3) {
      return this.getEndScreen();
    } else {
      return this.gamePlayScreen();
    }
  }
}

export default ColorCoderMainSection;
