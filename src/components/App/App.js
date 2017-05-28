import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header/Header';
import RGBMainSection from '../RGBMainSection/RGBMainSection';
import ColorCoderMainSection from '../ColorCoderMainSection/ColorCoderMainSection';
import SouvlakiMainSection from '../SouvlakiMainSection/SouvlakiMainSection';
// import {Helmet} from 'react-helmet';

import './App.css';

require('foundation-sites/dist/css/foundation.min.css');

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Helmet>
          <meta charset='utf-8' />
          <title>RGB Color Explorer</title>
          <meta name="author" content="Nik Baltatzis" />
          <meta name="description" content="The RGB Color Explorer can be used to understand how red, green, and blue light are mixed to create all the colors that can be viewed on a digital device. Binary and hexadecimal codes are used to represent RGB color codes of various lengths. Using more bits provides more color optoins." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet> */}
        <Header />
        <Route exact path='/rgb' component={RGBMainSection} />
        <Route exact path='/color-coder' component={ColorCoderMainSection} />
        <Route exact path='/' component={SouvlakiMainSection} />
      </div>
    );
  }
}

export default App;
