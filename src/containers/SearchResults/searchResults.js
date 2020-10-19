import React, {Component} from 'react';


import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import './searchResults.css';
import Navbar from '../../components/Navbar/Navbar';
import { withRouter } from 'react-router-dom';

import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

class SearchResults extends Component {
  state = {
    episodesResult: null
  }

  componentDidMount = () => {
    console.log("component did mount")
    // when searchResult first mounts, use the search input passed down from Search component (from home component) and search up the result of shows
    // destructure object passed down from search input
    const {token, searchInput} = this.props.location.state;
    // if available, get data from spotify api
    if (token && searchInput) {
      spotify.setAccessToken(token);
      // search shows from user input and limit to 5
      spotify.searchShows(searchInput, {limit: 5})
        .then(data => {
          // set search results of shows and token into state
          this.setState({
            searchResults: data.shows.items,
            token: token})
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  componentDidUpdate = (prevProps, nextProps) => {
    // if the component updated due to a new search, use the new search input passed down from the search component (from navbar) and search up the result of shows
    if (nextProps === this.state) {
      const {token, searchInput} = this.props.location.state;
      // if available, get data from spotify api
      if (token && searchInput) {
        spotify.setAccessToken(token);
        // search shows from user input and limit to 5
        spotify.searchShows(searchInput, {limit: 6})
          .then(data => {
            // since this is triggered from navbar search, remove previous episodesResult state so only the searchResults are rendered (this makes it so if the user is on EpisodesList or Episodes, it removes that data so searchResults will only render)
            this.setState({
              searchResults: data.shows.items,
              episodesResult: null,
              token: token})
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
    // if there is episodesResult in state, the user has clicked on a show, so display the result of the episodes instead of searchResults (it will display a list of episodes)
    if (this.state.episodesResult) {
      console.log("navigate to episodesResult")
      this.props.history.push({
        pathname: "/episodesList",
        state: {
            episodesResult: this.state.episodesResult,
            token: this.state.token}
      });
    }
  }

  // When a user clicks on a show from search results, get the data of the episodes in the show and store it in state
  onClickShowHandler = (id) => {
    spotify.getShowEpisodes(id, {limit: 8})
      .then(episodes => {
        this.setState({
          searchResults: null,
          episodesResult: episodes.items})
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {
    let searchResults = null;
    let showNavBar = null;
    if (this.state.searchResults) {
      searchResults = (
        <Auxiliary>
         {this.state.searchResults.map((show) => {
           return (
             <div
                onClick={() => this.onClickShowHandler(show.id)} 
                className="showWrapper" key={show.id}>
               <div className="imageWrapper">
                <img src={show.images[2].url} alt="showPic"/>
               </div>
               <div className="showTitleContainer">
                <div className="showTitleWrapper">
                  <h3 className="showTitle">{show.name}</h3>
                  <span className="publishedTitle">Hosted by {show.publisher}</span>
                </div>
                <div className="chevronIcon">
                  <i className="fas fa-chevron-right"></i>
                </div>
               </div>
             </div>
           )
         })} 
        </Auxiliary>
      )
    }
    

    if (this.state.searchResults) {
      showNavBar = <Navbar token={this.state.token}/>
    }
    return (
      <div>
        {showNavBar}
        <div className="searchResultsContainer">
          <h1 className="searchResultsTitle">Search Results</h1>
          <div className="searchResultsGrid">
            {searchResults}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchResults);