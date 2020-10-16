import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import './EpisodesList.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Episode from '../Episode/Episode';

const spotify = new SpotifyWebApi();

class EpisodesList extends Component {
  state = {
    episodeData: null
  }

  onClickEpisodeHandler = (id) => {
    spotify.getEpisode(id)
      .then(episode => {
        this.setState({episodeData: episode})
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {
    let showEpisodes = null;
  
    if (this.props.episodes) {
      showEpisodes = (
        <Auxiliary>
          {this.props.episodes.map((episode) => {
            return (
              <div
                onClick={() => this.onClickEpisodeHandler(episode.id)} 
                className="episodeWrapper"
                key={episode.id}>
                <h3>Episode Name: {episode.name}</h3>
                <img src={episode.images[0].url} style={{width: "100px", height: "100px"}}/>
              </div>
            )
          })}
        </Auxiliary>
      )
    }
    // if episodeData
    if (this.state.episodeData) {
      showEpisodes = (
        <Episode data={this.state.episodeData} token={this.props.token}/>
      )
    }

    return (
      <div>
        {showEpisodes}
      </div>
    )
  }
}

export default EpisodesList;