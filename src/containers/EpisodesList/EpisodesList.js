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

  onClickEpisodeHandler = (id) => {
    spotify.getEpisode(id)
      .then(episode => {
        this.setState({episodeData: episode})
      })
      .catch(error => {
        console.log(error);
      })
  }

  // Converts millisecond to minutes
  millisecondsToMinutesConverter = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  onClickMiniEpisode = (episode) => {
    // user clicked on episode in mini episodelist, change episodeData to clicked episode
    this.setState({episodeData: episode})
  }

  render () {
    let showEpisodes = null;
    let showDisplay = null;
    let episodesTitle = "Episodes";
    if (this.props.location.state.episodesResult) {
      const showData = this.props.location.state.selectedShow;
      showDisplay = (
        <Auxiliary>
          <div className="imageWrapper">
            <img 
              id="showImage"
              alt="showImage"
              src={showData.images[0].url} style={{width: "230px", height: "230px"}}/>
          </div>
          <div className="showDataWrapper">
            <div>
              <h3>{showData.name}</h3>
              <span className="subTitleText">Hosted by {showData.publisher}</span>
            </div>
            <div className="aboutDescriptionWrapper">
              <span>About</span>
              <span className="subTitleText">{showData.description}</span>
            </div>
          </div>
        </Auxiliary>
      )
      showEpisodes = (
        <Auxiliary>
          {this.props.location.state.episodesResult.map((episode) => {
            let durationTime = this.millisecondsToMinutesConverter(episode.duration_ms);

            return (
              <div
                onClick={() => this.onClickEpisodeHandler(episode.id)} 
                className="episodeWrapper"
                key={episode.id}>
                <div className="imageWrapper">
                  <img
                    id="episodeImage"
                    alt="episodesImage" 
                    src={episode.images[0].url}/>
                </div>
                <div className="episodeDataWrapper">
                  <div className="episodeTitle">
                    <div className="titleDateWrapper">
                      <h3 style={{fontSize: "22px", marginBottom: "0"}}>{episode.name}</h3>
                      <span style={{fontSize: "14px", color: "#868895"}}>{episode.release_date}</span>
                    </div>
                    <span style={{fontSize: "14px", color: "#868895"}}>{durationTime}</span>
                  </div>
                  <div className="aboutEpisodeWrapper">
                    <span>About this Episode</span>
                    <span style={{fontSize: "14px", color: "#868895"}}>{episode.description}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </Auxiliary>
      )
    }
    // if episodeData
    if (this.state.episodeData) {
      const { episodeData } = this.state;
      showEpisodes = (
        <Episode 
          data={episodeData} 
          token={this.props.location.state.token}
          clickedMini={(episode) => this.onClickMiniEpisode(episode)}/>
      )
      showDisplay = null;
      episodesTitle = null;
    }

    return (
      <div>
        <Navbar token={this.props.location.state.token} />
        <div className="episodesListWrapper">
          <div className="selectedShow">
            {showDisplay}
          </div>
          <h1>{episodesTitle}</h1>
          <div className="episodeListGrid">
            {showEpisodes}
          </div>
        </div>
      </div>
    )
  }
}

export default EpisodesList;