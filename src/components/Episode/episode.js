import React, {Component} from 'react';
import './Episode.css';

import AudioWave from '../AudioWave/AudioWave';


class Episode extends Component {

  state = {
    paused: true
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
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
      console.log('loaded')
      const token = this.props.token;
      // create a new player
      this.player = new window.Spotify.Player({
        name: "Spotify Comment App",
        getOAuthToken: cb => { cb(token); },
      });

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
      console.log("Let the music play on!");
      await this.setState({ deviceId: device_id });
      // automatically connect spotify to web app
      this.transferPlaybackHere();
      
    });
  }

  transferPlaybackHere() {
    const { deviceId } = this.state;
    const token = this.props.token;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        // true: start playing music if it was paused on the other device
        // false: paused if paused on other device, start playing music otherwise
        "play": false,
      }),
    });
  }

  onPauseClick = () => {
    this.player.pause().then(() => {
      console.log('Paused!');
    });
  }

  onPlayClick = () => {
    this.player.togglePlay().then(() => {
      console.log("Play!")
    });
  }

  // setUpTrack = () => {
  //   console.log('play track')
  //   const uri = this.props.data.uri;
  //   this.player.addListener('ready', ({ device_id }) => {
  //     const play = ({
  //       spotify_uri,
  //       playerInstance: {
  //         _options: {
  //           getOAuthToken,
  //           id
  //         }
  //       }
  //     }) => {
  //       getOAuthToken(access_token => {
  //         fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
  //           method: 'PUT',
  //           body: JSON.stringify({ uris: [spotify_uri] }),
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${access_token}`
  //           },
  //         });
  //       });
  //     };

  //     play({
  //       playerInstance: this.player,
  //       spotify_uri: uri,
  //     });
  //   });
  // }

  playOrPauseHandler = () => {
    if(this.state.paused){
      //Play the podcast
      // PUT https://api.spotify.com/v1/me/player/play
      this.onPlayClick();
      this.setState({paused: !this.state.paused});
    } else {
      //Pause the podcast
      // PUT https://api.spotify.com/v1/me/player/pause
      this.onPauseClick();
      this.setState({paused: !this.state.paused});
    }
  }
  

  render() {
    const episode = this.props.data;
    // console.log(episode)
    if (this.props.token && !this.state.deviceId) {
      this.setUpPlayer();
    }
    let playOrPause = (
      <button id="playerButton" onClick={this.playOrPauseHandler}><i className="fas fa-pause-circle fa-4x" id="pausePlay"></i></button>
    );
    if(this.state.paused) {
      playOrPause = (
        <button id="playerButton" onClick={this.playOrPauseHandler}><i className="fas fa-play-circle fa-4x" id="pausePlay"></i></button>
      );
    }
    return (
      <div>
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

export default Episode;