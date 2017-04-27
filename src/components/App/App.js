import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import MainSection from '../MainSection/MainSection';

require('foundation-sites/dist/css/foundation.min.css');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainSection />
      </div>
    );
  }
}

export default App;
