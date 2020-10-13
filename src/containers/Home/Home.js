import React, { Component } from 'react';

import './Home.css';
import {loginUrl} from '../../spotify';

class Home extends Component {
  render() {
    let signOrSearch = (
      <div id="logInBtn">
        <button type="button" className="btn btn-light"><a href={loginUrl} id="logBtn"> Login with Spotify </a></button>
      </div>
    );
    // Change false to token !== null
    // Figure how to pass token
    if (false) {
      signOrSearch = (
          <div className="container" id="searchBar">
            <form className="example" action="...">
              <input type="text" placeholder="Search.." name="search"></input>
              <button type="submit"><i className="fa fa-search"></i></button>
            </form>
          </div>
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