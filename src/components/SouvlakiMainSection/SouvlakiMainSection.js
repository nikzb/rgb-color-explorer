import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ColorCode from '../../classes/ColorCode/ColorCode';

import Logo from '../Logo/Logo';
import SouvlakiTitle from '../SouvlakiTitle/SouvlakiTitle';
import ColorDisplay from '../ColorDisplay/ColorDisplay';

import './SouvlakiMainSection.css';

class SouvlakiMainSection extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const logoColor = new ColorCode({
      base: 16,
      bits: 24,
      red: 255,
      green: 255,
      blue: 255
    });

    return (
      <div className='SouvlakiMainSection__container'>
        <SouvlakiTitle size={'med-large'}/>
        <Logo size={140}/>
        {/* <h2 className='SouvlakiMainSection__tagline'>{'Take a Byte!'}</h2> */}
        <h2 className='SouvlakiMainSection__headline'>{'Coming Soon!'}</h2>
        <div className='SneakPreview__container'>

          <h3 className='SneakPreview__title'>{'Sneak Preview'}</h3>
          <div className='ColorDisplay'>
            <ColorDisplay key={'tempMainScreen'} colorCode={logoColor} showColorComponents={true} size={'smaller'}/>
            {/* <ColorDisplay key={'tempMainScreen'} colorCode={logoColor} showColorComponents={true} size={'mini'}/>  */}
          </div>
          <div className='SneakPreview__options'>
            <div className='Option__container Option__container--left'>
              {/* // icon */}
              <h4 className='Option__title'>{'RGB Colors'}</h4>
              <p className='Option__details'>{'Explore RGB Colors and Codes'}</p>

              <Link to='/rgb'>
                <button className='button Option__button'>{'Explore'}</button>
              </Link>
            </div>
            <div className='Option__container Option__container--right'>
              {/* // icon */}
              <h4 className='Option__title'>{'ColorCoder'}</h4>
              <p className='Option__details'>{'Use Clues to Discover a Code'}</p>

              <Link to='/color-coder'>
                <button className='button Option__button'>{'Play'}</button>
              </Link>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default SouvlakiMainSection;
