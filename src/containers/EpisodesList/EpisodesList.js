import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import './EpisodesList.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Episode from '../../components/Episode/episode';
import Navbar from '../../components/Navbar/Navbar';

const spotify = new SpotifyWebApi();

class EpisodesList extends Component {
  state = {
    episodeData: null
  }

  // componentDidMount = () => {
  //   const {token, episodesResult} = this.props.location.state;
  //   console.log(episodesResult);
  // }

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
    let showNavBar = null;
    if (!this.state.episodeData) {
      showNavBar = <Navbar token={this.props.token} />
    }
    if (this.props.location.state.episodesResult) {
      showEpisodes = (
        <Auxiliary>
          {this.props.location.state.episodesResult.map((episode) => {
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
        <Episode data={this.state.episodeData} token={this.props.location.state.token}/>
      )
    }

    return (
      <div>
        {showNavBar}
        <h1>Episodes List</h1>
        {showEpisodes}
      </div>
    )
  }
}

export default EpisodesList;