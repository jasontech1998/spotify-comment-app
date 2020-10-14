import React, { Component } from 'react';

import './Home.css';
import {loginUrl} from '../../spotify';
import Search from '../../components/Search/Search';


class Home extends Component {
  render() {
    
    let signOrSearch = (
      <div id="logInBtn">
        <button type="button" className="btn btn-light"><a href={loginUrl} id="logBtn"> Login with Spotify </a></button>
      </div>
    );
    // if token is not null, render search bar
    if (this.props.token !== null) {
      signOrSearch = (
          <Search token={this.props.token}/>
      );
    }

    return (
      <div className="Home">
        <div className="appTitle">
          <i className="fab fa-spotify"></i>
          <h1 id="appName">Spotify-App</h1>
        </div>
        <h4 id="bio">Listen, comment, and rate your favorite podcasts.</h4>
        {signOrSearch}
      </div>
    );
  }
}

export default Home;