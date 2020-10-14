import React, { Component } from 'react';

import './Feed.css';
import Navbar from '../../components/Navbar/Navbar';
import Search from '../../components/Search/Search';

class Feed extends Component {

  render() {
    return (
      <div className="Feed">
        <Navbar />
        <div id="searchBar">
          <Search />
        </div>
      </div>
    );
  }
}

export default Feed;