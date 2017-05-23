import React from 'react';
import PropTypes from 'prop-types';

import './GameLevelsMenu.css';

const GameLevelsMenu = ({getLevelInfoList}) => (
  <div className="GameLevelsMenu__container">
    <h2 className="GameLevelsMenu__title">Choose a Level</h2>
    {getLevelInfoList().map(levelInfo => {
      return (
        <div className={`row GameLevelsMenu__row GameLevelsMenu__row--${levelInfo.background}`} key={levelInfo.bits}>
          <div className="small-4 medium-3 columns GameLevelsMenu__label">
            {`${levelInfo.bits} Bit ${levelInfo.system}`}
          </div>
          <button className="small-4 medium-6 columns button GameLevelsMenu__button">
            {`${levelInfo.title}`}
          </button>
          <div className="small-4 medium-3 columns GameLevelsMenu__label">
            {`${levelInfo.colors} Colors`}
          </div>
        </div>
      )
    })}
  </div>
);

GameLevelsMenu.propTypes = {
  getLevelInfoList: PropTypes.func.isRequired
}

export default GameLevelsMenu;
