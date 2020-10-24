import React, {Component} from 'react';
import './Episode.css';
import { withRouter } from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import AddComment from '../AddComment/AddComment';
import CommentList from '../CommentList/CommentList';
import Rate from '../Rate/Rate';
import SpotifyWebApi from 'spotify-web-api-js';
import Head from '../../components/Head/head';

const spotify = new SpotifyWebApi();

// global variable for interval
let interval;

class Episode extends Component {

  state = {
    searchInput: null,
    userInfo: null
  }

  componentDidMount = () => {
    console.log('episode has mounted')
    // get user data
    spotify.getMe().then(data => {
      this.setState({userInfo: data})
    })
    // first set up player if not set up yet
    if (this.props.token && !this.state.deviceId) {
      console.log("about to setup player")
      this.setUpPlayer();
    }
  }

  componentDidUpdate = (prevProps, nextProps) => {
    // it will update when user clicks on new episode from mini episode List
    if (prevProps.data.id !== this.props.data.id) {
      // remove deviceId so new player can properly set up
      this.setState({deviceId: null})
      // pause current player
      this.player.pause();
      // clear interval
      clearInterval(interval);
      // set up new player with new episode
      this.setUpPlayer();
    }
  }
  // when component unmounts, pause the podcast and stop checking current playback status by clearing the interval
  componentWillUnmount = () => {
    console.log('unmounted episode')
    this.player.pause();
    clearInterval(interval);
  }

