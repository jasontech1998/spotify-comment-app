import React, { Component } from 'react';

import './AudioWave.css';


class AudioWave extends Component {
  render() {
    return (
      <div className="AudioWave">
          <div id="preloader_1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
      </div>
    );
  }
}

export default AudioWave;