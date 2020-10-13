import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';


import SpotifyApp from './containers/SpotifyApp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SpotifyApp />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

