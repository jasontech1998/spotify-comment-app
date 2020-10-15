import React, { Component } from 'react';

import './Feed.css';
import Navbar from '../../components/Navbar/Navbar';

import SearchResults from '../../components/SearchResults/searchResults';


import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

class Feed extends Component {
  state = {
    searchResults: null
  }
  componentDidMount = () => {
    // destructure object passed down from search input
    const {token, searchInput} = this.props.location.state;
    // if available, get data from spotify api
    if (token && searchInput) {
      spotify.setAccessToken(token);
      // search shows from user input and limit to 5
      spotify.searchShows(searchInput, {limit: 5})
        .then(data => {
          // console.log("search results", data.shows.items)
          this.setState({
            searchResults: data.shows.items,
            token: token})
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
  render() {
    
    return (
      <div className="Feed">
        <Navbar />
        <SearchResults searchResults={this.state.searchResults} token={this.state.token} />
      </div>
    );
  }
}

export default Feed;