import React, {Component} from 'react';
import './Episode.css';
import { withRouter } from 'react-router-dom';


import AddComment from '../AddComment/AddComment';
import CommentList from '../CommentList/CommentList';
import Rate from '../Rate/Rate';
import SpotifyWebApi from 'spotify-web-api-js';
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
    // first set up player if not set up yet
    if (this.props.token && !this.state.deviceId) {
      console.log("about to setup player")
      this.setUpPlayer();
    }

    spotify.getMe().then(data => {
      this.setState({userInfo: data})
    })
    
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
      // automatically connect spotify to web app
      this.transferPlaybackHere();
      
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
    const episode = this.props.data;
    

    // start as playing icon
    let playOrPause = (
      <button id="playerButton" onClick={this.onPlayClick}>
        <i className="fas fa-play-circle fa-4x" id="pausePlay"></i>
      </button>
    );
    if(this.state.playing) {
      playOrPause = (
        <button id="playerButton" onClick={this.onPauseClick}>
          <i className="fas fa-pause-circle fa-4x" id="pausePlay"></i>
        </button>
      );
    }

    // get track time in minutes of podcast
    let showTrackTime = null;
    if (this.state.position && this.state.duration) {
      // convert ms integer to minutes
      let currentTime = this.millisecondsToMinutesConverter(this.state.position);
      let fullTime = this.millisecondsToMinutesConverter(this.state.duration);
      showTrackTime = <span>{currentTime} : {fullTime}</span>
    }

    // check to see if state has userInfo
    if (this.state.userInfo) {
      userName = this.state.userInfo.display_name;
      userId = this.state.userInfo.id
    }
    return (
      <div>
        <h1>Episode Name: {episode.name}</h1>
        <div id="player">
          <img 
            src={episode.images[0].url}
            alt="episodeImage" 
            style={{width: "100px", height: "100px"}}/>
          {playOrPause}
        </div>
        <p>Description: {episode.description}</p>
        <p>Release Date: {episode.release_date}</p>
        {/* progress bar testing */}
        <input 
          onChange={(e) => this.dragHandler(e)}
          type="range" value={this.state.position || ""} max={this.state.duration} />
        {showTrackTime}
        <Rate episodeId={this.props.data.id} userId={userId}/>
        <AddComment 
          userName={userName}
          userId={userId}
          time={this.state.position} 
          episodeId={this.props.data.id}/>
        <CommentList 
          episodeId={this.props.data.id} 
          onClick={(timestamp) => this.clickTimeStampHandler(timestamp)}/>
      </div>
    )
  }
}

export default withRouter(Episode);