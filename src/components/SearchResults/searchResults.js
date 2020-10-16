import React, {Component} from 'react';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import EpisodesList from '../EpisodesList/EpisodesList'
import './searchResults.css';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

class SearchResults extends Component {
  state = {
    episodesResult: null
  }

  onClickShowHandler = (id) => {
    spotify.getShowEpisodes(id, {limit: 8})
      .then(episodes => {
        // console.log(episodes.items)
        this.setState({episodesResult: episodes.items})
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {
 
    let showResults = null;
    if (this.props.searchResults) {
      showResults = (
        <Auxiliary>
         {this.props.searchResults.map((show) => {
          //  console.log(show)
           return (
             <div
                onClick={() => this.onClickShowHandler(show.id)} 
                className="showWrapper" key={show.id}>
               <h3>Show Name: {show.name}</h3>
               <img src={show.images[2].url}/>
             </div>
           )
         })} 
        </Auxiliary>
      )
    }
    if (this.state.episodesResult) {
      showResults = (
        <EpisodesList episodes={this.state.episodesResult} token={this.props.token}/>
      )
    }
    return (
      <div>
        <h1>Search Results</h1>
        {showResults}
      </div>
    )
  }
}

export default SearchResults;