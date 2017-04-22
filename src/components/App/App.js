import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import MainSection from '../MainSection/MainSection';
import ColorDisplay from '../ColorDisplay/ColorDisplay';
import ColorControls from '../ColorControls/ColorControls';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainSection>
          <ColorDisplay />
          <ColorControls />
        </MainSection>
      </div>
    );
  }
}

export default App;
