import React, { Component } from 'react';

import './Home.css';
import {loginUrl} from '../../spotify';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="appTitle">
          <i className="fab fa-spotify"></i>
          <h1 id="appName">Spotify-App</h1>
        </div>
        <div id="logInBtn">
          <button type="button" className="btn btn-light"><a href={loginUrl} id="logBtn"> Login to Spotify </a></button>
        </div>
        
      </div>
    );
  }
}

export default Home;