  // This is triggered everytime a user presses play or pause
  onStateChanged(state) {
    if (state !== null) {
      const {current_track: currentTrack} = state.track_window;
      const position = state.position;
      const duration = state.duration;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  setUpPlayer = () => {
    // if the Spotify SDK has loaded
    if (window.Spotify) {
      const token = this.props.token;
      // create a new player
      this.player = new window.Spotify.Player({
        name: "Spotify Comment App",
        getOAuthToken: cb => { cb(token); },
      });
      console.log("created new spotify player")

      // set up events
      this.createEventHandlers();
      
      // finally, connect!
      this.player.connect().then(success => {
        if (success)  {
          console.log('the web playback sdk successfully connected')
        }
      });
      
    }
  }

  createEventHandlers = () => {
    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));


    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      await this.setState({ deviceId: device_id });
      console.log('player is ready')
      // if open, user is not premium so don't transfer playback
      if (this.state.userInfo.product === "open") {
        console.log('not premium')
      } else {
        // connect spotify to web app
        this.transferPlaybackHere();
      }
    });
  }
  // This will connect spotify to web app and play current episode
  transferPlaybackHere() {
    const { deviceId } = this.state;
    const uri = this.props.data.uri;
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: {
          getOAuthToken
        }
      }
    }) => {
      getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    };
    
    play({
      playerInstance: this.player,
      spotify_uri: uri,
    });
    // after the episode starts playing, check current state of episode every second for real time position updates
    interval = setInterval(() => this.player.getCurrentState().then(state => {
      if (state) {
        console.log('checking every second')
        const {current_track: currentTrack} = state.track_window;
        const position = state.position;
        const duration = state.duration;
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const artistName = currentTrack.artists
          .map(artist => artist.name)
          .join(", ");
        const playing = !state.paused;
        // set the real time updates into state
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          playing
        });
      } else {
        console.log('error')
      }
    }), 1000);
    console.log('transfered playback here')
  }

  onPauseClick = () => {
    this.player.pause().then(() => console.log("pause and clear current state interval"));
    clearInterval(interval);
  }

  onPlayClick = () => {
    this.player.togglePlay().then(() => console.log("play and start up current state interval"));
    interval = setInterval(() => this.player.getCurrentState().then(state => {
      if (state) {
        console.log('checking every second')
        const {current_track: currentTrack} = state.track_window;
        const position = state.position;
        const duration = state.duration;
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const artistName = currentTrack.artists
          .map(artist => artist.name)
          .join(", ");
        const playing = !state.paused;
        // set the real time updates into state
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          playing
        });
      } else {
        console.log('error')
      }
    }), 1000);
  }

  // Converts millisecond to minutes
  millisecondsToMinutesConverter = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  // Drag handler for input range
  dragHandler = (e) => {
    this.setState({position: e.target.value})
    this.player.seek(e.target.value).then(() => {
      console.log('changed position')
    })
  }

  // update position to timestamp in comment
  clickTimeStampHandler = (timestamp) => {
    this.setState({position: timestamp})
    this.player.seek(timestamp).then(() => {
      console.log('changed position')
    })
    // if paused, automatically play
    if (!this.state.playing) {
      this.player.togglePlay();
    }
  }


  render() {
    let userName = null;
    let userId = null;
    let showEpisodesList = null;
    let accountType = null;
    const episode = this.props.data;
    
    // create mini episodesList
    if (this.props.location.state.episodesResult && this.state.deviceId) {
      const episodes = this.props.location.state.episodesResult;
      showEpisodesList = (
        <Auxiliary>
          {episodes.map((episode) => {
            let duration = this.millisecondsToMinutesConverter(episode.duration_ms)
            return (
              <div
                key={episode.id} 
                onClick={() => this.props.clickedMini(episode)}
                className="miniEpisodeWrapper">
                <div style={{display: "flex", alignItems: "center"}}>
                  <img
                    alt="showImage"
                    src={episode.images[0].url} style={{width: "100px", height: "100px"}}/>
                </div>
                <div className="miniEpisodeData">
                  <span style={{color: "#FFFFFF"}}>{episode.name}</span>
                  <span id="min">{duration} minutes</span>
                  <span id="date">{episode.release_date}</span>
                </div>
                <div className="episodesRight">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            )
          })}
        </Auxiliary>
      )
    }

    // start as playing icon
    let playOrPause = (
      <div id="playerButton" onClick={this.onPlayClick}>
        <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="#7E66D8"/>
      <path d="M29.5583 18.6088C30.5567 19.2676 30.5567 20.7324 29.5583 21.3911L16.7512 29.8416C15.6431 30.5728 14.1666 29.7781 14.1666 28.4505V11.5495C14.1666 10.2219 15.6431 9.42716 16.7512 10.1583L29.5583 18.6088Z" fill="white"/>
      </svg>
      </div>
    );
    if(this.state.playing) {
      playOrPause = (
        <div id="playerButton" onClick={this.onPauseClick}>  
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#7E66D8"/>
          <rect x="16.8" y="13.2001" width="4.8" height="21.6" rx="2.4" fill="white"/>
          <rect x="26.4001" y="13.2001" width="4.8" height="21.6" rx="2.4" fill="white"/>
          </svg>
        </div>
      );
    }

    // get track time in minutes of podcast
    let showTrackTime = null;
    if (this.state.position && this.state.duration) {
      // convert ms integer to minutes
      let currentTime = this.millisecondsToMinutesConverter(this.state.position);
      let fullTime = this.millisecondsToMinutesConverter(this.state.duration);
      showTrackTime = (
        <Auxiliary>
          <span style={{color: "#868895"}}>{currentTime}</span>
          <span  style={{color: "#868895"}}>{fullTime}</span>
        </Auxiliary>
      )
    }

    // check to see if state has userInfo
    if (this.state.userInfo) {
      userName = this.state.userInfo.display_name;
      userId = this.state.userInfo.id;
      accountType = this.state.userInfo.product;
    }
    // If user is not premium, do not allow to listen
    let playerCard = (
      <div className="playerContainer">
          <div className="episodeNameDateWrapper">
            <h3 style={{marginBottom: "0px"}}>{episode.name}</h3>
            <div>
              <span id="epDate" style={{color: "#868895"}}>{episode.release_date}</span>
            </div>
          </div>
          <div className="progressBarWrapper">
            <input 
              className="range"
              id="progessBar"
              style={{width: "100%"}}
              onChange={(e) => this.dragHandler(e)}
              type="range" value={this.state.position || ""} max={this.state.duration} />
          </div>
          <div className="trackTimeWrapper">
            {showTrackTime}
          </div>
          <AddComment 
            playButton={playOrPause}
            userName={userName}
            userId={userId}
            time={this.state.position} 
            episodeId={this.props.data.id}/>
        </div>
    );
    if(accountType !== "premium") {
      playerCard = (
        <div className="playerContainer">
            <center><h3>Sorry! You must be a premium user to listen and comment.</h3></center>
        </div>
      );
    }
    return (
      <div className="Episode" style={{marginTop: "-80px", marginLeft: "-19px", marginRight: "-19px"}}>
        <Head title={this.state.trackName}/>
        <div className="displayEpisodeData">
          <div className="episodeDataContainer">
            <div className="aboutDescriptionWrapper">
              <div className="likesContainer">
                <div className="aboutAndHost">
                  <h3 style={{marginBottom: "0"}}>About this Episode</h3>
                  <span 
                  style={{marginBottom: "30px"}}
                  className="subTitleText1">
                  Hosted by {this.props.location.state.selectedShow.publisher}</span>
                </div>
                <Rate episodeId={this.props.data.id} userId={userId}/>
              </div>
              <span className="subTitleText2">{episode.description}</span>
            </div>
          </div>
          <div className="imageWrapper">
            <img 
              id="showImage"
              alt="showImage"
              src={episode.images[0].url}/>
          </div>
        </div>
        {playerCard}
        <h3 style={{marginTop: "80px"}}>Comments</h3>
        <div className="commentAndEpisodesGrid">
          <CommentList 
            episodeId={this.props.data.id} 
            onClick={(timestamp) => this.clickTimeStampHandler(timestamp)}/>
          <div className="miniEpisodesList">
            <div className="stickyName">
              <span id="moreEp">More Episodes</span>
            </div>
            <div className="miniEpisodesListWrapper">
              {showEpisodesList}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Episode);