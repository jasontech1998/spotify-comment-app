import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import './EpisodesList.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Episode from '../../components/Episode/episode';
import Navbar from '../../components/Navbar/Navbar';
import Head from '../../components/Head/head';


const spotify = new SpotifyWebApi();

class EpisodesList extends Component {
  state = {
    episodeData: null
  }
  // this triggers if user clicked on one of the featured episodes
  componentDidMount = () => {
    if (this.props.location.state.featureEpisode) {
      let episode = this.props.location.state.featureEpisode;
      this.setState({episodeData: episode})
    }
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
    let headTitle = null;
    let showEpisodes = null;
    let showDisplay = null;
    let episodesTitle = "Episodes";
    if (this.props.location.state.episodesResult) {
      let showData = null;
      if (this.props.location.state.selectedShow) {
        showData = this.props.location.state.selectedShow;
      }
      else if (this.props.location.state.featureEpisode) {
        showData = this.props.location.state.featureEpisode
      }
      headTitle = showData.name
      showDisplay = (
        <Auxiliary>
          <div className="imageWrapper">
            <img 
              id="showImage"
              alt="showImage"
              src={showData.images[0].url} style={{width: "216px", height: "216px"}}/>
          </div>
          <div className="showDataWrapper">
            <div>
              <h3 className="podcastName">{showData.name}</h3>
              <span className="subTitleText1">Hosted by {showData.publisher}</span>
            </div>
            <div className="aboutDescriptionWrapper">
              <span className="about">About</span>
              <span className="subTitleText2">{showData.description}</span>
            </div>
          </div>
        </Auxiliary>
      )
      showEpisodes = (
        <Auxiliary>
          {this.props.location.state.episodesResult.map((episode) => {
            let durationTime = this.millisecondsToMinutesConverter(episode.duration_ms);
            // if description is over 200 chars, trim it
            const length = 153;
            let trimDescription = 
              episode.description.length > length ?
              episode.description.substring(0, length) + "..." :
              episode.description;
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
                  <div className="aboutEpisodeWrapper">
                    <div>
                      <h3 className="episodeListName">
                        {episode.name}
                      </h3>   
                      <span className="episodeMinutes">{durationTime}</span>
                    </div>
                    <div className="aboutEpisodeWrapper2">
                      <span className="aboutEp">About this Episode</span>
                      <span className="epDescription">{trimDescription}</span>
                    </div>
                  </div>
                  <div className="episodeDate">
                    <span className="episodeMinutes" style={{fontSize: "16px"}}>{episode.release_date}</span>
                  </div>
                  <div className="episodesRight">
                    <i className="fas fa-chevron-right"></i>
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
        <Head title={headTitle}/>
        <Navbar token={this.props.location.state.token} />
        <div className="episodesListWrapper">
          <div className="selectedShow">
            {showDisplay}
          </div>
          <h1 className="episodesTitle">{episodesTitle}</h1>
          <div className="episodeListGrid">
            {showEpisodes}
          </div>
        </div>
      </div>
    )
  }
}

export default EpisodesList;