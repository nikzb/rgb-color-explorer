import React, { Component } from 'react';

import Logo from '../Logo/Logo';
import SouvlakiTitle from '../SouvlakiTitle/SouvlakiTitle';

import './SouvlakiMainSection.css';

class SouvlakiMainSection extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className='SouvlakiMainSection__container'>
        <SouvlakiTitle size={'med-large'}/>
        <Logo size={180}/>
        {/* <h2 className='SouvlakiMainSection__tagline'>{'Take a Byte!'}</h2> */}
        <h2 className='SouvlakiMainSection__headline'>{'Coming Soon!'}</h2>
        <div className='SneakPreview__container'>
          <h3 className='SneakPreview__title'>{'Sneak Preview'}</h3>
          <div className='SneakPreview__options'>
            <div className='Option__container'>
              {/* // icon */}
              <h4 className='Option__title'>{'RGB Colors'}</h4>
              <p className='Option__details'>{'Explore RGB Colors and Codes'}</p>
              <button className='button Option__button'>{'Explore'}</button>
            </div>
            <div className='Option__container'>
              {/* // icon */}
              <h4 className='Option__title'>{'ColorCoder'}</h4>
              <p className='Option__details'>{'Use Clues to Discover a Code'}</p>
              <button className='button Option__button'>{'Play'}</button>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default SouvlakiMainSection;
