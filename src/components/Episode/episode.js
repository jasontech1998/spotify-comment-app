import React, {Component} from 'react';
import './Episode.css';
import { withRouter } from 'react-router-dom';


class Episode extends Component {

  state = {
    searchInput: null
  }

  componentWillUnmount = () => {
    console.log('unmounted episode')
    this.onPauseClick();
  }

  onStateChanged(state) {
    if (state !== null) {
      // console.log(state);
      const {current_track: currentTrack} = state.track_window;
      const position = state.position;
      const timestamp = state.timestamp;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        timestamp,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  setUpPlayer = () => {
    console.log(window.Spotify);
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
    console.log('transfered playback here')
  }

  onPauseClick = () => {
    this.player.pause().then(() => console.log("pause"));
  }

  onPlayClick = () => {
    this.player.togglePlay();
  }

  onSearchHandler = (e) => {
    this.setState({searchInput: e.target.value})
  }
  // when user searches something in episode
  onSubmitSearchHandler = (e) => {
    e.preventDefault();
    // pause the current playback and push to searchResults the new search
    this.onPauseClick();
    this.props.history.push({
      pathname: "/searchResults",
      state: {
          searchInput: this.state.searchInput,
          token: this.props.token}
    });
  }

  render() {
    const episode = this.props.data;
    if (this.props.token && !this.state.deviceId) {
      console.log("about to setup player")
      this.setUpPlayer();
    }

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
    return (
      <div>
        {/* seach form for episode */}
        <div className="container">
          <form className="example" 
            onSubmit={(e) => this.onSubmitSearchHandler(e)}>
            <input 
              onChange={(e) => this.onSearchHandler(e)}
              type="text" placeholder="Search.." name="search"></input>
              <button type="submit"><i className="fa fa-search"></i></button>
            </form>
        </div>
        <h1>Episode Name: {episode.name}</h1>
        <div id="player">
          <img 
            src={episode.images[0].url} 
            style={{width: "100px", height: "100px"}}/>
          {playOrPause}
        </div>
        
        <p>Description: {episode.description}</p>
        <p>Release Date: {episode.release_date}</p>
        
      </div>
    )
  }
}

export default withRouter(Episode);